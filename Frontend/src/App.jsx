import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const ChatInterface = lazy(() => import('./pages/ChatInterface'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))

function App() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-black text-white">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  )
}

export default App