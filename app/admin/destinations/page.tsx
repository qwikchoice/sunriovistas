'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Save, ChevronDown, ChevronUp, ToggleLeft, ToggleRight } from 'lucide-react'

interface Destination {
  id: string
  slug: string
  name: string
  region: string | null
  campFeeNote: string | null
  campFeeMin: string | null
  campFeeMax: string | null
  description: string | null
  active: boolean
}

function getPin() {
  if (typeof window !== 'undefined') return sessionStorage.getItem('admin-pin') ?? ''
  return ''
}

const inputCls = 'w-full bg-white border border-earth-200 rounded-xl px-3 py-2 text-sm text-earth-900 focus:outline-none focus:border-brand-400 transition'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  )
}

export default function AdminDestinationsPage() {
  const [dests, setDests]       = useState<Destination[]>([])
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [drafts, setDrafts]     = useState<Record<string, Partial<Destination>>>({})
  const [saving, setSaving]     = useState<string | null>(null)
  const [msg, setMsg]           = useState<Record<string, string>>({})
  const [dbError, setDbError]   = useState(false)

  const fetchDests = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/destinations', { headers: { 'x-admin-pin': getPin() } })
    if (res.ok) { setDests(await res.json()); setDbError(false) }
    else setDbError(true)
    setLoading(false)
  }, [])

  useEffect(() => { fetchDests() }, [fetchDests])

  function draft(id: string, key: keyof Destination, value: string | boolean | null) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [key]: value } }))
  }

  function val<K extends keyof Destination>(dest: Destination, id: string, key: K): Destination[K] {
    return (drafts[id]?.[key] ?? dest[key]) as Destination[K]
  }

  async function save(dest: Destination) {
    setSaving(dest.id)
    const body = { ...dest, ...drafts[dest.id] }
    const res = await fetch(`/api/admin/destinations/${dest.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': getPin() },
      body:    JSON.stringify(body),
    })
    setSaving(null)
    if (res.ok) {
      setMsg((m) => ({ ...m, [dest.id]: 'Saved!' }))
      setDrafts((d) => { const n = { ...d }; delete n[dest.id]; return n })
      fetchDests()
      setTimeout(() => setMsg((m) => { const n = { ...m }; delete n[dest.id]; return n }), 3000)
    } else {
      setMsg((m) => ({ ...m, [dest.id]: 'Save failed' }))
    }
  }

  if (dbError) return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-earth-900 mb-4">Destinations</h1>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
        Database not connected. Seed from the Dashboard first.
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-earth-900 mb-6">Destinations</h1>

      {loading ? (
        <div className="flex items-center gap-2 text-earth-400"><Loader2 size={18} className="animate-spin" /> Loading…</div>
      ) : dests.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
          No destinations. Seed from Dashboard first.
        </div>
      ) : (
        <div className="space-y-3">
          {dests.map((dest) => {
            const isOpen = expanded === dest.id
            const isDirty = !!drafts[dest.id] && Object.keys(drafts[dest.id]).length > 0
            const active = val(dest, dest.id, 'active')
            return (
              <div key={dest.id} className="bg-white border border-earth-100 rounded-2xl shadow-sm overflow-hidden">
                <button className="w-full flex items-center gap-3 px-5 py-4 text-left" onClick={() => setExpanded(isOpen ? null : dest.id)}>
                  <div className="flex-1">
                    <p className="font-bold text-earth-900">{dest.name}</p>
                    <p className="text-xs text-earth-400">{dest.region}</p>
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
                        <input className={inputCls} value={(val(dest, dest.id, 'name') ?? '') as string} onChange={(e) => draft(dest.id, 'name', e.target.value)} />
                      </Field>
                      <Field label="Region">
                        <input className={inputCls} value={(val(dest, dest.id, 'region') ?? '') as string} onChange={(e) => draft(dest.id, 'region', e.target.value)} />
                      </Field>
                      <Field label="Camp Fee Min ($/night)">
                        <input type="number" className={inputCls} value={(val(dest, dest.id, 'campFeeMin') ?? '') as string} onChange={(e) => draft(dest.id, 'campFeeMin', e.target.value || null)} />
                      </Field>
                      <Field label="Camp Fee Max ($/night)">
                        <input type="number" className={inputCls} value={(val(dest, dest.id, 'campFeeMax') ?? '') as string} onChange={(e) => draft(dest.id, 'campFeeMax', e.target.value || null)} />
                      </Field>
                    </div>
                    <Field label="Camp Fee Note (shown to guests)">
                      <input className={inputCls} value={(val(dest, dest.id, 'campFeeNote') ?? '') as string} onChange={(e) => draft(dest.id, 'campFeeNote', e.target.value)} />
                    </Field>
                    <Field label="Description">
                      <textarea rows={4} className={`${inputCls} resize-none`} value={(val(dest, dest.id, 'description') ?? '') as string} onChange={(e) => draft(dest.id, 'description', e.target.value)} />
                    </Field>

                    <div className="flex items-center justify-between pt-2 border-t border-earth-100">
                      <div>
                        <p className="text-sm font-semibold text-earth-800">Active</p>
                        <p className="text-xs text-earth-400">Inactive destinations hidden from public pages</p>
                      </div>
                      <button onClick={() => draft(dest.id, 'active', !active)} className={`transition-colors ${active ? 'text-green-600' : 'text-earth-400'}`}>
                        {active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => save(dest)}
                        disabled={saving === dest.id || !isDirty}
                        className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                      >
                        {saving === dest.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Save Changes
                      </button>
                      {msg[dest.id] && <p className={`text-sm font-medium ${msg[dest.id] === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg[dest.id]}</p>}
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
