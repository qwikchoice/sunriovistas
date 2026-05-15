import { X, Check } from 'lucide-react'

const rows = [
  { label: 'RV Insurance',        traditional: true,  ours: false },
  { label: 'Gas Costs',           traditional: true,  ours: false },
  { label: 'Mileage Fees',        traditional: true,  ours: false },
  { label: 'Stressful Driving',   traditional: true,  ours: false },
  { label: 'Towing Required',     traditional: true,  ours: false },
  { label: 'Tank Dumping',        traditional: true,  ours: false },
  { label: 'Setup & Teardown',    traditional: true,  ours: false },
  { label: 'RV Already Setup',    traditional: false, ours: true  },
  { label: 'Drive Your Own Car',  traditional: false, ours: true  },
  { label: 'Beginner Friendly',   traditional: false, ours: true  },
]

export default function WhyDifferent() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">
            Why SunRio Vistas
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-earth-900 mb-4">
            Not Your Typical RV Rental
          </h2>
          <p className="text-earth-500 text-lg max-w-xl mx-auto leading-relaxed">
            Traditional RV rentals come with hidden costs and stress. We&apos;ve eliminated all of it.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-3xl overflow-hidden shadow-card-lg border border-earth-100">
          {/* Col headers */}
          <div className="grid grid-cols-3 bg-earth-950 text-white">
            <div className="px-6 py-5 text-sm font-semibold text-earth-300"></div>
            <div className="px-6 py-5 text-center">
              <span className="text-sm font-semibold text-earth-400 uppercase tracking-wide">Traditional RV Rental</span>
            </div>
            <div className="px-6 py-5 text-center bg-brand-600/20 border-l border-brand-500/30">
              <span className="text-sm font-bold text-brand-300 uppercase tracking-wide">SunRio Vistas ✨</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 border-b border-earth-100 last:border-0 transition-colors hover:bg-earth-50 ${
                i % 2 === 0 ? 'bg-white' : 'bg-earth-50/40'
              }`}
            >
              <div className="px-6 py-4 text-sm font-medium text-earth-700 flex items-center">
                {row.label}
              </div>
              <div className="px-6 py-4 flex items-center justify-center">
                {row.traditional ? (
                  <span className="inline-flex items-center gap-1.5 text-rust-600 text-sm font-medium">
                    <X size={16} className="shrink-0" /> Required
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-forest-700 text-sm font-medium">
                    <Check size={16} className="shrink-0" /> Yes
                  </span>
                )}
              </div>
              <div className="px-6 py-4 flex items-center justify-center bg-brand-50/60 border-l border-brand-100">
                {row.ours ? (
                  <span className="inline-flex items-center gap-1.5 text-forest-700 font-semibold text-sm">
                    <Check size={16} className="shrink-0" /> Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-forest-700 font-bold text-sm">
                    <Check size={16} className="shrink-0" /> Not required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-8 text-center">
          <p className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-800 text-sm font-semibold px-5 py-3 rounded-full">
            <span className="text-brand-500">★</span>
            You do <span className="underline underline-offset-2">NOT</span> drive the RV — we deliver it fully setup.
          </p>
        </div>
      </div>
    </section>
  )
}
