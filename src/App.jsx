import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import SavedPage from './pages/SavedPage.jsx'
import TimetablePage from './pages/TimetablePage.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
        </Routes>
      </main>
    </>
  )
}
