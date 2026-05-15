import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import type { Photo, PhotosData } from '@/lib/data/photos'

const DATA_FILE = path.join(process.cwd(), 'data', 'photos.json')

function readData(): PhotosData {
  if (!fs.existsSync(DATA_FILE)) return { photos: [] }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as PhotosData
}

function writeData(data: PhotosData) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

// GET /api/admin/photos?category=rv&entitySlug=lunaris
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const entitySlug = searchParams.get('entitySlug')

  const data = readData()
  let photos = data.photos

  if (category && category !== 'all') {
    photos = photos.filter((p) => p.category === category)
  }
  if (entitySlug) {
    photos = photos.filter((p) => p.entitySlug === entitySlug)
  }

  return NextResponse.json({ photos })
}

// POST /api/admin/photos  (multipart/form-data)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const category = (formData.get('category') as string) || 'rv'
    const entitySlug = (formData.get('entitySlug') as string) || 'general'
    const caption = (formData.get('caption') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, WebP, or GIF.' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10 MB.' }, { status: 400 })
    }

    // Write file to public/uploads/{category}/
    const ext = path.extname(file.name) || '.jpg'
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const fileName = `${id}${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category)

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    fs.writeFileSync(path.join(uploadDir, fileName), Buffer.from(bytes))

    // Update photos.json
    const data = readData()

    const photo: Photo = {
      id,
      category: category as Photo['category'],
      entitySlug,
      fileName,
      originalName: file.name,
      url: `/uploads/${category}/${fileName}`,
      caption,
      isPrimary: false,
      uploadedAt: new Date().toISOString(),
    }

    data.photos.push(photo)
    writeData(data)

    return NextResponse.json({ photo }, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

// PATCH /api/admin/photos  { id, isPrimary?, caption? }
export async function PATCH(request: NextRequest) {
  const { id, isPrimary, caption } = await request.json()
  const data = readData()
  const photo = data.photos.find((p) => p.id === id)
  if (!photo) return NextResponse.json({ error: 'Photo not found' }, { status: 404 })

  if (typeof isPrimary === 'boolean') {
    // If setting primary, unset others in same entity+category
    if (isPrimary) {
      data.photos.forEach((p) => {
        if (p.category === photo.category && p.entitySlug === photo.entitySlug) {
          p.isPrimary = false
        }
      })
    }
    photo.isPrimary = isPrimary
  }
  if (typeof caption === 'string') photo.caption = caption

  writeData(data)
  return NextResponse.json({ photo })
}
