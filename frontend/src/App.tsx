import { Navigate, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import { BoardPage } from './pages/BoardPage'
import { PositionsPage } from './pages/PositionsPage'
import { TokenDetailPage } from './pages/TokenDetailPage'

/**
 * Root dashboard routes.
 */
export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/token/:symbol" element={<TokenDetailPage />} />
        <Route path="/positions" element={<PositionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
