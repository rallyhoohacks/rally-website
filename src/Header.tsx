import { NavLink } from 'react-router-dom'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'AI Insights', to: '/ai-insights' },
  { label: 'Safety',      to: '/safety' },
  { label: 'About',       to: '/about' },
]

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="header-logo">
        R<span className="logo-green">all</span>y
      </NavLink>

      <nav className="header-nav">
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/sign-up" className="btn btn-primary header-cta">
        Sign Up
      </NavLink>
    </header>
  )
}
