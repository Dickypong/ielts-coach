/** 口语录音持久化（IndexedDB；localStorage 放不下音频） */

const DB_NAME = 'ielts-coach-speaking-audio'
const STORE = 'recordings'
const DB_VERSION = 1

type AudioRecord = {
  id: string
  mimeType: string
  blob: Blob
  createdAt: number
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onerror = () => reject(req.error || new Error('无法打开录音数据库'))
    req.onsuccess = () => resolve(req.result)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' })
      }
    }
  })
}

function idbReq<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error || new Error('IndexedDB 操作失败'))
  })
}

export async function saveSpeakingAudio(id: string, blob: Blob, mimeType = ''): Promise<void> {
  if (!id || !blob || blob.size < 200) return
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readwrite')
    const record: AudioRecord = {
      id,
      mimeType: mimeType || blob.type || 'audio/webm',
      blob,
      createdAt: Date.now(),
    }
    await idbReq(tx.objectStore(STORE).put(record))
  } finally {
    db.close()
  }
}

export async function getSpeakingAudio(
  id: string,
): Promise<{ blob: Blob; mimeType: string } | null> {
  if (!id) return null
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readonly')
    const row = await idbReq(tx.objectStore(STORE).get(id) as IDBRequest<AudioRecord | undefined>)
    if (!row?.blob) return null
    return { blob: row.blob, mimeType: row.mimeType || row.blob.type || 'audio/webm' }
  } finally {
    db.close()
  }
}

export async function deleteSpeakingAudio(id: string): Promise<void> {
  if (!id) return
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readwrite')
    await idbReq(tx.objectStore(STORE).delete(id))
  } finally {
    db.close()
  }
}

export async function clearSpeakingAudio(): Promise<void> {
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readwrite')
    await idbReq(tx.objectStore(STORE).clear())
  } finally {
    db.close()
  }
}
