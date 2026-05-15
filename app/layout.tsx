import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SunRio Vistas — Luxury RV Glamping Without Driving an RV',
    template: '%s | SunRio Vistas',
  },
  description:
    'Premium stationary RV glamping near Folsom Lake, California. No RV insurance, no gas, no towing. Arrive in your own car to a fully setup luxury RV experience.',
  keywords: [
    'RV glamping Folsom Lake',
    'glamping near Sacramento',
    'luxury camping California',
    'stationary RV rental',
    'winery glamping California',
    'family glamping Northern California',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sunriovistas.com',
    siteName: 'SunRio Vistas',
    title: 'SunRio Vistas — Luxury RV Glamping Without Driving an RV',
    description:
      'Skip RV insurance, gas costs, and stressful driving. Arrive in your own car to a fully setup premium RV experience near Folsom Lake.',
    images: [{ url: 'https://sunriovistas.com/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  metadataBase: new URL('https://sunriovistas.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
