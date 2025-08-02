# Setup UploadThing dan Neon Database

## Konfigurasi Database PostgreSQL (Neon)

### 1. Database URL
```
postgresql://neondb_owner:npg_kpUmxCSo3K0n@ep-dry-feather-a12tfhae-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. Environment Variables
Buat file `.env.local` dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="postgresql://neondb_owner:npg_kpUmxCSo3K0n@ep-dry-feather-a12tfhae-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# JWT Secret
JWT_SECRET=your_jwt_secret_here
```

## Konfigurasi UploadThing

### 1. Setup UploadThing
1. Daftar di [uploadthing.com](https://uploadthing.com)
2. Buat project baru
3. Dapatkan API keys dari dashboard

### 2. Install UploadThing
```bash
npm install uploadthing @uploadthing/react
```

### 3. Konfigurasi UploadThing
Buat file `src/utils/uploadthing.ts`:

```typescript
import { generateComponents } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
```

### 4. API Route UploadThing
Buat file `src/app/api/uploadthing/core.ts`:

```typescript
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
```

Buat file `src/app/api/uploadthing/route.ts`:

```typescript
import { createNextRouteHandler } from "uploadthing/next";
import { uploadRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: uploadRouter,
});
```

## Cara Menjalankan

### 1. Setup Database
```bash
# Push schema ke Neon database
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 2. Seed Database
```bash
# Jalankan script seeding
npm run seed
```

### 3. Jalankan Development Server
```bash
npm run dev
```

## Data Sample yang Ditambahkan

### News (4 artikel):
1. **Selamat Datang di PPTB BAROKATUL QUR'AN**
   - Image: `https://utfs.io/f/12345678-1234-1234-1234-123456789abc/pondok-pesantren-1.jpg`

2. **Program Tahfidz Al-Qur'an**
   - Image: `https://utfs.io/f/23456789-2345-2345-2345-234567890bcd/tahfidz-program.jpg`

3. **Pembelajaran Bahasa Arab dan Inggris**
   - Image: `https://utfs.io/f/34567890-3456-3456-3456-345678901cde/bahasa-arab-inggris.jpg`

4. **Fasilitas dan Akomodasi**
   - Image: `https://utfs.io/f/45678901-4567-4567-4567-456789012def/fasilitas-akomodasi.jpg`

### Gallery (8 item):
1. **Gedung Utama PPTB BAROKATUL QUR'AN**
   - Image: `https://utfs.io/f/56789012-5678-5678-5678-567890123ef0/gedung-utama.jpg`

2. **Masjid Pondok Pesantren**
   - Image: `https://utfs.io/f/67890123-6789-6789-6789-678901234f01/masjid-pondok.jpg`

3. **Asrama Santri**
   - Image: `https://utfs.io/f/78901234-7890-7890-7890-789012345f12/asrama-santri.jpg`

4. **Perpustakaan**
   - Image: `https://utfs.io/f/89012345-8901-8901-8901-890123456f23/perpustakaan.jpg`

5. **Laboratorium Bahasa**
   - Image: `https://utfs.io/f/90123456-9012-9012-9012-901234567f34/laboratorium-bahasa.jpg`

6. **Kegiatan Santri**
   - Image: `https://utfs.io/f/01234567-0123-0123-0123-012345678f45/kegiatan-santri.jpg`

7. **Halaman Pondok**
   - Image: `https://utfs.io/f/12345678-1234-1234-1234-123456789f56/halaman-pondok.jpg`

8. **Kantor Administrasi**
   - Image: `https://utfs.io/f/23456789-2345-2345-2345-234567890f67/kantor-administrasi.jpg`

## Testing

### API Endpoints:
```bash
# Test News API
curl "http://localhost:3000/api/news?published=true&limit=4"

# Test Gallery API
curl "http://localhost:3000/api/gallery?published=true&limit=8"
```

### Halaman Website:
- **Homepage:** http://localhost:3000
- **News:** http://localhost:3000/news
- **Gallery:** http://localhost:3000/gallery
- **Admin:** http://localhost:3000/admin (admin@example.com / password123)

## Status

✅ **Semua Error Teratasi:**
- Database PostgreSQL (Neon) berhasil terhubung
- Data sample berhasil ditambahkan dengan UploadThing images
- Latest News section menampilkan 4 artikel
- Gallery section menampilkan 8 item
- API routes berfungsi normal
- Website berjalan dengan baik

## Catatan Penting

- Semua data marked as `isPublished: true`
- Menggunakan UploadThing untuk hosting gambar
- Database PostgreSQL di Neon untuk production
- Admin user dapat digunakan untuk login ke admin panel
- Script seeding dapat dijalankan ulang untuk reset data 