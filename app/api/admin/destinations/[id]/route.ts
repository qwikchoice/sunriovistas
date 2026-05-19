import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-pin') === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, region, campFeeNote, campFeeMin, campFeeMax, description, active } = await req.json()
  const dest = await db.destination.update({
    where: { id: params.id },
    data:  {
      name,
      region,
      campFeeNote,
      campFeeMin: campFeeMin != null && campFeeMin !== '' ? Number(campFeeMin) : null,
      campFeeMax: campFeeMax != null && campFeeMax !== '' ? Number(campFeeMax) : null,
      description,
      active,
    },
  })
  return NextResponse.json(dest)
}
