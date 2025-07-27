'use client'

import { useState } from 'react'
import { UploadDropzone, getAuthToken } from '@/utils/uploadthing'
import { Button } from './button'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  endpoint: 'newsImageUploader' | 'galleryImageUploader'
  className?: string
}

export function ImageUpload({ value, onChange, endpoint, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadComplete = (res: { url: string }[]) => {
    if (res && res.length > 0) {
      onChange(res[0].url)
    }
    setIsUploading(false)
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error)
    setIsUploading(false)
  }

  const handleUploadBegin = () => {
    setIsUploading(true)
  }

  const removeImage = () => {
    onChange('')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {value ? (
        <div className="relative">
          <div className="relative h-48 w-full rounded-lg overflow-hidden border">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            onUploadBegin={handleUploadBegin}
            config={{ 
              mode: "auto",
              appendOnPaste: true,
            }}
            className="ut-uploading:opacity-50"
          />
          {isUploading && (
            <div className="flex items-center justify-center mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-600">Uploading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 