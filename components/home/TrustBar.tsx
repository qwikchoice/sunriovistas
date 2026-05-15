import { Shield, Fuel, Truck, Wrench, Clock, Star } from 'lucide-react'

const items = [
  { icon: Shield, label: 'No RV Insurance Required' },
  { icon: Fuel,   label: 'Zero Gas Costs' },
  { icon: Truck,  label: 'No Towing Needed' },
  { icon: Wrench, label: 'No Setup Stress' },
  { icon: Clock,  label: 'More Time with Family' },
  { icon: Star,   label: 'Beginner Friendly' },
]

export default function TrustBar() {
  return (
    <section className="bg-earth-950 py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-earth-300">
              <Icon size={14} className="text-brand-400 shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
