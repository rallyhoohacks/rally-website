import { lenis } from './lenis'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <span
        className="header-logo"
        style={{ cursor: 'pointer' }}
        onClick={() => lenis.scrollTo(0)}
      >
        R<span className="logo-green">all</span>y
      </span>
    </header>
  )
}
