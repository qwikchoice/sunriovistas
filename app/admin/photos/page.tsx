'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Upload, Trash2, Star, Check, X, Camera, Image as ImageIcon, Users } from 'lucide-react'
import type { Photo, PhotoCategory } from '@/lib/data/photos'

// ── Entity options ────────────────────────────────────────────────────────────

const RV_OPTIONS   = ['lunaris', 'stellaris', 'solaris']
const DEST_OPTIONS = ['folsom-lake', 'placerville', 'red-hawk', 'wine-country', 'auburn']

const RV_LABELS: Record<string, string>   = { lunaris: '🌙 Lunaris', stellaris: '✨ Stellaris', solaris: '☀️ Solaris' }
const DEST_LABELS: Record<string, string> = {
  'folsom-lake':  'Folsom Lake / Beals Point',
  'placerville':  'Placerville RV Resort',
  'red-hawk':     'Red Hawk Casino',
  'wine-country': 'Wine Country / Harvest Hosts',
  'auburn':       'Auburn / Gold Country',
}

type Tab = 'rv' | 'destination' | 'customer'

const TABS: { id: Tab; label: string; icon: typeof Camera; color: string }[] = [
  { id: 'rv',          label: 'RV Photos',          icon: Camera,     color: 'text-brand-600' },
  { id: 'destination', label: 'Destination Photos',  icon: ImageIcon,  color: 'text-forest-700' },
  { id: 'customer',    label: 'Customer Photos',     icon: Users,      color: 'text-purple-600' },
]

// ── Upload zone ───────────────────────────────────────────────────────────────

function UploadZone({
  onFiles,
  uploading,
}: {
  onFiles: (files: File[]) => void
  uploading: boolean
}) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handle = useCallback(
    (files: FileList | null) => {
      if (!files) return
      const arr = Array.from(files).filter((f) => f.type.startsWith('image/'))
      if (arr.length) onFiles(arr)
    },
    [onFiles]
  )

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files) }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
        dragging ? 'border-brand-500 bg-brand-50' : 'border-earth-200 hover:border-brand-300 hover:bg-earth-50'
      } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
      <Upload size={32} className="mx-auto text-earth-400 mb-3" />
      <p className="text-sm font-semibold text-earth-700 mb-1">
        {uploading ? 'Uploading...' : 'Drop photos here or click to browse'}
      </p>
      <p className="text-xs text-earth-400">JPG, PNG, WebP · Max 10 MB per file · Multiple files OK</p>
    </div>
  )
}

// ── Photo card ────────────────────────────────────────────────────────────────

function PhotoCard({
  photo,
  onDelete,
  onTogglePrimary,
}: {
  photo: Photo
  onDelete: (id: string) => void
  onTogglePrimary: (id: string, current: boolean) => void
}) {
  const [deleting, setDeleting] = useState(false)
  const [togglingPrimary, setTogglingPrimary] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this photo?')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/photos/${photo.id}`, { method: 'DELETE' })
    if (res.ok) onDelete(photo.id)
    else setDeleting(false)
  }

  async function handlePrimary() {
    setTogglingPrimary(true)
    const res = await fetch('/api/admin/photos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: photo.id, isPrimary: !photo.isPrimary }),
    })
    if (res.ok) {
      const { photo: updated } = await res.json()
      onTogglePrimary(photo.id, updated.isPrimary)
    }
    setTogglingPrimary(false)
  }

  if (deleting) return null

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-earth-100 aspect-square shadow-card">
      <Image
        src={photo.url}
        alt={photo.caption || photo.originalName}
        fill
        className="object-cover"
        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
        unoptimized
      />

      {/* Primary badge */}
      {photo.isPrimary && (
        <div className="absolute top-2 left-2 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={10} /> Primary
        </div>
      )}

      {/* Actions overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <button
          onClick={handlePrimary}
          disabled={togglingPrimary}
          title={photo.isPrimary ? 'Unset primary' : 'Set as primary'}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            photo.isPrimary
              ? 'bg-brand-500 text-white'
              : 'bg-white/20 text-white hover:bg-brand-500'
          }`}
        >
          <Star size={14} />
        </button>
        <button
          onClick={handleDelete}
          title="Delete photo"
          className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-red-500 flex items-center justify-center transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Caption */}
      {photo.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <p className="text-white text-xs line-clamp-2">{photo.caption}</p>
        </div>
      )}
    </div>
  )
}

// ── Main admin page ───────────────────────────────────────────────────────────

