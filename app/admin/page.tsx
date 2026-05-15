import Link from 'next/link'
import { Camera, Calendar, DollarSign, Users, ArrowRight, Image as ImageIcon, Settings } from 'lucide-react'

const QUICK_LINKS = [
  {
    href:    '/admin/photos',
    label:   'Photo Manager',
    desc:    'Upload RV, destination & customer photos',
    icon:    Camera,
    color:   'bg-brand-50 text-brand-700 border-brand-200',
    iconBg:  'bg-brand-100',
    ready:   true,
  },
  {
    href:    '#',
    label:   'Bookings',
    desc:    'Approve, reject, and manage all reservations',
    icon:    Calendar,
    color:   'bg-earth-50 text-earth-600 border-earth-200',
    iconBg:  'bg-earth-100',
    ready:   false,
  },
  {
    href:    '#',
    label:   'Pricing Rules',
    desc:    'Seasonal rates, add-on pricing, blackout dates',
    icon:    DollarSign,
    color:   'bg-earth-50 text-earth-600 border-earth-200',
    iconBg:  'bg-earth-100',
    ready:   false,
  },
  {
    href:    '#',
    label:   'Customers',
    desc:    'View guest history, notes, and contact info',
    icon:    Users,
    color:   'bg-earth-50 text-earth-600 border-earth-200',
    iconBg:  'bg-earth-100',
    ready:   false,
  },
]

const SETUP_CHECKLIST = [
  { task: 'Add NEXTAUTH_SECRET to .env.local',              done: false },
  { task: 'Configure Google OAuth credentials',              done: false },
  { task: 'Configure Facebook OAuth credentials',           done: false },
  { task: 'Configure Apple Sign In credentials',            done: false },
  { task: 'Add Stripe PUBLISHABLE & SECRET keys',           done: false },
  { task: 'Connect PostgreSQL database (Prisma)',            done: false },
  { task: 'Set up Resend or SendGrid for booking emails',   done: false },
  { task: 'Upload RV photos via Photo Manager',             done: true  },
  { task: 'Upload destination photos via Photo Manager',    done: false },
]

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-earth-900 mb-1">Admin Dashboard</h1>
        <p className="text-earth-500">Manage your SunRio Vistas platform</p>
      </div>

      {/* Quick links */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-earth-400 uppercase tracking-wider mb-4">Quick Access</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon
            const card = (
              <div className={`border-2 rounded-3xl p-5 transition-all ${item.color} ${item.ready ? 'hover:shadow-card cursor-pointer hover:-translate-y-0.5' : 'opacity-60'}`}>
                <div className={`w-10 h-10 rounded-2xl ${item.iconBg} flex items-center justify-center mb-4`}>
                  <Icon size={18} />
                </div>
                <p className="font-bold text-sm mb-1">{item.label}</p>
                <p className="text-xs opacity-70 leading-snug">{item.desc}</p>
                {!item.ready && (
                  <span className="inline-block mt-2 text-xs bg-earth-200 text-earth-500 px-2 py-0.5 rounded-full">Coming soon</span>
                )}
                {item.ready && (
                  <ArrowRight size={14} className="mt-3" />
                )}
              </div>
            )
            return item.ready
              ? <Link key={item.href} href={item.href}>{card}</Link>
              : <div key={item.label}>{card}</div>
          })}
        </div>
      </section>

      {/* Setup checklist */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-earth-400 uppercase tracking-wider mb-4">Setup Checklist</h2>
        <div className="bg-white rounded-3xl border border-earth-100 shadow-card divide-y divide-earth-100">
          {SETUP_CHECKLIST.map((item) => (
            <div key={item.task} className="flex items-center gap-3 px-5 py-3.5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                item.done ? 'bg-forest-600 border-forest-600' : 'border-earth-300'
              }`}>
                {item.done && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className={`text-sm ${item.done ? 'text-earth-400 line-through' : 'text-earth-800'}`}>{item.task}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ENV vars reference */}
      <section>
        <h2 className="text-sm font-bold text-earth-400 uppercase tracking-wider mb-4">Environment Variables</h2>
        <div className="bg-earth-950 rounded-3xl p-5 text-earth-300 text-xs font-mono space-y-1 leading-relaxed">
          {[
            '# Auth',
            'NEXTAUTH_URL=https://sunriovistas.com',
            'NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>',
            '',
            '# Google OAuth',
            'GOOGLE_CLIENT_ID=',
            'GOOGLE_CLIENT_SECRET=',
            '',
            '# Facebook OAuth',
            'FACEBOOK_CLIENT_ID=',
            'FACEBOOK_CLIENT_SECRET=',
            '',
            '# Apple Sign In',
            'APPLE_CLIENT_ID=       # Your Service ID',
            'APPLE_TEAM_ID=',
            'APPLE_PRIVATE_KEY_ID=',
            'APPLE_PRIVATE_KEY=     # Full private key string',
            '',
            '# Stripe',
            'STRIPE_PUBLISHABLE_KEY=pk_live_...',
            'STRIPE_SECRET_KEY=sk_live_...',
            'STRIPE_WEBHOOK_SECRET=whsec_...',
            '',
            '# Admin',
            'ADMIN_PIN=<your secure pin>',
          ].map((line, i) => (
            <div key={i} className={line.startsWith('#') ? 'text-brand-400' : line === '' ? 'h-2' : ''}>
              {line}
            </div>
          ))}
        </div>
        <p className="text-xs text-earth-400 mt-3">
          Save these in <code className="bg-earth-100 px-1.5 py-0.5 rounded text-earth-700">.env.local</code> (never commit to git).
        </p>
      </section>
    </div>
  )
}
