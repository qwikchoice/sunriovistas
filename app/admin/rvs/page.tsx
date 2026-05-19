'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Save, Plus, ChevronDown, ChevronUp, ToggleLeft, ToggleRight } from 'lucide-react'

interface RV {
  id: string
  slug: string
  name: string
  emoji: string
  tagline: string | null
  description: string | null
  sleeps: number
  active: boolean
}

function getPin() {
  if (typeof window !== 'undefined') return sessionStorage.getItem('admin-pin') ?? ''
  return ''
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full bg-white border border-earth-200 rounded-xl px-3 py-2 text-sm text-earth-900 focus:outline-none focus:border-brand-400 transition'

export default function AdminRVsPage() {
  const [rvs, setRVs]           = useState<RV[]>([])
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [drafts, setDrafts]     = useState<Record<string, Partial<RV>>>({})
  const [saving, setSaving]     = useState<string | null>(null)
  const [msg, setMsg]           = useState<Record<string, string>>({})
  const [dbError, setDbError]   = useState(false)

  const fetchRVs = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/rvs', { headers: { 'x-admin-pin': getPin() } })
    if (res.ok) {
      setRVs(await res.json())
      setDbError(false)
    } else {
      setDbError(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchRVs() }, [fetchRVs])

  function draft(id: string, key: keyof RV, value: string | number | boolean) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [key]: value } }))
  }

  function val<K extends keyof RV>(rv: RV, id: string, key: K): RV[K] {
    return (drafts[id]?.[key] ?? rv[key]) as RV[K]
  }

  async function save(rv: RV) {
    setSaving(rv.id)
    const body = { ...rv, ...drafts[rv.id] }
    const res = await fetch(`/api/admin/rvs/${rv.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': getPin() },
      body:    JSON.stringify(body),
    })
    setSaving(null)
    if (res.ok) {
      setMsg((m) => ({ ...m, [rv.id]: 'Saved!' }))
      setDrafts((d) => { const n = { ...d }; delete n[rv.id]; return n })
      fetchRVs()
      setTimeout(() => setMsg((m) => { const n = { ...m }; delete n[rv.id]; return n }), 3000)
    } else {
      setMsg((m) => ({ ...m, [rv.id]: 'Save failed' }))
    }
  }

  if (dbError) return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-earth-900 mb-4">RVs</h1>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
        Database not connected. Set <code className="bg-amber-100 px-1.5 rounded">DATABASE_URL</code> in <code className="bg-amber-100 px-1.5 rounded">.env.local</code> and run migrations, then seed from the Dashboard.
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-earth-900">RVs</h1>
        <button className="flex items-center gap-2 text-sm bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-xl transition-all opacity-50 cursor-not-allowed" disabled title="Coming soon">
          <Plus size={14} /> Add RV
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-earth-400"><Loader2 size={18} className="animate-spin" /> Loading…</div>
      ) : rvs.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
          No RVs found. Go to Dashboard and click <strong>Seed Database</strong> first.
        </div>
      ) : (
        <div className="space-y-3">
          {rvs.map((rv) => {
            const isOpen = expanded === rv.id
            const isDirty = !!drafts[rv.id] && Object.keys(drafts[rv.id]).length > 0
            const active = val(rv, rv.id, 'active')
            return (
              <div key={rv.id} className="bg-white border border-earth-100 rounded-2xl shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 px-5 py-4 text-left"
                  onClick={() => setExpanded(isOpen ? null : rv.id)}
                >
                  <span className="text-2xl">{rv.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-earth-900">{rv.name}</p>
                    <p className="text-xs text-earth-400">{rv.tagline}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${active ? 'bg-green-100 text-green-700' : 'bg-earth-100 text-earth-500'}`}>
                    {active ? 'Active' : 'Inactive'}
                  </span>
                  {isDirty && <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">Unsaved</span>}
                  {isOpen ? <ChevronUp size={16} className="text-earth-400 shrink-0" /> : <ChevronDown size={16} className="text-earth-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="border-t border-earth-100 px-5 py-5 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Name">
                        <input className={inputCls} value={val(rv, rv.id, 'name') as string} onChange={(e) => draft(rv.id, 'name', e.target.value)} />
                      </Field>
                      <Field label="Emoji">
                        <input className={inputCls} value={val(rv, rv.id, 'emoji') as string} onChange={(e) => draft(rv.id, 'emoji', e.target.value)} />
                      </Field>
                      <Field label="Slug (URL)">
                        <input className={inputCls} value={rv.slug} disabled title="Slug cannot be changed" />
                      </Field>
                      <Field label="Sleeps">
                        <input type="number" min={1} max={12} className={inputCls} value={val(rv, rv.id, 'sleeps') as number} onChange={(e) => draft(rv.id, 'sleeps', Number(e.target.value))} />
                      </Field>
                    </div>
                    <Field label="Tagline">
                      <input className={inputCls} value={(val(rv, rv.id, 'tagline') ?? '') as string} onChange={(e) => draft(rv.id, 'tagline', e.target.value)} />
                    </Field>
                    <Field label="Description">
                      <textarea rows={4} className={`${inputCls} resize-none`} value={(val(rv, rv.id, 'description') ?? '') as string} onChange={(e) => draft(rv.id, 'description', e.target.value)} />
                    </Field>

                    {/* Active toggle */}
                    <div className="flex items-center justify-between pt-2 border-t border-earth-100">
                      <div>
                        <p className="text-sm font-semibold text-earth-800">Active</p>
                        <p className="text-xs text-earth-400">Inactive RVs are hidden from public pages</p>
                      </div>
                      <button
                        onClick={() => draft(rv.id, 'active', !active)}
                        className={`transition-colors ${active ? 'text-green-600' : 'text-earth-400'}`}
                      >
                        {active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => save(rv)}
                        disabled={saving === rv.id || !isDirty}
                        className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                      >
                        {saving === rv.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Save Changes
                      </button>
                      {msg[rv.id] && <p className={`text-sm font-medium ${msg[rv.id] === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg[rv.id]}</p>}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