export default function AdminPhotosPage() {
  const [tab, setTab] = useState<Tab>('rv')
  const [entitySlug, setEntitySlug] = useState<string>('lunaris')
  const [caption, setCaption] = useState('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  // Update entity slug when tab changes
  useEffect(() => {
    if (tab === 'rv') setEntitySlug('lunaris')
    else if (tab === 'destination') setEntitySlug('folsom-lake')
    else setEntitySlug('general')
  }, [tab])

  // Fetch photos whenever tab or entitySlug changes
  useEffect(() => {
    fetchPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, entitySlug])

  async function fetchPhotos() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ category: tab })
      if (tab !== 'customer') params.set('entitySlug', entitySlug)
      const res = await fetch(`/api/admin/photos?${params}`)
      const { photos } = await res.json()
      setPhotos(photos)
    } catch {
      showToast('Failed to load photos', false)
    } finally {
      setLoading(false)
    }
  }

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleFiles(files: File[]) {
    setUploading(true)
    let successCount = 0
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('category', tab)
      fd.append('entitySlug', tab === 'customer' ? 'general' : entitySlug)
      fd.append('caption', caption)

      const res = await fetch('/api/admin/photos', { method: 'POST', body: fd })
      if (res.ok) {
        const { photo } = await res.json()
        setPhotos((prev) => [photo, ...prev])
        successCount++
      }
    }
    setUploading(false)
    if (successCount > 0) {
      showToast(`${successCount} photo${successCount > 1 ? 's' : ''} uploaded`, true)
      setCaption('')
    } else {
      showToast('Upload failed', false)
    }
  }

  function handleDelete(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    showToast('Photo deleted', true)
  }

  function handleTogglePrimary(id: string, isPrimary: boolean) {
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.category === tab && p.entitySlug === entitySlug) {
          return { ...p, isPrimary: p.id === id ? isPrimary : false }
        }
        return p
      })
    )
    showToast(isPrimary ? 'Set as primary photo' : 'Unset primary', true)
  }

  const entityOptions = tab === 'rv' ? RV_OPTIONS : tab === 'destination' ? DEST_OPTIONS : []
  const entityLabels  = tab === 'rv' ? RV_LABELS : DEST_LABELS

  return (
    <div className="min-h-screen bg-earth-50">

      {/* Header */}
      <div className="bg-earth-950 text-white px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-earth-400 text-xs font-bold uppercase tracking-widest mb-1">SunRio Vistas</p>
            <h1 className="font-display text-2xl font-bold">Photo Manager</h1>
          </div>
          <a href="/" className="text-earth-400 hover:text-white text-sm transition-colors">
            ← Back to site
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 shadow-card w-fit">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-earth-950 text-white shadow'
                    : 'text-earth-600 hover:text-earth-900 hover:bg-earth-50'
                }`}
              >
                <Icon size={15} />
                {t.label}
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT: upload panel */}
          <div className="lg:col-span-1 space-y-4">

            {/* Entity selector */}
            {tab !== 'customer' && (
              <div className="bg-white rounded-2xl p-5 shadow-card border border-earth-100">
                <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                  {tab === 'rv' ? 'Select RV' : 'Select Destination'}
                </label>
                <div className="space-y-2">
                  {entityOptions.map((slug) => (
                    <button
                      key={slug}
                      onClick={() => setEntitySlug(slug)}
                      className={`w-full text-left text-sm px-3 py-2.5 rounded-xl border transition-all ${
                        entitySlug === slug
                          ? 'border-brand-400 bg-brand-50 text-brand-800 font-semibold'
                          : 'border-earth-200 text-earth-700 hover:border-brand-200'
                      }`}
                    >
                      {entityLabels[slug] ?? slug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Caption input */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-earth-100">
              <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                Caption (optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe this photo..."
                className="w-full border border-earth-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-400 transition"
              />
            </div>

            {/* Upload zone */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-earth-100">
              <p className="text-xs font-bold text-earth-500 uppercase tracking-wider mb-3">
                Upload Photos
              </p>
              <UploadZone onFiles={handleFiles} uploading={uploading} />
            </div>

            {/* Info */}
            <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 text-xs text-brand-800 leading-relaxed">
              <p className="font-semibold mb-1">💡 How photos are used</p>
              <ul className="space-y-1 text-brand-700">
                <li>• <strong>Primary</strong> photo = used as the main image on the RV/destination page</li>
                <li>• All photos appear in the public Gallery</li>
                <li>• Customer photos show in the gallery under their own tab</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: photo grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-earth-900">
                {tab === 'customer'
                  ? 'Customer Photos'
                  : (entityLabels[entitySlug] ?? entitySlug)}{' '}
                <span className="text-earth-400 font-normal text-sm">({photos.length} photos)</span>
              </h2>
              {loading && <p className="text-xs text-earth-400">Loading...</p>}
            </div>

            {!loading && photos.length === 0 && (
              <div className="bg-white rounded-3xl border border-dashed border-earth-200 p-12 text-center">
                <ImageIcon size={36} className="mx-auto text-earth-300 mb-3" />
                <p className="text-earth-500 text-sm font-medium">No photos uploaded yet</p>
                <p className="text-earth-400 text-xs mt-1">Upload photos using the panel on the left</p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onDelete={handleDelete}
                  onTogglePrimary={handleTogglePrimary}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-card-lg text-sm font-semibold transition-all ${
          toast.ok ? 'bg-forest-700 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.ok ? <Check size={15} /> : <X size={15} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}
