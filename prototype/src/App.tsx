import { Routes, Route } from 'react-router-dom'
import { Titlebar, Sidebar } from './components/Layout'
import { isTauriApp } from './lib/native-transcribe'
import Dashboard from './pages/Dashboard'
import WritingTopics from './pages/WritingTopics'
import TopicDetail from './pages/TopicDetail'
import EssaySubmit from './pages/EssaySubmit'
import SpeakingTopics from './pages/SpeakingTopics'
import SpeakingPractice from './pages/SpeakingPractice'
import GreatSpeakingPage from './pages/GreatSpeaking'
import Settings from './pages/Settings'
import MyEssays from './pages/MyEssays'
import MyEssayDetail from './pages/MyEssayDetail'
import MySpeaking from './pages/MySpeaking'
import MySpeakingDetail from './pages/MySpeakingDetail'

export default function App() {
  // 桌面 app（打包后）用 macOS 原生窗口栏，不画自绘 titlebar；
  // 纯浏览器预览下才显示自绘的，避免重复。
  const showCustomTitlebar = !isTauriApp()
  return (
    <>
      {showCustomTitlebar ? <Titlebar /> : null}
      <div className="app">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/writing" element={<WritingTopics />} />
            <Route path="/writing/new" element={<EssaySubmit />} />
            <Route path="/writing/:id" element={<TopicDetail />} />
            <Route path="/my-essays" element={<MyEssays />} />
            <Route path="/my-essays/:id" element={<MyEssayDetail />} />
            <Route path="/my-speaking" element={<MySpeaking />} />
            <Route path="/my-speaking/:id" element={<MySpeakingDetail />} />
            <Route path="/speaking" element={<SpeakingTopics />} />
            <Route path="/speaking/practice" element={<SpeakingPractice />} />
            <Route path="/great-speaking" element={<GreatSpeakingPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
