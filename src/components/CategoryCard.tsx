import { Link } from 'react-router-dom'
import {
  Camera,
  GraduationCap,
  Laptop,
  Snowflake,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { Category } from '../types'

const iconMap: Record<string, LucideIcon> = {
  wrench: Wrench,
  'graduation-cap': GraduationCap,
  laptop: Laptop,
  snowflake: Snowflake,
  sparkles: Sparkles,
  camera: Camera,
}

const accentMap: Record<string, string> = {
  'home-repair': 'bg-amber-50 text-amber-600 group-hover:bg-amber-100',
  education: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100',
  technology: 'bg-sky-50 text-sky-600 group-hover:bg-sky-100',
  appliance: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100',
  'home-services': 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
  events: 'bg-rose-50 text-rose-600 group-hover:bg-rose-100',
}

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] ?? Wrench
  const accent = accentMap[category.id] ?? 'bg-slate-100 text-navy'

  return (
    <Link
      to={`/services?category=${category.id}`}
      className="group card flex h-full flex-col p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-soft"
    >
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition ${accent}`}>
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-bold text-navy">{category.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        {category.nameEn}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {category.services.map((service) => (
          <span key={service.en} className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
            {service.bn}
          </span>
        ))}
      </div>
    </Link>
  )
}
