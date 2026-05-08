import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const { pathname } = useRouter()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="page-wrapper">
      {/* Top colour stripe */}
      <div className="top-stripe" />

      {/* ── Header ── */}
      <header className="header">
        <Link href="/" className="header-logo" aria-label="Corporate Buyings home">
          <span className="logo-initials">CB</span>
          <div className="logo-text">
            Corporate<br />
            <span>Buyings</span>
          </div>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          <Link
            href="/"
            className={`nav-link${!isAdmin ? ' active' : ''}`}
            aria-current={!isAdmin ? 'page' : undefined}
          >
            Employee
          </Link>
          <Link
            href="/admin"
            className={`nav-link${isAdmin ? ' active' : ''}`}
            aria-current={isAdmin ? 'page' : undefined}
          >
            Admin
          </Link>
        </nav>
      </header>

      {/* ── Page content ── */}
      <main className="main-content" id="main-content">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} <strong>Corporate Buyings</strong> — T-Shirt Registration
        Portal — All Rights Reserved
      </footer>
    </div>
  )
}
