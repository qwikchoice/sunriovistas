import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function adminAuthed(req: NextRequest) {
  return req.headers.get('x-admin-pin') === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function GET(req: NextRequest) {
  if (!adminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const include = new URL(req.url).searchParams.get('include')
  const rvs = await db.rV.findMany({
    include: { priceRules: include === 'priceRules' },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(rvs)
}
