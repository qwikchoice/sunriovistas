'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Upload } from 'lucide-react'
import type { Photo } from '@/lib/data/photos'

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20" onClick={onClose}>
        <X size={20} />
      </button>
      <div className="relative max-w-4xl max-h-[85vh] w-full rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <Image src={photo.url} alt={photo.caption || ''} width={1200} height={800} className="object-contain w-full max-h-[80vh]" unoptimized />
        {photo.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-sm">{photo.caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}

type Props = {
  category: 'rv' | 'destination'
  entitySlug: string
  fallbackGallery?: { src: string; alt: string }[]
}

export default function DynamicGallery({ category, entitySlug, fallbackGallery = [] }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loaded, setLoaded] = useState(false)
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/photos?category=${category}&entitySlug=${entitySlug}`)
        if (res.ok) {
          const { photos: fetched } = await res.json()
          setPhotos(fetched)
        }
      } catch { /* use fallback */ }
      setLoaded(true)
    }
    load()
  }, [category, entitySlug])

  // Use uploaded photos if available, else fallback to static gallery
  const displayPhotos: { url: string; caption: string; id: string }[] =
    loaded && photos.length > 0
      ? photos.map((p) => ({ url: p.url, caption: p.caption, id: p.id }))
      : fallbackGallery.map((g, i) => ({ url: g.src, caption: g.alt, id: `fallback-${i}` }))

  if (!loaded) return null

  if (displayPhotos.length === 0) {
    return (
      <div className="border-2 border-dashed border-earth-200 rounded-2xl p-8 text-center">
        <Upload size={24} className="mx-auto text-earth-300 mb-2" />
        <p className="text-sm text-earth-400">No photos yet — upload via <a href="/admin/photos" className="text-brand-600 hover:underline">Admin → Photos</a></p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {displayPhotos.map((img, i) => (
          <div
            key={img.id}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${i === 0 ? 'col-span-2 h-64' : 'h-44'}`}
            onClick={() => {
              const p = photos.find((ph) => ph.id === img.id)
              if (p) setLightbox(p)
              else setLightbox({ id: img.id, url: img.url, caption: img.caption, category, entitySlug, fileName: '', originalName: '', isPrimary: false, uploadedAt: '' })
            }}
          >
            <Image
              src={img.url}
              alt={img.caption}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width:768px) 100vw, 50vw"
              unoptimized={img.url.startsWith('/uploads')}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </div>
        ))}
      </div>
      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}
