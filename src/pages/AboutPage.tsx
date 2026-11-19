import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles, Target, Users } from 'lucide-react'
import DemoNotice from '../components/DemoNotice'

const values = [
  {
    icon: ShieldCheck,
    title: 'বিশ্বাস ও স্বচ্ছতা',
    text: 'যাচাইকৃত প্রোফাইল ও খোলা রিভিউর মাধ্যমে সেবাদাতা ও গ্রাহক—দুই পক্ষেরই আস্থা অর্জন।',
  },
  {
    icon: Users,
    title: 'স্থানীয় সেবা',
    text: 'রাজশাহীর এলাকাভিত্তিক সেবাদাতাদের সামনে আনা, যাতে কাছেই পাওয়া যায় দক্ষ হাত।',
  },
  {
    icon: HeartHandshake,
    title: 'সহজ অভিজ্ঞতা',
    text: 'সাধারণ ভাষায় সমস্যা লিখলেই সঠিক সেবা ক্যাটাগরি খুঁজে দেওয়া—কারিগরি জ্ঞানের প্রয়োজন নেই।',
  },
]

export default function AboutPage() {
  return (
    <div className="container-content py-10 sm:py-14">
      <div className="max-w-3xl">
        <nav className="text-xs text-slate-500" aria-label="ব্রেডক্রাম্ব">
          <Link to="/" className="hover:text-emerald-700">হোম</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">আমাদের সম্পর্কে</span>
        </nav>
        <h1 className="section-title mt-4">আমাদের সম্পর্কে</h1>
        <p className="mt-3 text-base leading-8 text-slate-600">
          সেবাখোঁজ একটি স্থানীয় সেবা আবিষ্কারের প্ল্যাটফর্ম, যা রাজশাহীর মানুষকে তাদের এলাকার দক্ষ সেবাদাতার সাথে সংযুক্ত করে। ইলেকট্রিশিয়ান, প্লাম্বার, শিক্ষক কিংবা ফটোগ্রাফার—প্রয়োজন যাই হোক, সঠিক মানুষটি খুঁজে পাওয়া এখন সহজ।
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="card p-6 sm:p-7">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Target className="h-5 w-5" /></span>
          <h2 className="mt-4 text-xl font-bold text-navy">আমাদের লক্ষ্য</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            অনেক দক্ষ মানুষ আছেন যাদের কাজের কথা খুব কম মানুষ জানেন। আবার অনেকেরই প্রয়োজনের সময় বিশ্বস্ত সেবাদাতা পাওয়া হয় না। সেবাখোঁজ এই দুইটি দূরত্ব কমাতে চায়—এক্দিকে সেবাদাতাদের ডিজিটাল পরিচয় দেওয়া, অন্যদিকে গ্রাহকদের সহজে সেবা খুঁজে দেওয়া।
          </p>
        </section>
        <section className="card p-6 sm:p-7">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy"><Sparkles className="h-5 w-5" /></span>
          <h2 className="mt-4 text-xl font-bold text-navy">স্মার্ট সার্চ</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            আপনি চাইলে “বাসার পানির কল নষ্ট” বা “ল্যাপটপ ঠিক করাতে হবে”—এমন সাধারণ বাক্য লিখে দিতে পারেন। আমাদের কীওয়ার্ড-ভিত্তিক স্মার্ট সার্চ সেটিকে সঠিক সেবা ক্যাটাগরির সাথে মিলিয়ে দেয়। এটি কোনো এআই মডেল নয়; ভবিষ্যতে প্রকৃত এআই সার্চ সংযোগ করা যাবে।
          </p>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="section-title text-xl sm:text-2xl">আমাদের মূল্যবোধ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="card p-5">
              <value.icon className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-3 font-bold text-navy">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoNotice className="mt-10">
        এটি একটি প্রতিযোগিতামূলক প্রোটোটাইপ (MVP)। এখানকার সব সেবাদাতা, রিভিউ, রেটিং ও যাচাইকৃত ব্যাজ কাল্পনিক ডেমো ডাটা। ডেমো অ্যাডমিন প্যানেলের অনুমোদন কোনো বাস্তব পরিচয় যাচাই নয় এবং ডেমো প্রোফাইলে বাস্তব ফোন নম্বর দেওয়া হয়নি।
      </DemoNotice>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/services" className="btn-primary">সেবা খুঁজুন <ArrowRight className="h-4 w-4" /></Link>
        <Link to="/register" className="btn-outline">সেবাদাতা হিসেবে যোগ দিন</Link>
      </div>
    </div>
  )
}
