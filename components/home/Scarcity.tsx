import Link from 'next/link'
import { Clock, CalendarX, TrendingUp } from 'lucide-react'

const alerts = [
  {
    icon: CalendarX,
    title: 'Summer Weekends Book Fast',
    desc:  'June–August lakefront weekends at Beals Point are the first to go. Peak season availability is limited.',
  },
  {
    icon: TrendingUp,
    title: 'Wine-Country Weekends Sell Out Early',
    desc:  'Harvest season (Sep–Nov) at our Harvest Hosts & winery destinations fills up months in advance.',
  },
  {
    icon: Clock,
    title: 'Holiday Weekends Are Gone in Days',
    desc:  'Memorial Day, Labor Day, 4th of July — these fill within days of opening. Don\'t wait.',
  },
]

export default function Scarcity() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-rust-600 text-sm font-bold uppercase tracking-widest mb-3">
            Limited Availability
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-earth-900 mb-3">
            Don&apos;t Miss Your Weekend
          </h2>
          <p className="text-earth-500 text-base max-w-lg mx-auto">
            With only 3 RVs available, weekends book up fast — especially in peak season.
          </p>
        </div>

        {/* Alert cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {alerts.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="border border-brand-200 bg-brand-50 rounded-2xl p-6 hover:border-brand-400 hover:shadow-card transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="font-semibold text-earth-900 text-base mb-2">{title}</h3>
              <p className="text-earth-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-earth-950 hover:bg-brand-600 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:shadow-glow"
          >
            Check Available Dates →
          </Link>
          <p className="text-earth-400 text-xs mt-3">
            No commitment to submit a request · Approval within 24 hours
          </p>
        </div>
      </div>
    </section>
  )
}
