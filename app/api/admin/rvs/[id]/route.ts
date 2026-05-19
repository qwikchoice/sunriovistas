import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-pin') === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, emoji, tagline, description, sleeps, active } = await req.json()
  const rv = await db.rV.update({
    where: { id: params.id },
    data:  { name, emoji, tagline, description, sleeps: Number(sleeps), active },
  })
  return NextResponse.json(rv)
}
