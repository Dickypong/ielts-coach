import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { essays } from '../data/essays'
import TopicImportModal from '../components/TopicImportModal'
import {
  isImportedWriting,
  useAllWritingTopics,
  useCustomTopicsStore,
} from '../store/customTopics'

const types = ['全部', '观点类', '讨论类', '问题+解决方案', '利弊类', '图表类', '自定义']
const tasks = ['全部', 'Task 1', 'Task 2']

export default function WritingTopics() {
  const writingTopics = useAllWritingTopics()
  const removeWriting = useCustomTopicsStore((s) => s.removeWriting)
  const customCount = useCustomTopicsStore((s) => s.writing.length)
  const [typeFilter, setTypeFilter] = useState('全部')
  const [taskFilter, setTaskFilter] = useState('全部')
  const [search, setSearch] = useState('')
  const [importOpen, setImportOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const typeOptions = useMemo(() => {
    const set = new Set<string>(types)
    for (const t of writingTopics) set.add(t.type)
    return ['全部', ...[...set].filter((x) => x !== '全部').sort((a, b) => a.localeCompare(b, 'zh'))]
  }, [writingTopics])

  const essayCountByTopic = useMemo(() => {
    const map = new Map<string, number>()
    for (const e of essays) {
      map.set(e.topicId, (map.get(e.topicId) || 0) + 1)
    }
    return map
  }, [])

  const filtered = writingTopics.filter((t) => {
    if (taskFilter !== '全部' && `Task ${t.task}` !== taskFilter) return false
    if (typeFilter !== '全部' && t.type !== typeFilter) return false
    if (search && !t.prompt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">写作真题题库</h1>
        <p className="page-subtitle">
          内置 {writingTopics.length - customCount} 题
          {customCount ? ` · 已导入 ${customCount} 题` : ''} · 可粘贴导入新题
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="input"
          placeholder="🔍 搜索题目关键词..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-secondary" onClick={() => setImportOpen(true)}>
            📋 粘贴导入
          </button>
          <Link to="/writing/new" className="btn btn-primary">
            🤖 AI 评估我的作文
          </Link>
        </div>
      </div>

      {toast && (
        <div className="tip" style={{ marginBottom: 12 }}>
          {toast}
        </div>
      )}

      <div className="filter-bar">
        <div className="tabs">
          {tasks.map((t) => (
            <button
              key={t}
              type="button"
              className={`tab ${taskFilter === t ? 'active' : ''}`}
              onClick={() => setTaskFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>·</span>
        {typeOptions.map((t) => (
          <button
            key={t}
            type="button"
            className={`chip ${typeFilter === t ? 'active' : ''}`}
            onClick={() => setTypeFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div>
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="emoji">🔍</div>
            <p>没有匹配的题目</p>
            <button type="button" className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setImportOpen(true)}>
              粘贴导入题目
            </button>
          </div>
        ) : (
          filtered.map((t) => (
            <div key={t.id} className="list-item" style={{ alignItems: 'stretch' }}>
              <Link to={`/writing/${t.id}`} className="list-item-main" style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span className={`tag ${t.task === 2 ? 'tag-accent' : 'tag-success'}`}>
                    Task {t.task}
                  </span>
                  <span className="tag tag-purple">{t.type}</span>
                  {isImportedWriting(t) && <span className="tag tag-warning">导入</span>}
                  {t.tags.filter((tag) => tag !== '导入').map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="list-item-title">{t.prompt}</div>
                <div className="list-item-meta">
                  <span>📅 {t.examDate}</span>
                  <span>📝 配套 {essayCountByTopic.get(t.id) || 0} 篇范文</span>
                  <span>
                    难度：{' '}
                    {t.difficulty === 'easy' ? '⭐' : t.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
                  </span>
                </div>
              </Link>
              {isImportedWriting(t) && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  title="删除导入题"
                  onClick={(e) => {
                    e.preventDefault()
                    removeWriting(t.id)
                    setToast('已删除该导入题')
                  }}
                >
                  删除
                </button>
              )}
              <div style={{ color: 'var(--text-tertiary)', alignSelf: 'center' }}>›</div>
            </div>
          ))
        )}
      </div>

      <TopicImportModal
        open={importOpen}
        mode="writing"
        onClose={() => setImportOpen(false)}
        onImported={(n) => setToast(n ? `已导入 ${n} 道写作题（重复题已跳过）` : '没有新题目（可能与已有重复）')}
      />
    </>
  )
}
