export type PhotoCategory = 'rv' | 'destination' | 'customer'

export type Photo = {
  id: string
  category: PhotoCategory
  entitySlug: string   // rv slug, destination slug, or 'general' for customers
  fileName: string
  originalName: string
  url: string          // /uploads/{category}/{fileName}
  caption: string
  isPrimary: boolean
  uploadedAt: string
}

export type PhotosData = {
  photos: Photo[]
}
