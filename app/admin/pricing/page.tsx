'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface PriceRule {
  id: string
  label: string | null
  startDate: string
  endDate: string
  nightlyRate?: string
  price?: string
  minNights?: number
  active: boolean
}

interface RVWithRules {
  id: string
  slug: string
  name: string
  emoji: string
  priceRules: PriceRule[]
}

interface AddOnWithRules {
  id: string
  slug: string
  label: string
  priceRules: PriceRule[]
}

function getPin() {
  if (typeof window !== 'undefined') return sessionStorage.getItem('admin-pin') ?? ''
  return ''
}

const inputCls = 'bg-white border border-earth-200 rounded-lg px-3 py-1.5 text-sm text-earth-900 focus:outline-none focus:border-brand-400 transition w-full'
const fmtDate = (d: string) => d?.slice(0, 10) ?? ''

function RuleRow({
  rule,
  onSave,
  onDelete,
  rateKey,
}: {
  rule: PriceRule
  onSave: (r: Partial<PriceRule>) => Promise<void>
  onDelete: () => Promise<void>
  rateKey: 'nightlyRate' | 'price'
}) {
  const [draft, setDraft] = useState({ ...rule })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const isDirty = JSON.stringify(draft) !== JSON.stringify(rule)

  async function save() {
    setSaving(true)
    await onSave(draft)
    setSaving(false)
  }
  async function del() {
    setDeleting(true)
    await onDelete()
    setDeleting(false)
  }

  return (
    <div className="grid grid-cols-12 gap-2 items-center p-3 bg-earth-50 rounded-xl">
      <div className="col-span-3">
        <input className={inputCls} placeholder="Label" value={draft.label ?? ''} onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))} />
      </div>
      <div className="col-span-2">
        <input type="date" className={inputCls} value={fmtDate(draft.startDate)} onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))} />
      </div>
      <div className="col-span-2">
        <input type="date" className={inputCls} value={fmtDate(draft.endDate)} onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))} />
      </div>
      <div className="col-span-2">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-earth-400 text-sm">$</span>
          <input
            type="number"
            className={`${inputCls} pl-6`}
            value={draft[rateKey] ?? ''}
            onChange={(e) => setDraft((d) => ({ ...d, [rateKey]: e.target.value }))}
          />
        </div>
      </div>
      {rateKey === 'nightlyRate' && (
        <div className="col-span-1">
          <input type="number" min={1} className={inputCls} title="Min nights" value={draft.minNights ?? 2} onChange={(e) => setDraft((d) => ({ ...d, minNights: Number(e.target.value) }))} />
        </div>
      )}
      <div className={`${rateKey === 'nightlyRate' ? 'col-span-2' : 'col-span-3'} flex gap-1.5 justify-end`}>
        <button
          onClick={save}
          disabled={saving || !isDirty}
          className="flex items-center gap-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
        >
          {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
          Save
        </button>
        <button
          onClick={del}
          disabled={deleting}
          className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-2 py-1.5 rounded-lg transition-all"
        >
          {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </button>
      </div>
    </div>
  )
}

