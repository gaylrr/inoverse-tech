import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/',             label: 'Home' },
    { to: '/about',        label: 'About' },
    { to: '/services',     label: 'Services' },
    { to: '/technologies', label: 'Technologies' },
    { to: '/portfolio',    label: 'Portfolio' },
    { to: '/contact',      label: 'Contact' },
  ]

  return (
    <nav className="bg-amalfi sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-citrus flex items-center justify-center font-bold text-white text-sm">
            IT
          </div>
          <span className="text-white font-bold text-lg">
            Inoverse <span className="text-citrus">Technologies</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-citrus font-semibold text-sm'
                    : 'text-white/80 hover:text-white text-sm transition'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-amalfi border-t border-white/10 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-citrus font-semibold text-sm'
                      : 'text-white/80 hover:text-white text-sm transition'
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}