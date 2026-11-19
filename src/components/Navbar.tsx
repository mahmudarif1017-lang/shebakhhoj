import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { cn } from '../lib/utils'

const navLinks = [
  { to: '/', label: 'হোম' },
  { to: '/services', label: 'সেবা খুঁজুন' },
  { to: '/about', label: 'আমাদের সম্পর্কে' },
  { to: '/admin', label: 'ডেমো অ্যাডমিন' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative rounded-lg px-3 py-2 text-sm font-medium transition duration-200',
      isActive ? 'text-navy' : 'text-slate-600 hover:text-navy',
    )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="প্রধান নেভিগেশন">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
              {link.to === '/' && <span className="sr-only"> (বর্তমান পাতা)</span>}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/register" className="btn-primary !px-4 !py-2.5">
            সেবাদাতা হিসেবে যোগ দিন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          aria-label={open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="container-content flex flex-col gap-1 py-3" aria-label="মোবাইল নেভিগেশন">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/register" className="btn-primary mt-2 w-full">
              সেবাদাতা হিসেবে যোগ দিন
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
