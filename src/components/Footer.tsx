import { Link } from 'react-router-dom'
import { Mail, MapPin, ShieldCheck } from 'lucide-react'
import Logo from './Logo'
import { categories } from '../data/categories'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-content py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              আপনার এলাকার নির্ভরযোগ্য সেবা, এখন হাতের মুঠোয়। সেবাখোঁজ রাজশাহীর মানুষ ও দক্ষ সেবাদাতাদের মধ্যে সেতুবন্ধন গড়ে তুলছে।
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" /> রাজশাহী, বাংলাদেশ
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" /> hello@shebakhhoj.example
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-navy">দরকারি লিংক</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><Link className="transition hover:text-emerald-700" to="/services">সেবা খুঁজুন</Link></li>
              <li><Link className="transition hover:text-emerald-700" to="/register">সেবাদাতা হিসেবে যোগ দিন</Link></li>
              <li><Link className="transition hover:text-emerald-700" to="/about">আমাদের সম্পর্কে</Link></li>
              <li><Link className="transition hover:text-emerald-700" to="/admin">ডেমো অ্যাডমিন প্যানেল</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-navy">সেবা ক্যাটাগরি</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link className="transition hover:text-emerald-700" to={`/services?category=${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} সেবাখোঁজ। সকল অধিকার সংরক্ষিত।</p>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            এটি একটি ডেমো প্রোটোটাইপ—সমস্ত প্রোফাইল ও রিভিউ কাল্পনিক।
          </p>
        </div>
      </div>
    </footer>
  )
}
