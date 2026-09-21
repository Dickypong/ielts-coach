/** 从本机 OpenClaw / Tauri 导入 MiniMax API Key（不把 Key 写进仓库） */

export type ImportKeyResult =
  | { ok: true; apiKey: string; source: string }
  | { ok: false; error: string }

async function tryTauriImport(): Promise<ImportKeyResult | null> {
  try {
    const w = window as unknown as {
      __TAURI_INTERNALS__?: { invoke?: (cmd: string, args?: unknown) => Promise<unknown> }
      __TAURI__?: { core?: { invoke?: (cmd: string, args?: unknown) => Promise<unknown> } }
    }
    const invoke =
      w.__TAURI__?.core?.invoke || w.__TAURI_INTERNALS__?.invoke
    if (!invoke) return null
    const apiKey = (await invoke('import_minimax_key_from_openclaw')) as string
    if (!apiKey) return { ok: false, error: 'OpenClaw 里没有找到 MiniMax Key' }
    return { ok: true, apiKey, source: 'OpenClaw (Tauri)' }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Tauri 导入失败',
    }
  }
}

async function tryDevServerImport(): Promise<ImportKeyResult | null> {
  try {
    const res = await fetch('/__dev/openclaw-minimax-key')
    if (!res.ok) return null
    const data = (await res.json()) as { ok?: boolean; apiKey?: string | null; error?: string }
    if (!data.ok || !data.apiKey) {
      return { ok: false, error: data.error || '开发服务未读到 MiniMax Key' }
    }
    return { ok: true, apiKey: data.apiKey, source: 'OpenClaw (开发服务)' }
  } catch {
    return null
  }
}

export async function importMinimaxKeyFromOpenClaw(): Promise<ImportKeyResult> {
  const tauri = await tryTauriImport()
  if (tauri?.ok) return tauri
  const dev = await tryDevServerImport()
  if (dev?.ok) return dev
  if (tauri && !tauri.ok) return tauri
  if (dev && !dev.ok) return dev
  return {
    ok: false,
    error:
      '无法自动导入。请打开 ~/.openclaw/openclaw.json 复制 MiniMax 的 MINIMAX_API_KEY，粘贴到下方并点「保存」。',
  }
}
