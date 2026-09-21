/** macOS Tauri 原生转写（SFSpeech），不走浏览器 Web Speech */

export function isTauriApp(): boolean {
  if (typeof window === 'undefined') return false
  const w = window as unknown as { __TAURI_INTERNALS__?: unknown; __TAURI__?: unknown }
  return Boolean(w.__TAURI_INTERNALS__ || w.__TAURI__)
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      const comma = dataUrl.indexOf(',')
      resolve(comma >= 0 ? dataUrl.slice(comma + 1) : '')
    }
    reader.onerror = () => reject(new Error('读取录音失败'))
    reader.readAsDataURL(blob)
  })
}

/** 调用 Rust `transcribe_audio`：优先设备端识别录音文件 */
export async function transcribeWithMacSpeech(blob: Blob, mimeType?: string): Promise<string> {
  if (!isTauriApp()) {
    throw new Error('系统转写仅在 macOS 桌面 App 中可用，请用 npm run tauri:dev 打开')
  }
  if (!blob || blob.size < 64) {
    throw new Error('录音为空，无法转写')
  }
  const { invoke } = await import('@tauri-apps/api/core')
  const audioBase64 = await blobToBase64(blob)
  const text = await invoke<string>('transcribe_audio', {
    audioBase64,
    mimeType: mimeType || blob.type || 'audio/mp4',
  })
  const cleaned = (text || '').replace(/\s+/g, ' ').trim()
  if (!cleaned) {
    throw new Error('未识别到英文内容，请再说清楚一点后重试')
  }
  return cleaned
}
