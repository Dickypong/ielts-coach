#import <Foundation/Foundation.h>
#import <Speech/Speech.h>
#include <stdio.h>
#include <string.h>

/// 在 IELTS Coach（Tauri）进程内转写音频文件。
/// 成功返回 0 并写入 UTF-8 文本；失败返回非 0，out 中为错误信息。
int ielts_mac_transcribe_file(const char *path, char *out, size_t out_len) {
  if (!path || !out || out_len < 8) return 1;
  out[0] = '\0';

  @autoreleasepool {
    NSString *nsPath = [NSString stringWithUTF8String:path];
    if (![[NSFileManager defaultManager] fileExistsAtPath:nsPath]) {
      snprintf(out, out_len, "file not found");
      return 2;
    }

    NSURL *url = [NSURL fileURLWithPath:nsPath];
    NSLocale *locale = [NSLocale localeWithLocaleIdentifier:@"en-US"];
    SFSpeechRecognizer *recognizer = [[SFSpeechRecognizer alloc] initWithLocale:locale];
    if (!recognizer) {
      snprintf(out, out_len, "en-US speech recognizer unavailable");
      return 3;
    }

    dispatch_semaphore_t authSem = dispatch_semaphore_create(0);
    __block SFSpeechRecognizerAuthorizationStatus authStatus =
        SFSpeechRecognizerAuthorizationStatusNotDetermined;

    [SFSpeechRecognizer requestAuthorization:^(SFSpeechRecognizerAuthorizationStatus status) {
      authStatus = status;
      dispatch_semaphore_signal(authSem);
    }];
    if (dispatch_semaphore_wait(authSem, dispatch_time(DISPATCH_TIME_NOW, 20 * NSEC_PER_SEC)) != 0) {
      snprintf(out, out_len, "speech authorization timeout");
      return 4;
    }
    if (authStatus != SFSpeechRecognizerAuthorizationStatusAuthorized) {
      snprintf(out, out_len,
               "未授权语音识别。请到 系统设置 → 隐私与安全性 → 语音识别 允许 IELTS Coach");
      return 5;
    }

    dispatch_semaphore_t doneSem = dispatch_semaphore_create(0);
    __block NSString *resultText = nil;
    __block NSString *resultError = nil;
    __block BOOL triedNetworkFallback = NO;

    void (^handleFinal)(SFSpeechRecognitionResult *, NSError *, BOOL) =
        ^(SFSpeechRecognitionResult *result, NSError *error, BOOL allowFallback) {
          if (error) {
            if (allowFallback && !triedNetworkFallback) {
              triedNetworkFallback = YES;
              SFSpeechURLRecognitionRequest *retry =
                  [[SFSpeechURLRecognitionRequest alloc] initWithURL:url];
              retry.shouldReportPartialResults = NO;
              retry.requiresOnDeviceRecognition = NO;
              [recognizer
                  recognitionTaskWithRequest:retry
                               resultHandler:^(SFSpeechRecognitionResult *r2, NSError *e2) {
                                 if (e2) {
                                   resultError = e2.localizedDescription ?: @"recognition failed";
                                   dispatch_semaphore_signal(doneSem);
                                   return;
                                 }
                                 if (r2.isFinal) {
                                   resultText = r2.bestTranscription.formattedString;
                                   dispatch_semaphore_signal(doneSem);
                                 }
                               }];
              return;
            }
            resultError = error.localizedDescription ?: @"recognition failed";
            dispatch_semaphore_signal(doneSem);
            return;
          }
          if (result.isFinal) {
            resultText = result.bestTranscription.formattedString;
            dispatch_semaphore_signal(doneSem);
          }
        };

    void (^begin)(void) = ^{
      if (!recognizer.isAvailable) {
        resultError = @"Speech recognizer not available";
        dispatch_semaphore_signal(doneSem);
        return;
      }
      SFSpeechURLRecognitionRequest *request =
          [[SFSpeechURLRecognitionRequest alloc] initWithURL:url];
      request.shouldReportPartialResults = NO;
      BOOL onDevice = NO;
      if (@available(macOS 10.15, *)) {
        onDevice = recognizer.supportsOnDeviceRecognition;
        if (onDevice) {
          request.requiresOnDeviceRecognition = YES;
        }
      }
      [recognizer recognitionTaskWithRequest:request
                               resultHandler:^(SFSpeechRecognitionResult *result, NSError *error) {
                                 handleFinal(result, error, onDevice);
                               }];
    };

    if ([NSThread isMainThread]) {
      begin();
      // 主线程上不能硬等 semaphore，需泵 runloop
      NSDate *deadline = [NSDate dateWithTimeIntervalSinceNow:90.0];
      while (dispatch_semaphore_wait(doneSem, DISPATCH_TIME_NOW) != 0) {
        if ([deadline timeIntervalSinceNow] < 0) {
          snprintf(out, out_len, "转写超时");
          return 6;
        }
        [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode
                                 beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.05]];
      }
    } else {
      dispatch_sync(dispatch_get_main_queue(), begin);
      if (dispatch_semaphore_wait(doneSem, dispatch_time(DISPATCH_TIME_NOW, 90 * NSEC_PER_SEC)) != 0) {
        snprintf(out, out_len, "转写超时");
        return 6;
      }
    }

    if (resultText.length > 0) {
      const char *utf8 = [resultText UTF8String];
      if (!utf8) {
        snprintf(out, out_len, "invalid utf8 transcript");
        return 7;
      }
      snprintf(out, out_len, "%s", utf8);
      return 0;
    }

    const char *err = resultError ? [resultError UTF8String] : "未识别到英文内容";
    snprintf(out, out_len, "%s", err ? err : "未识别到英文内容");
    return 8;
  }
}
