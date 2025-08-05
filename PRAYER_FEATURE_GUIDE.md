# Fitur Do'a-Do'a - PPTB BAROKATUL QUR'AN

## Deskripsi
Fitur do'a-do'a adalah sistem manajemen konten do'a yang terintegrasi dengan role admin untuk mengelola kumpulan do'a harian, do'a shalat, dzikir, dan do'a khusus lainnya. Fitur ini mendukung teks Arab, transliterasi, terjemahan, dan gambar.

## Fitur Utama

### 1. Manajemen Do'a (Admin)
- **Create**: Menambah do'a baru dengan form lengkap
- **Read**: Melihat daftar semua do'a (published dan draft)
- **Update**: Mengedit do'a yang sudah ada
- **Delete**: Menghapus do'a
- **Publish/Unpublish**: Mengatur status publikasi do'a

### 2. Tampilan Publik
- **Daftar Do'a**: Halaman utama dengan grid do'a yang dipublikasikan
- **Detail Do'a**: Halaman detail dengan tampilan lengkap
- **Filter Kategori**: Filter berdasarkan kategori do'a
- **Pencarian**: Pencarian berdasarkan judul, terjemahan, atau kategori
- **Pagination**: Navigasi halaman untuk daftar do'a

### 3. Konten Do'a
- **Judul**: Nama do'a
- **Teks Arab**: Teks do'a dalam bahasa Arab dengan font khusus
- **Transliterasi**: Teks latin untuk memudahkan pembacaan
- **Terjemahan**: Terjemahan dalam bahasa Indonesia
- **Kategori**: Pengelompokan do'a (Shalat, Harian, Khusus, Dzikir, Al-Quran, Lainnya)
- **Gambar**: Foto/gambar pendukung do'a (opsional)
- **Status Publikasi**: Draft atau dipublikasikan

## Struktur Database

### Model Prayer
```prisma
model Prayer {
  id          String   @id @default(cuid())
  title       String
  arabicText  String   // Teks Arab do'a
  latinText   String   // Teks latin/transliterasi
  translation String   // Terjemahan dalam bahasa Indonesia
  category    String   // Kategori do'a
  imageUrl    String?  // Foto/gambar do'a
  authorId    String
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@map("prayers")
}
```

## API Endpoints

### 1. GET /api/prayers
- **Deskripsi**: Mengambil daftar do'a
- **Query Parameters**:
  - `category`: Filter berdasarkan kategori
  - `page`: Nomor halaman (default: 1)
  - `limit`: Jumlah item per halaman (default: 10)
- **Response**: Daftar do'a dengan pagination
- **Access Control**: Admin melihat semua do'a, user biasa hanya melihat yang dipublikasikan

### 2. POST /api/prayers
- **Deskripsi**: Membuat do'a baru
- **Access Control**: Admin only
- **Body**: Data do'a (title, arabicText, latinText, translation, category, imageUrl, isPublished)

### 3. GET /api/prayers/[id]
- **Deskripsi**: Mengambil detail do'a berdasarkan ID
- **Access Control**: Admin melihat semua, user biasa hanya yang dipublikasikan

### 4. PUT /api/prayers/[id]
- **Deskripsi**: Mengupdate do'a
- **Access Control**: Admin only
- **Body**: Data do'a yang diupdate

### 5. DELETE /api/prayers/[id]
- **Deskripsi**: Menghapus do'a
- **Access Control**: Admin only

## Halaman Frontend

### 1. /prayers
- **Deskripsi**: Halaman utama daftar do'a
- **Fitur**:
  - Grid layout responsive
  - Filter kategori
  - Pencarian real-time
  - Pagination
  - Loading states
  - Empty states

### 2. /prayers/[id]
- **Deskripsi**: Halaman detail do'a
- **Fitur**:
  - Tampilan lengkap do'a
  - Teks Arab dengan font khusus
  - Tombol copy untuk setiap bagian
  - Tombol share
  - Link ke do'a terkait

### 3. Admin Panel (/admin → Tab Do'a)
- **Deskripsi**: Panel manajemen do'a untuk admin
- **Fitur**:
  - CRUD operations
  - Form dialog untuk create/edit
  - Preview do'a
  - Status publikasi
  - Bulk operations

## Komponen React

### 1. PrayerManagement
- **Lokasi**: `src/components/admin/prayer-management.tsx`
- **Fungsi**: Komponen utama untuk manajemen do'a di admin panel
- **Fitur**: CRUD, form dialog, status management

