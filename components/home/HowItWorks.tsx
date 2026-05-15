import Link from 'next/link'

const steps = [
  {
    num:    '01',
    emoji:  '🚐',
    title:  'Choose Your RV',
    desc:   'Pick Lunaris, Stellaris, or Solaris — each one a different vibe, same premium experience.',
  },
  {
    num:    '02',
    emoji:  '📍',
    title:  'Pick a Destination',
    desc:   'Folsom Lake, Placerville, Wine Country, Red Hawk, or Auburn. You pick where; we handle the rest.',
  },
  {
    num:    '03',
    emoji:  '📅',
    title:  'Request Your Dates',
    desc:   'Submit your booking request. 2-night minimum. We\'ll review and confirm within 24 hours.',
  },
  {
    num:    '04',
    emoji:  '✅',
    title:  'Get Approved & Pay',
    desc:   'Once approved, a secure deposit link lands in your inbox. Pay deposit, balance auto-charged before arrival.',
  },
  {
    num:    '05',
    emoji:  '🌅',
    title:  'Arrive & Relax',
    desc:   'Drive your own car to the campsite. Your RV is already setup, stocked, and waiting for you.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">
            The Process
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-earth-900 mb-4">
            How It Works
          </h2>
          <p className="text-earth-500 text-lg max-w-xl mx-auto">
            Five simple steps to your perfect RV glamping weekend.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">

                {/* Number bubble */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-earth-950 text-brand-400 flex items-center justify-center text-2xl shadow-lg group-hover:bg-brand-600 group-hover:scale-110 transition-all duration-300">
                    {step.emoji}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-earth-900 mb-2">{step.title}</h3>
                <p className="text-earth-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key callout */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-700 rounded-3xl" />
          <div className="absolute inset-0 bg-noise opacity-20 rounded-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-8 lg:p-10">
            <div>
              <p className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                You do <span className="underline underline-offset-4">NOT</span> drive the RV.
              </p>
              <p className="text-brand-100 text-base">
                We deliver it fully setup to your chosen campsite. You just show up and enjoy.
              </p>
            </div>
            <Link
              href="/book"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-brand-700 font-bold text-base px-8 py-4 rounded-full hover:bg-brand-50 transition-all shadow-lg"
            >
              Start Booking →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
