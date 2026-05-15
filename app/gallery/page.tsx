'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowRight, Camera, MapPin, Heart } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Photo } from '@/lib/data/photos'

// ── Placeholder photos shown when no uploads exist ──────────────────────────

const RV_PLACEHOLDERS: Photo[] = [
  { id: 'p1', category: 'rv', entitySlug: 'lunaris',    fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1533760881669-80db4d7b341c?auto=format&fit=crop&w=800&q=80', caption: 'Lunaris — Cozy interior at dusk',       isPrimary: false, uploadedAt: '' },
  { id: 'p2', category: 'rv', entitySlug: 'lunaris',    fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80', caption: 'Lunaris — Lakeside morning setup',       isPrimary: false, uploadedAt: '' },
  { id: 'p3', category: 'rv', entitySlug: 'stellaris',  fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', caption: 'Stellaris — Mountain wellness retreat',  isPrimary: false, uploadedAt: '' },
  { id: 'p4', category: 'rv', entitySlug: 'stellaris',  fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1559521783-1d1599583485?auto=format&fit=crop&w=800&q=80', caption: 'Stellaris — Sunrise yoga session',        isPrimary: false, uploadedAt: '' },
  { id: 'p5', category: 'rv', entitySlug: 'solaris',    fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1474293397961-0f0d41a9f0b1?auto=format&fit=crop&w=800&q=80', caption: 'Solaris — Friends wine country evening',  isPrimary: false, uploadedAt: '' },
  { id: 'p6', category: 'rv', entitySlug: 'solaris',    fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=800&q=80', caption: 'Solaris — Golden hour campsite',          isPrimary: false, uploadedAt: '' },
]

const DEST_PLACEHOLDERS: Photo[] = [
  { id: 'd1', category: 'destination', entitySlug: 'folsom-lake',  fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80', caption: 'Folsom Lake — Sunrise over the water',     isPrimary: false, uploadedAt: '' },
  { id: 'd2', category: 'destination', entitySlug: 'folsom-lake',  fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80', caption: 'Beals Point — Campfire evening',           isPrimary: false, uploadedAt: '' },
  { id: 'd3', category: 'destination', entitySlug: 'placerville',  fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', caption: 'Placerville — Sierra foothills view',      isPrimary: false, uploadedAt: '' },
  { id: 'd4', category: 'destination', entitySlug: 'wine-country', fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1474692981400-0f4e40c7de50?auto=format&fit=crop&w=800&q=80', caption: 'Wine Country — Vineyard evening glamping',  isPrimary: false, uploadedAt: '' },
  { id: 'd5', category: 'destination', entitySlug: 'auburn',       fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80', caption: 'Auburn — Gold Country river canyon',        isPrimary: false, uploadedAt: '' },
  { id: 'd6', category: 'destination', entitySlug: 'red-hawk',     fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=800&q=80', caption: 'Red Hawk — Easy overnight escape',           isPrimary: false, uploadedAt: '' },
]

const CUSTOMER_PLACEHOLDERS: Photo[] = [
  { id: 'c1', category: 'customer', entitySlug: 'general', fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80', caption: 'Family glamping weekend at Folsom Lake',     isPrimary: false, uploadedAt: '' },
  { id: 'c2', category: 'customer', entitySlug: 'general', fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80', caption: 'Couples retreat in the Stellaris',            isPrimary: false, uploadedAt: '' },
  { id: 'c3', category: 'customer', entitySlug: 'general', fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80', caption: 'Friends group in Solaris at wine country',    isPrimary: false, uploadedAt: '' },
  { id: 'c4', category: 'customer', entitySlug: 'general', fileName: '', originalName: '', url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80', caption: 'Morning coffee by the lake in Lunaris',       isPrimary: false, uploadedAt: '' },
]

type ActiveTab = 'all' | 'rv' | 'destination' | 'customer'

const TABS: { id: ActiveTab; label: string; icon: typeof Camera }[] = [
  { id: 'all',         label: 'All Photos',          icon: Camera  },
  { id: 'rv',          label: 'RV Experiences',       icon: Camera  },
  { id: 'destination', label: 'Destinations',          icon: MapPin  },
  { id: 'customer',    label: 'Guest Stories',         icon: Heart   },
]

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      <div
        className="relative max-w-4xl max-h-[85vh] w-full rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.url}
          alt={photo.caption || ''}
          width={1200}
          height={800}
          className="object-contain w-full h-full max-h-[80vh]"
          unoptimized
        />
        {photo.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-sm font-medium">{photo.caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Gallery grid ──────────────────────────────────────────────────────────────

function GalleryGrid({ photos, onOpen }: { photos: Photo[]; onOpen: (p: Photo) => void }) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <Camera size={40} className="mx-auto text-earth-300 mb-4" />
        <p className="text-earth-500 font-medium">No photos in this category yet.</p>
        <p className="text-earth-400 text-sm mt-1">Photos uploaded via Admin will appear here.</p>
      </div>
    )
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-card hover:shadow-card-lg transition-all duration-300"
          onClick={() => onOpen(photo)}
        >
          <Image
            src={photo.url}
            alt={photo.caption || ''}
            width={500}
            height={400}
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
          {photo.caption && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-white text-xs font-medium line-clamp-2">{photo.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [tab, setTab] = useState<ActiveTab>('all')
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([])
  const [lightbox, setLightbox] = useState<Photo | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/photos?category=all')
        if (res.ok) {
          const { photos } = await res.json()
          setUploadedPhotos(photos)
        }
      } catch { /* use placeholders */ }
      setLoaded(true)
    }
    load()
  }, [])

  // Merge uploaded photos with placeholders (uploaded take priority)
  const allPhotos: Photo[] = loaded
    ? [
        ...uploadedPhotos,
        // Only show placeholders for categories that have no real uploads
        ...(uploadedPhotos.filter((p) => p.category === 'rv').length === 0 ? RV_PLACEHOLDERS : []),
        ...(uploadedPhotos.filter((p) => p.category === 'destination').length === 0 ? DEST_PLACEHOLDERS : []),
        ...(uploadedPhotos.filter((p) => p.category === 'customer').length === 0 ? CUSTOMER_PLACEHOLDERS : []),
      ]
    : [...RV_PLACEHOLDERS, ...DEST_PLACEHOLDERS, ...CUSTOMER_PLACEHOLDERS]

  const displayed =
    tab === 'all'
      ? allPhotos
      : allPhotos.filter((p) => p.category === tab)

  const counts = {
    all: allPhotos.length,
    rv: allPhotos.filter((p) => p.category === 'rv').length,
    destination: allPhotos.filter((p) => p.category === 'destination').length,
    customer: allPhotos.filter((p) => p.category === 'customer').length,
  }

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-earth-950 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/8 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              Photo Gallery
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Real Moments, Real Escapes
            </h1>
            <p className="text-earth-300 text-xl leading-relaxed max-w-2xl mx-auto">
              Browse RV interiors, destination scenery, and guest experiences. Every photo tells a different story.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${
                    tab === t.id
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-earth-200 text-earth-600 hover:border-brand-300 hover:text-earth-900'
                  }`}
                >
                  {t.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    tab === t.id ? 'bg-brand-500 text-white' : 'bg-earth-100 text-earth-500'
                  }`}>
                    {counts[t.id]}
                  </span>
                </button>
              ))}
            </div>

            {!loaded ? (
              <div className="text-center py-16 text-earth-400">Loading gallery...</div>
            ) : (
              <GalleryGrid photos={displayed} onOpen={setLightbox} />
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-earth-950 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready for Your Own Story?
            </h2>
            <p className="text-earth-400 text-lg mb-8">
              Book your glamping escape. You drive your car — we handle everything else.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all hover:shadow-glow"
            >
              Check Availability <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />

      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}
