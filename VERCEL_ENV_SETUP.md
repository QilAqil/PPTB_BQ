# Vercel Environment Variables Setup

Untuk menjalankan aplikasi ini di Vercel, Anda perlu mengatur environment variables berikut di dashboard Vercel:

## Environment Variables yang Diperlukan

### 1. Database
```
DATABASE_URL=postgresql://username:password@host:port/database_name
```

**Contoh untuk PostgreSQL:**
- **Supabase**: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`
- **Neon**: `postgresql://[user]:[password]@[host]/[database]?sslmode=require`
- **Railway**: `postgresql://postgres:[password]@[host]:[port]/[database]`

### 2. JWT Secret
```
JWT_SECRET=your-super-secret-jwt-key-here
```

### 3. Next.js (Opsional)
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Cara Mengatur di Vercel

1. Buka dashboard Vercel
2. Pilih project Anda
3. Klik tab "Settings"
4. Pilih "Environment Variables"
5. Tambahkan setiap variable di atas

## Database Setup

### 1. Buat Database PostgreSQL
- Gunakan Supabase, Neon, Railway, atau provider PostgreSQL lainnya
- Catat connection string

### 2. Jalankan Migration
Setelah mengatur `DATABASE_URL`, jalankan:
```bash
npx prisma db push
```

### 3. Seed Data (Opsional)
Jika ada seed data:
```bash
npx prisma db seed
```

## Troubleshooting

### Error: "Failed to fetch news/gallery"
- Periksa `DATABASE_URL` sudah benar
- Pastikan database bisa diakses dari Vercel
- Periksa logs di Vercel dashboard

### Error: "Database connection failed"
- Periksa firewall settings
- Pastikan database mengizinkan koneksi dari Vercel IP
- Untuk Supabase/Neon, pastikan SSL mode diatur dengan benar

### Error: "JWT verification failed"
- Periksa `JWT_SECRET` sudah diset
- Pastikan secret key cukup kuat (minimal 32 karakter)

## Testing

Setelah setup selesai, test endpoint berikut:
- `https://your-domain.vercel.app/api/news?published=true`
- `https://your-domain.vercel.app/api/gallery?published=true`

Kedua endpoint seharusnya mengembalikan JSON response. 