export default function AdminPricingPage() {
  const [rvs, setRVs]         = useState<RVWithRules[]>([])
  const [addons, setAddons]   = useState<AddOnWithRules[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExp]    = useState<string | null>(null)
  const [dbError, setDbError] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const [r1, r2] = await Promise.all([
      fetch('/api/admin/rvs?include=priceRules', { headers: { 'x-admin-pin': getPin() } }),
      fetch('/api/admin/addons', { headers: { 'x-admin-pin': getPin() } }),
    ])
    if (r1.ok && r2.ok) {
      setRVs(await r1.json())
      setAddons(await r2.json())
      setDbError(false)
    } else {
      setDbError(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  async function saveRVRule(rvId: string, ruleId: string, data: Partial<PriceRule>) {
    await fetch(`/api/admin/rvs/${rvId}/price-rules/${ruleId}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': getPin() },
      body:    JSON.stringify(data),
    })
    fetchData()
  }

  async function deleteRVRule(rvId: string, ruleId: string) {
    await fetch(`/api/admin/rvs/${rvId}/price-rules/${ruleId}`, {
      method: 'DELETE', headers: { 'x-admin-pin': getPin() },
    })
    fetchData()
  }

  async function addRVRule(rvId: string) {
    await fetch(`/api/admin/rvs/${rvId}/price-rules`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': getPin() },
      body:    JSON.stringify({
        label: 'New Rate', startDate: new Date().toISOString(), endDate: new Date('2027-12-31').toISOString(),
        nightlyRate: 149, minNights: 2, active: true,
      }),
    })
    fetchData()
  }

  async function saveAddonRule(addOnId: string, ruleId: string, data: Partial<PriceRule>) {
    await fetch(`/api/admin/addons/${addOnId}/price-rules/${ruleId}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': getPin() },
      body:    JSON.stringify(data),
    })
    fetchData()
  }

  async function deleteAddonRule(addOnId: string, ruleId: string) {
    await fetch(`/api/admin/addons/${addOnId}/price-rules/${ruleId}`, {
      method: 'DELETE', headers: { 'x-admin-pin': getPin() },
    })
    fetchData()
  }

  async function addAddonRule(addOnId: string) {
    await fetch(`/api/admin/addons/${addOnId}/price-rules`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': getPin() },
      body:    JSON.stringify({
        label: 'New Rate', startDate: new Date().toISOString(), endDate: new Date('2027-12-31').toISOString(),
        price: 49, active: true,
      }),
    })
    fetchData()
  }

  if (dbError) return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-earth-900 mb-4">Pricing</h1>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
        Database not connected. Seed from Dashboard first.
      </div>
    </div>
  )

  const colHeaders = (rateKey: 'nightlyRate' | 'price') => (
    <div className="grid grid-cols-12 gap-2 px-3 mb-1">
      <p className="col-span-3 text-xs font-bold text-earth-400 uppercase">Label</p>
      <p className="col-span-2 text-xs font-bold text-earth-400 uppercase">Start</p>
      <p className="col-span-2 text-xs font-bold text-earth-400 uppercase">End</p>
      <p className="col-span-2 text-xs font-bold text-earth-400 uppercase">{rateKey === 'nightlyRate' ? '$/night' : '$ flat'}</p>
      {rateKey === 'nightlyRate' && <p className="col-span-1 text-xs font-bold text-earth-400 uppercase">Min n.</p>}
    </div>
  )

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-earth-900 mb-6">Pricing Rules</h1>
      <p className="text-sm text-earth-500 mb-8">Rules are date-range based. Higher priority = more recent startDate wins. 2-night minimum enforced on all RV bookings.</p>

      {loading ? (
        <div className="flex items-center gap-2 text-earth-400"><Loader2 size={18} className="animate-spin" /> Loading…</div>
      ) : (
        <>
          {/* RV pricing */}
          <section className="mb-10">
            <h2 className="text-sm font-bold text-earth-400 uppercase tracking-wider mb-4">RV Nightly Rates</h2>
            <div className="space-y-3">
              {rvs.map((rv) => {
                const isOpen = expanded === rv.id
                return (
                  <div key={rv.id} className="bg-white border border-earth-100 rounded-2xl shadow-sm overflow-hidden">
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-left" onClick={() => setExp(isOpen ? null : rv.id)}>
                      <span className="text-xl">{rv.emoji}</span>
                      <span className="font-bold text-earth-900 flex-1">{rv.name}</span>
                      <span className="text-xs text-earth-400">{rv.priceRules?.length ?? 0} rules</span>
                      {isOpen ? <ChevronUp size={16} className="text-earth-400" /> : <ChevronDown size={16} className="text-earth-400" />}
                    </button>
                    {isOpen && (
                      <div className="border-t border-earth-100 px-5 py-4 space-y-2">
                        {colHeaders('nightlyRate')}
                        {(rv.priceRules ?? []).map((rule) => (
                          <RuleRow
                            key={rule.id}
                            rule={rule}
                            rateKey="nightlyRate"
                            onSave={(data) => saveRVRule(rv.id, rule.id, data)}
                            onDelete={() => deleteRVRule(rv.id, rule.id)}
                          />
                        ))}
                        <button
                          onClick={() => addRVRule(rv.id)}
                          className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium mt-2"
                        >
                          <Plus size={14} /> Add Rate Rule
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Add-on pricing */}
          <section>
            <h2 className="text-sm font-bold text-earth-400 uppercase tracking-wider mb-4">Add-On Prices</h2>
            <div className="space-y-3">
              {addons.map((addon) => {
                const key = `addon-${addon.id}`
                const isOpen = expanded === key
                return (
                  <div key={addon.id} className="bg-white border border-earth-100 rounded-2xl shadow-sm overflow-hidden">
                    <button className="w-full flex items-center gap-3 px-5 py-3.5 text-left" onClick={() => setExp(isOpen ? null : key)}>
                      <span className="font-semibold text-earth-900 flex-1 text-sm">{addon.label}</span>
                      <span className="text-xs text-earth-400">{addon.priceRules?.length ?? 0} rules</span>
                      {isOpen ? <ChevronUp size={16} className="text-earth-400" /> : <ChevronDown size={16} className="text-earth-400" />}
                    </button>
                    {isOpen && (
                      <div className="border-t border-earth-100 px-5 py-4 space-y-2">
                        {colHeaders('price')}
                        {(addon.priceRules ?? []).map((rule) => (
                          <RuleRow
                            key={rule.id}
                            rule={rule}
                            rateKey="price"
                            onSave={(data) => saveAddonRule(addon.id, rule.id, data)}
                            onDelete={() => deleteAddonRule(addon.id, rule.id)}
                          />
                        ))}
                        <button
                          onClick={() => addAddonRule(addon.id)}
                          className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium mt-2"
                        >
                          <Plus size={14} /> Add Price Rule
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
