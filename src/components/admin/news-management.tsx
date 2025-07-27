'use client'

import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, User } from 'lucide-react'
import { ImageUpload } from '../ui/image-upload'

interface News {
  id: string
  title: string
  content: string
  imageUrl?: string
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  author: {
    id: string
    name: string
    email: string
  }
}

interface NewsFormProps {
  news?: News
  onSave: (data: Partial<News>) => void
  onCancel: () => void
  loading: boolean
}

function NewsForm({ news, onSave, onCancel, loading }: NewsFormProps) {
  const [title, setTitle] = useState(news?.title || '')
  const [content, setContent] = useState(news?.content || '')
  const [imageUrl, setImageUrl] = useState(news?.imageUrl || '')
  const [isPublished, setIsPublished] = useState(news?.isPublished || false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      content,
      imageUrl,
      isPublished,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{news ? 'Edit News' : 'Create New News'}</CardTitle>
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
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded-md h-32"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image (optional)</label>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                endpoint="newsImageUploader"
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
                {loading ? 'Saving...' : (news ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/news')
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      const data = await response.json()
      setNews(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleCreateNews = async (data: Partial<News>) => {
    try {
      setFormLoading(true)
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create news')
      }
      setShowForm(false)
      fetchNews()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create news')
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateNews = async (data: Partial<News>) => {
    if (!editingNews) return
    try {
      setFormLoading(true)
      const response = await fetch(`/api/news/${editingNews.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to update news')
      }
      setShowForm(false)
      setEditingNews(null)
      fetchNews()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update news')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news?')) return
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete news')
      }
      fetchNews()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete news')
    }
  }

  const handleTogglePublish = async (newsItem: News) => {
    try {
      const response = await fetch(`/api/news/${newsItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newsItem,
          isPublished: !newsItem.isPublished,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update news')
      }
      fetchNews()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update news')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <Button onClick={fetchNews}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">News Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add News
        </Button>
      </div>

      <div className="grid gap-4">
        {news.map((newsItem) => (
          <Card key={newsItem.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{newsItem.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {newsItem.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {newsItem.author.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(newsItem.createdAt).toLocaleDateString()}
                    </div>
                    <Badge variant={newsItem.isPublished ? 'default' : 'secondary'}>
                      {newsItem.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(newsItem)}
                  >
                    {newsItem.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingNews(newsItem)
                      setShowForm(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteNews(newsItem.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <NewsForm
          news={editingNews || undefined}
          onSave={editingNews ? handleUpdateNews : handleCreateNews}
          onCancel={() => {
            setShowForm(false)
            setEditingNews(null)
          }}
          loading={formLoading}
        />
      )}
    </div>
  )
} 