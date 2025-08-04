'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Loader2, Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from "lucide-react"
import NextImage from "next/image"

interface GalleryItem {
  id: string
  title: string
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

export function GalleryManagement() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    isPublished: false
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const fetchGallery = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/gallery')
      if (!response.ok) {
        throw new Error('Gagal mengambil data galeri')
      }
      const result = await response.json()
      const galleryData = result.data || result
      setGallery(Array.isArray(galleryData) ? galleryData : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengambil data galeri')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setFormData({ ...formData, imageUrl: "" })
  }

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Set maximum dimensions
        const maxWidth = 800
        const maxHeight = 600
        
        let { width, height } = img
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }
        
        // Set canvas dimensions
        canvas.width = width
        canvas.height = height
        
        // Draw and compress image
        ctx?.drawImage(img, 0, 0, width, height)
        
        // Convert to base64 with compression
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7)
        resolve(compressedDataUrl)
      }
      
      img.onerror = () => {
        reject(new Error('Gagal memuat gambar'))
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      let imageUrl = formData.imageUrl
      
      // Upload gambar jika ada file yang dipilih
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile)
      }
      
      const url = editingItem ? `/api/gallery/${editingItem.id}` : '/api/gallery'
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl
        }),
      })

      if (!response.ok) {
        throw new Error('Gagal menyimpan item galeri')
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      setFormData({ title: "", imageUrl: "", isPublished: false })
      setSelectedFile(null)
      setPreviewUrl(null)
      fetchGallery()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan item galeri')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return
    
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Gagal menghapus item galeri')
      }

      fetchGallery()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus item galeri')
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      imageUrl: item.imageUrl,
      isPublished: item.isPublished
    })
    setIsDialogOpen(true)
  }

  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublished: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error('Gagal mengubah status publikasi')
      }

      fetchGallery()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengubah status publikasi')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Button onClick={fetchGallery}>Coba Lagi</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Galeri</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null)
              setFormData({ title: "", imageUrl: "", isPublished: false })
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Item Galeri' : 'Tambah Item Galeri Baru'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Item *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul item galeri"
                  required
                />
              </div>
              

              
              <div>
                <Label>Gambar Item *</Label>
                <div className="space-y-2">
                  {previewUrl ? (
                    <div className="relative">
                                             <NextImage
                         src={previewUrl}
                         alt="Preview"
                         width={300}
                         height={200}
                         className="w-full h-48 object-cover rounded-md"
                       />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <Label htmlFor="image-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                        Klik untuk upload gambar
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                />
                <Label htmlFor="isPublished">Publikasikan</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    editingItem ? 'Simpan Perubahan' : 'Tambah Item'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              {item.imageUrl ? (
                                 <NextImage
                   src={item.imageUrl}
                   alt={item.title}
                   width={400}
                   height={250}
                   className="w-full h-48 object-cover"
                 />
              ) : (
                <div className="w-full h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Tidak Ada Gambar</span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant={item.isPublished ? "default" : "secondary"}>
                  {item.isPublished ? "Dipublikasikan" : "Draft"}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {item.publishedAt 
                    ? new Date(item.publishedAt).toLocaleDateString()
                    : new Date(item.createdAt).toLocaleDateString()
                  }
                </span>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Oleh: {item.author.name}
                </span>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePublishToggle(item.id, item.isPublished)}
                  >
                    {item.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 