#!/usr/bin/env swift
import Foundation
import Speech
import AppKit

/// 独立转写小工具（带自己的 Info.plist / Bundle ID）
/// 用法: macos_transcribe --in <audio> --out <txt>

func argValue(_ name: String) -> String? {
    let args = CommandLine.arguments
    guard let i = args.firstIndex(of: name), i + 1 < args.count else { return nil }
    return args[i + 1]
}

let inPath = argValue("--in") ?? (CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : nil)
let outPath = argValue("--out")

guard let inPath else {
    fputs("usage: macos_transcribe --in <audio> [--out <txt>]\n", stderr)
    exit(2)
}

func writeResult(_ text: String, code: Int32) -> Never {
    let payload = code == 0 ? text : "ERROR: \(text)"
    if let outPath {
        try? payload.write(toFile: outPath, atomically: true, encoding: .utf8)
    }
    if code == 0 {
        print(text)
        exit(0)
    } else {
        fputs(text + "\n", stderr)
        exit(code)
    }
}

guard FileManager.default.fileExists(atPath: inPath) else {
    writeResult("file not found", code: 1)
}

_ = NSApplication.shared

let url = URL(fileURLWithPath: inPath)
guard let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US")) else {
    writeResult("en-US speech recognizer unavailable", code: 1)
}

final class Box {
    var text = ""
    var error: String?
    var done = false
}
let box = Box()

func finish(text: String? = nil, error: String? = nil) {
    if box.done { return }
    if let text { box.text = text }
    if let error { box.error = error }
    box.done = true
    CFRunLoopStop(CFRunLoopGetMain())
}

func start(onDevice: Bool) {
    guard recognizer.isAvailable else {
        finish(error: "Speech recognizer not available")
        return
    }
    let request = SFSpeechURLRecognitionRequest(url: url)
    request.shouldReportPartialResults = false
    if onDevice, recognizer.supportsOnDeviceRecognition {
        request.requiresOnDeviceRecognition = true
    } else {
        request.requiresOnDeviceRecognition = false
    }
    recognizer.recognitionTask(with: request) { result, error in
        if let error {
            if onDevice {
                start(onDevice: false)
                return
            }
            finish(error: error.localizedDescription)
            return
        }
        if let result, result.isFinal {
            finish(text: result.bestTranscription.formattedString)
        }
    }
}

SFSpeechRecognizer.requestAuthorization { status in
    DispatchQueue.main.async {
        switch status {
        case .authorized:
            start(onDevice: true)
        case .denied:
            finish(error: "未授权语音识别。请到 系统设置 → 隐私与安全性 → 语音识别 允许 macos_transcribe / IELTS Coach")
        case .restricted:
            finish(error: "系统限制了语音识别")
        case .notDetermined:
            finish(error: "语音识别权限未确定")
        @unknown default:
            finish(error: "未知的语音识别授权状态")
        }
    }
}

DispatchQueue.main.asyncAfter(deadline: .now() + 90) {
    if !box.done { finish(error: "转写超时") }
}

CFRunLoopRun()

let text = box.text.trimmingCharacters(in: .whitespacesAndNewlines)
if text.isEmpty {
    writeResult(box.error ?? "未识别到英文内容", code: 1)
}
writeResult(text, code: 0)
