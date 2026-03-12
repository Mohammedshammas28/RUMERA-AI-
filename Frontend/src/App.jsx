import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import About from './pages/About'
import History from './pages/History'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/about" element={<About />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}

export default App
