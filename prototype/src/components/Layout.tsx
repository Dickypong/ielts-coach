import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '总览', icon: '🏠', section: 'main' },
  { path: '/writing', label: '写作练习', icon: '✍️', section: 'main' },
  { path: '/writing/new', label: 'AI 作文评估', icon: '🤖', section: 'main' },
  { path: '/my-essays', label: '我的作文', icon: '📂', section: 'main' },
  { path: '/speaking', label: '口语题库', icon: '🎙️', section: 'main' },
  { path: '/speaking/practice', label: '口语录音', icon: '🎤', section: 'main' },
  { path: '/my-speaking', label: '我的口语', icon: '🗣️', section: 'main' },
  { path: '/great-speaking', label: '优秀录音', icon: '🎧', section: 'main' },
  { path: '/settings', label: '设置', icon: '⚙️', section: 'settings' },
]

/** 父菜单不吞子路由：/speaking 不匹配 /speaking/practice；/writing 不匹配 /writing/new */
function isSidebarActive(navPath: string, pathname: string): boolean {
  if (navPath === '/') return pathname === '/'

  // 与子菜单并存的父入口：只亮自身
  if (navPath === '/writing' || navPath === '/speaking') {
    return pathname === navPath
  }

  // 详情页仍高亮列表入口
  if (navPath === '/my-essays' || navPath === '/my-speaking') {
    return pathname === navPath || pathname.startsWith(`${navPath}/`)
  }

  return pathname === navPath || pathname.startsWith(`${navPath}/`) || pathname.startsWith(`${navPath}?`)
}

export function Titlebar() {
  return (
    <div className="titlebar">
      <div className="traffic-lights">
        <span className="red"></span>
        <span className="yellow"></span>
        <span className="green"></span>
      </div>
      <span className="titlebar-title">IELTS Coach · 雅思备考助手</span>
    </div>
  )
}

function NavItem({ path, label, icon }: { path: string; label: string; icon: string }) {
  const { pathname } = useLocation()
  const active = isSidebarActive(path, pathname)

  return (
    <NavLink
      to={path}
      end
      className={() => `nav-item${active ? ' active' : ''}`}
      aria-current={active ? 'page' : undefined}
    >
      <span className="icon">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

export function Sidebar() {
  const mainItems = navItems.filter((i) => i.section === 'main')
  const settingsItems = navItems.filter((i) => i.section === 'settings')

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img className="logo" src="/app-icon.png" alt="IELTS Coach" width={32} height={32} />
        <div>
          <div className="brand-text">IELTS Coach</div>
          <div className="brand-sub">雅思备考助手</div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">学习</div>
        {mainItems.map((item) => (
          <NavItem key={item.path} path={item.path} label={item.label} icon={item.icon} />
        ))}
      </div>

      <div className="nav-section">
        <div className="nav-section-title">其他</div>
        {settingsItems.map((item) => (
          <NavItem key={item.path} path={item.path} label={item.label} icon={item.icon} />
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user">
          <div className="avatar">T</div>
          <div>
            <div className="user-name">Tiffany</div>
            <div className="user-meta">IELTS 备考 · 本地练习</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
