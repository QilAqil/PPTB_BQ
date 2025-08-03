'use client'

import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, User, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { ImageUpload } from '../ui/image-upload'

interface GalleryItem {
  id: string
  title: string
  description?: string
  imageUrl: string
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  author: {
    id: string
    name: string
    email: string
  }
}

interface GalleryFormProps {
  item?: GalleryItem
  onSave: (data: Partial<GalleryItem>) => void
  onCancel: () => void
  loading: boolean
}

function GalleryForm({ item, onSave, onCancel, loading }: GalleryFormProps) {
  const [title, setTitle] = useState(item?.title || '')
  const [description, setDescription] = useState(item?.description || '')
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || '')
  const [isPublished, setIsPublished] = useState(item?.isPublished || false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description,
      imageUrl,
      isPublished,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{item ? 'Edit Gallery Item' : 'Add Gallery Item'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                endpoint="galleryImageUploader"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="published" className="text-sm">
                Publish immediately
              </label>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Saving...' : (item ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function GalleryManagement() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const fetchGallery = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/gallery')
      if (!response.ok) {
        throw new Error('Failed to fetch gallery')
      }
      const result = await response.json()
      setGallery(result.data || result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const handleCreateItem = async (data: Partial<GalleryItem>) => {
    try {
      setFormLoading(true)
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create gallery item')
      }
      setShowForm(false)
      fetchGallery()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create gallery item')
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateItem = async (data: Partial<GalleryItem>) => {
    if (!editingItem) return
    try {
      setFormLoading(true)
      const response = await fetch(`/api/gallery/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to update gallery item')
      }
      setShowForm(false)
      setEditingItem(null)
      fetchGallery()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update gallery item')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete gallery item')
      }
      fetchGallery()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gallery item')
    }
  }

  const handleTogglePublish = async (item: GalleryItem) => {
    try {
      const response = await fetch(`/api/gallery/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isPublished: !item.isPublished,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update gallery item')
      }
      fetchGallery()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update gallery item')
    }
  }

  const categories = ['all']

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <Button onClick={fetchGallery}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>



      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTogglePublish(item)}
                  className="bg-white/90 hover:bg-white"
                >
                  {item.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingItem(item)
                    setShowForm(true)
                  }}
                  className="bg-white/90 hover:bg-white"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}
                             <div className="flex items-center justify-between text-sm text-gray-500">
                 <div className="flex items-center gap-1">
                   <User className="h-4 w-4" />
                   {item.author.name}
                 </div>
                 <Badge variant={item.isPublished ? 'default' : 'secondary'}>
                   {item.isPublished ? 'Published' : 'Draft'}
                 </Badge>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <GalleryForm
          item={editingItem || undefined}
          onSave={editingItem ? handleUpdateItem : handleCreateItem}
          onCancel={() => {
            setShowForm(false)
            setEditingItem(null)
          }}
          loading={formLoading}
        />
      )}
    </div>
  )
} 