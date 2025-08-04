'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface DebugData {
  summary: {
    news: {
      total: number
      published: number
      unpublished: number
    }
    gallery: {
      total: number
      published: number
      unpublished: number
    }
  }
  news: Array<{
    id: string
    title: string
    isPublished: boolean
    createdAt: string
    author?: {
      name: string
    }
  }>
  gallery: Array<{
    id: string
    title: string
    isPublished: boolean
    createdAt: string
    author?: {
      name: string
    }
  }>
}

export default function DebugPage() {
  const [data, setData] = useState<DebugData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDebugData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/debug')
        if (!response.ok) {
          throw new Error('Gagal mengambil data debug')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil data debug')
      } finally {
        setLoading(false)
      }
    }

    fetchDebugData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada data debug</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Debug Database</h1>
      
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Berita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total:</span>
                <Badge variant="outline">{data.summary.news.total}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Dipublikasikan:</span>
                <Badge variant="default">{data.summary.news.published}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Belum Dipublikasikan:</span>
                <Badge variant="secondary">{data.summary.news.unpublished}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Galeri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total:</span>
                <Badge variant="outline">{data.summary.gallery.total}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Dipublikasikan:</span>
                <Badge variant="default">{data.summary.gallery.published}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Belum Dipublikasikan:</span>
                <Badge variant="secondary">{data.summary.gallery.unpublished}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* News Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Detail Berita</CardTitle>
        </CardHeader>
        <CardContent>
          {data.news.length === 0 ? (
            <p className="text-muted-foreground">Tidak ada berita</p>
          ) : (
            <div className="space-y-4">
              {data.news.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant={item.isPublished ? "default" : "secondary"}>
                      {item.isPublished ? "Dipublikasikan" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                  <p className="text-sm text-muted-foreground">Author: {item.author?.name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">Created: {new Date(item.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gallery Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detail Galeri</CardTitle>
        </CardHeader>
        <CardContent>
          {data.gallery.length === 0 ? (
            <p className="text-muted-foreground">Tidak ada galeri</p>
          ) : (
            <div className="space-y-4">
              {data.gallery.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant={item.isPublished ? "default" : "secondary"}>
                      {item.isPublished ? "Dipublikasikan" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                  <p className="text-sm text-muted-foreground">Author: {item.author?.name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">Created: {new Date(item.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 