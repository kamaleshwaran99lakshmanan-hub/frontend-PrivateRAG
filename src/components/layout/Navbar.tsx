import { CircleUser } from 'lucide-react'
import Logo from './Logo'

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:ring-offset-2"
          aria-label="User profile"
        >
          <CircleUser className="h-5 w-5 text-slate-600" aria-hidden />
          <span>User Profile</span>
        </button>
      </nav>
    </header>
  )
}

export default Navbar
