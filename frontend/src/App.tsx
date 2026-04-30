import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { BookingPage } from './pages/BookingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/prenota" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
