# CRUD News dan Gallery untuk Admin

## Overview
Fitur CRUD (Create, Read, Update, Delete) untuk News dan Gallery telah ditambahkan ke admin panel. Admin dapat mengelola konten berita dan galeri dengan antarmuka yang user-friendly.

## Fitur yang Ditambahkan

### 1. Database Models

#### News Model
```prisma
model News {
  id          String   @id @default(cuid())
  title       String
  content     String
  imageUrl    String?
  authorId    String
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@map("news")
}
```

#### Gallery Model
```prisma
model Gallery {
  id          String   @id @default(cuid())
  title       String
  description String?
  imageUrl    String
  category    String?
  authorId    String
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@map("gallery")
}
```

### 2. API Routes

#### News API
- `GET /api/news` - Mendapatkan semua berita (public)
- `POST /api/news` - Membuat berita baru (Admin only)
- `GET /api/news/[id]` - Mendapatkan berita tertentu
- `PUT /api/news/[id]` - Update berita (Admin only)
- `DELETE /api/news/[id]` - Hapus berita (Admin only)

#### Gallery API
- `GET /api/gallery` - Mendapatkan semua item galeri (public)
- `POST /api/gallery` - Membuat item galeri baru (Admin only)
- `GET /api/gallery/[id]` - Mendapatkan item galeri tertentu
- `PUT /api/gallery/[id]` - Update item galeri (Admin only)
- `DELETE /api/gallery/[id]` - Hapus item galeri (Admin only)

### 3. Komponen UI

#### NewsManagement Component
- **Fitur:**
  - Daftar semua berita dengan informasi lengkap
  - Form modal untuk create/edit berita
  - Toggle publish/unpublish
  - Delete dengan konfirmasi
  - Loading states dan error handling
  - Responsive design

- **Fields:**
  - Title (required)
  - Content (required)
  - Image URL (optional)
  - Publish immediately checkbox

#### GalleryManagement Component
- **Fitur:**
  - Grid layout untuk item galeri
  - Filter berdasarkan kategori
  - Form modal untuk create/edit item
  - Preview gambar
  - Toggle publish/unpublish
  - Delete dengan konfirmasi
  - Loading states dan error handling

- **Fields:**
  - Title (required)
  - Description (optional)
  - Image URL (required)
  - Category (optional)
  - Publish immediately checkbox

### 4. Admin Panel Integration

#### Tab Navigation
Admin panel sekarang memiliki 3 tab:
1. **Users** - Manajemen user (existing)
2. **News** - Manajemen berita (new)
3. **Gallery** - Manajemen galeri (new)

#### Tab Features
- **Active tab highlighting**
- **Dynamic content rendering**
- **Consistent styling**
- **Responsive navigation**

## Implementasi Teknis

### Authentication & Authorization
- Semua API routes menggunakan JWT authentication
- Admin-only access untuk create, update, delete operations
- Public access untuk read operations
- Consistent error handling

### Database Relations
- News dan Gallery terkait dengan User (author)
- Cascade delete untuk maintain data integrity
- Proper indexing untuk performance

### UI/UX Features
- **Modal forms** untuk create/edit
- **Confirmation dialogs** untuk delete
- **Loading states** dengan spinners
- **Error handling** dengan user-friendly messages
- **Responsive design** untuk mobile dan desktop
- **Real-time updates** setelah operations

### Security Features
- **Input validation** di client dan server
- **XSS protection** dengan proper escaping
- **CSRF protection** dengan JWT tokens
- **Role-based access control**

## Cara Penggunaan

### Untuk Admin

1. **Login ke admin panel**
2. **Pilih tab "News" atau "Gallery"**
3. **Create new item:**
   - Klik "Add News" atau "Add Item"
   - Isi form yang muncul
   - Klik "Create"
4. **Edit existing item:**
   - Klik icon edit pada item
   - Modify data di form
   - Klik "Update"
5. **Delete item:**
   - Klik icon delete
   - Konfirmasi deletion
6. **Toggle publish status:**
   - Klik icon eye untuk toggle publish/unpublish

### API Usage

#### Create News
```javascript
const response = await fetch('/api/news', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'News Title',
    content: 'News content...',
    imageUrl: 'https://example.com/image.jpg',
    isPublished: true
  })
})
```

#### Create Gallery Item
```javascript
const response = await fetch('/api/gallery', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Gallery Title',
    description: 'Description...',
    imageUrl: 'https://example.com/image.jpg',
    category: 'Events',
    isPublished: true
  })
})
```

## Benefits

1. **Complete CRUD Operations** - Full create, read, update, delete functionality
2. **User-Friendly Interface** - Intuitive UI dengan modal forms dan confirmations
3. **Role-Based Access** - Hanya admin yang bisa modify data
4. **Real-Time Updates** - UI updates immediately setelah operations
5. **Error Handling** - Comprehensive error handling dan user feedback
6. **Responsive Design** - Works well di semua device sizes
7. **Security** - Proper authentication dan authorization
8. **Performance** - Optimized database queries dan UI rendering

## Future Enhancements

1. **Image Upload** - Direct file upload instead of URL
2. **Rich Text Editor** - WYSIWYG editor untuk content
3. **Bulk Operations** - Select multiple items untuk bulk actions
4. **Search & Filter** - Advanced search dan filtering
5. **Pagination** - Handle large datasets
6. **Audit Trail** - Track changes dan modifications
7. **SEO Features** - Meta tags dan SEO optimization
8. **Scheduling** - Schedule posts untuk future publication

## Testing

Untuk test fitur ini:

1. **Login sebagai admin**
2. **Navigate ke admin panel**
3. **Test semua CRUD operations di News tab**
4. **Test semua CRUD operations di Gallery tab**
5. **Verify data persistence di database**
6. **Test error scenarios** (invalid data, network errors)
7. **Test responsive design** di berbagai screen sizes

## Migration

Database migration telah dijalankan:
```bash
npx prisma migrate dev --name add-news-gallery
```

Migration ini menambahkan tabel `news` dan `gallery` ke database dengan proper relations ke tabel `users`. 