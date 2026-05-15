import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import type { PhotosData } from '@/lib/data/photos'

const DATA_FILE = path.join(process.cwd(), 'data', 'photos.json')

function readData(): PhotosData {
  if (!fs.existsSync(DATA_FILE)) return { photos: [] }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as PhotosData
}

function writeData(data: PhotosData) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = readData()
  const idx = data.photos.findIndex((p) => p.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'Photo not found' }, { status: 404 })

  const [photo] = data.photos.splice(idx, 1)

  // Delete physical file
  const filePath = path.join(process.cwd(), 'public', 'uploads', photo.category, photo.fileName)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  writeData(data)
  return NextResponse.json({ ok: true })
}
