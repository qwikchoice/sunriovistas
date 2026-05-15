import { DollarSign, TrendingDown } from 'lucide-react'

const valueStack = [
  { item: 'RV Insurance savings',      value: '$200+' },
  { item: 'Gas & mileage fees',        value: '$150+' },
  { item: 'Setup stress — priceless',  value: '∞' },
  { item: 'More family time',          value: '∞' },
  { item: 'No dumping tanks',          value: '$50+' },
  { item: 'No RV driving stress',      value: 'priceless' },
]

export default function SavingsAnchor() {
  return (
    <section className="py-24 bg-earth-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: value stack */}
          <div>
            <span className="inline-block text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">
              Real Savings
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-earth-900 mb-6">
              What You&apos;re Actually Saving
            </h2>
            <p className="text-earth-500 text-lg leading-relaxed mb-8">
              Most 3-day traditional RV rentals cost{' '}
              <span className="font-bold text-rust-600 line-through">$800–$1,200+</span> after insurance,
              booking fees, gas, mileage, and add-ons.
            </p>

            <div className="space-y-3">
              {valueStack.map(({ item, value }) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-3 px-4 bg-white rounded-xl border border-earth-100 shadow-sm"
                >
                  <span className="text-earth-700 text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                    {item}
                  </span>
                  <span className="text-forest-700 font-bold text-sm">{value} saved</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: price card */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-brand-400/10 rounded-3xl blur-2xl" />

            <div className="relative bg-earth-950 rounded-3xl p-8 text-white overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-noise opacity-20" />
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-600/20 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingDown className="text-brand-400" size={20} />
                  <span className="text-brand-400 text-sm font-bold uppercase tracking-wider">Our Pricing</span>
                </div>

                <div className="mb-8">
                  <p className="text-earth-400 text-sm mb-2">Our luxury glamping stays</p>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-6xl font-bold text-white">$500</span>
                    <span className="text-earth-400 text-lg mb-2">or less</span>
                  </div>
                  <p className="text-earth-400 text-sm mt-1">before campground fees · 3-day stay</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    'RV delivered fully setup',
                    'No insurance required',
                    'No gas or mileage fees',
                    '$60 cleaning fee included',
                    'Premium amenities onboard',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-earth-200">
                      <DollarSign size={14} className="text-brand-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-xs text-earth-400 leading-relaxed">
                    <span className="text-brand-300 font-semibold">Campground fees</span> are paid
                    directly to the campground/host and are not included in your booking total.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