### 2. PrayersPage
- **Lokasi**: `src/app/prayers/page.tsx`
- **Fungsi**: Halaman utama daftar do'a
- **Fitur**: Grid, filter, search, pagination

### 3. PrayerDetailPage
- **Lokasi**: `src/app/prayers/[id]/page.tsx`
- **Fungsi**: Halaman detail do'a
- **Fitur**: Tampilan lengkap, copy, share

## Styling & Font

### Font Arab
- **Font**: Amiri (Google Fonts)
- **CSS Class**: `.font-arabic`
- **Direction**: RTL (Right-to-Left)
- **Fallback**: Scheherazade New, Noto Naskh Arabic

### Utility Classes
- `.line-clamp-2`: Membatasi teks ke 2 baris
- `.line-clamp-3`: Membatasi teks ke 3 baris
- `.font-arabic`: Font khusus untuk teks Arab

## Data Contoh

Script `scripts/create-sample-prayers.js` menyediakan 12 do'a contoh:
1. Do'a Sebelum Makan
2. Do'a Sesudah Makan
3. Do'a Masuk Masjid
4. Do'a Keluar Masjid
5. Do'a Masuk Rumah
6. Do'a Keluar Rumah
7. Do'a Sebelum Belajar
8. Do'a Setelah Belajar
9. Do'a Dzikir Pagi
10. Do'a Dzikir Petang
11. Do'a Memohon Ampunan
12. Do'a Memohon Rezeki

## Cara Penggunaan

### 1. Setup Database
```bash
# Jalankan migration
npx prisma migrate dev --name add_prayers

# Generate Prisma client
npx prisma generate
```

### 2. Tambah Data Contoh
```bash
# Jalankan script untuk menambah do'a contoh
node scripts/create-sample-prayers.js
```

### 3. Akses Fitur
- **Publik**: `http://localhost:3000/prayers`
- **Admin**: `http://localhost:3000/admin` → Tab "Do'a"

### 4. Manajemen Do'a (Admin)
1. Login sebagai admin
2. Buka `/admin`
3. Pilih tab "Do'a"
4. Gunakan tombol "Tambah Do'a" untuk membuat do'a baru
5. Edit atau hapus do'a yang sudah ada
6. Atur status publikasi

## Keamanan

### Access Control
- **Admin**: Akses penuh ke semua operasi CRUD
- **User Biasa**: Hanya dapat melihat do'a yang dipublikasikan
- **Unauthenticated**: Hanya dapat melihat do'a yang dipublikasikan

### Validasi
- Semua field required (kecuali imageUrl)
- Validasi format URL untuk gambar
- Sanitasi input untuk mencegah XSS

## Performa

### Optimisasi
- Pagination untuk daftar do'a
- Lazy loading untuk gambar
- Caching untuk data statis
- Responsive design untuk mobile

### SEO
- Meta tags untuk halaman do'a
- Structured data untuk do'a
- URL yang SEO-friendly

## Troubleshooting

### Masalah Umum
1. **Font Arab tidak muncul**: Pastikan font Amiri sudah dimuat
2. **Gambar tidak tampil**: Periksa URL gambar dan CORS
3. **Permission denied**: Pastikan user memiliki role ADMIN

### Debug
- Cek console browser untuk error JavaScript
- Cek network tab untuk error API
- Cek database untuk data do'a

## Pengembangan Selanjutnya

### Fitur Potensial
1. **Audio**: Tambah audio untuk do'a
2. **Bookmark**: Sistem bookmark do'a favorit
3. **Share**: Share ke social media
4. **Print**: Print do'a
5. **Search Advanced**: Pencarian berdasarkan teks Arab
6. **Categories Management**: Manajemen kategori yang lebih fleksibel
7. **Bulk Import**: Import do'a dari file Excel/CSV
8. **Analytics**: Tracking penggunaan do'a

### Integrasi
1. **Notification**: Notifikasi do'a harian
2. **Calendar**: Integrasi dengan kalender Islam
3. **API External**: Integrasi dengan API do'a eksternal
4. **Mobile App**: Aplikasi mobile untuk do'a

## Kontribusi

Untuk berkontribusi pada fitur do'a:
1. Fork repository
2. Buat branch untuk fitur baru
3. Implementasi fitur
4. Test thoroughly
5. Submit pull request

## Lisensi

Fitur ini merupakan bagian dari sistem PPTB BAROKATUL QUR'AN dan mengikuti lisensi yang sama dengan proyek utama. 