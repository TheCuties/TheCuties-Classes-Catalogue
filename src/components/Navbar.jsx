import { Link, NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Courses', end: true },
  { to: '/saved', label: 'Saved courses' },
  { to: '/timetable', label: 'Timetable' },
]

export default function Navbar() {
  return (
    <header className="navbar bg-[#0b3a5c] p-4 text-white">
      <div className="navbar-start">
        <Link to="/" className="font-bold text-white">
          Course Catalogue
        </Link>
      </div>
      <nav className="navbar-end gap-4" aria-label="Main">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? 'font-bold' : undefined)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
