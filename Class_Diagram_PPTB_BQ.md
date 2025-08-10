# Analisis Diagram Kelas (Class Diagram) Sistem PPTB-BQ

## Pengertian Diagram Kelas (Class Diagram)

Diagram Kelas (Class Diagram) adalah representasi visual dari struktur kelas dalam sistem berorientasi objek, yang menunjukkan kelas (class), atribut (attributes), metode (methods), dan hubungan (relationships) antar kelas tersebut. Class Diagram ini menggambarkan bagaimana objek-objek dalam sistem PPTB-BQ saling berinteraksi dan berelasi.

## Kelas-kelas (Classes) dan Atributnya

Berdasarkan analisis sistem PPTB-BQ, terdapat beberapa kelas utama beserta atribut dan metodenya:

### 1. **Kelas: `Users` (Pengguna)**

- **Atribut:**

  - `id`: int (Primary Key)
  - `email`: string (Email pengguna untuk login)
  - `name`: string (Nama lengkap pengguna)
  - `password`: string (Kata sandi terenkripsi)
  - `role`: enum ('USER', 'ADMIN')
  - `isVerified`: boolean (Status verifikasi email)
  - `isActive`: boolean (Status aktif/tidak aktif)
  - `lastLoginAt`: timestamp (Waktu terakhir login)
  - `createdAt`: timestamp (Waktu pembuatan akun)
  - `updatedAt`: timestamp (Waktu terakhir update)

- **Metode (Fungsi):**
  - `login(email, password)`: Untuk proses masuk pengguna
  - `logout()`: Untuk proses keluar pengguna
  - `updateProfile(data)`: Untuk update profil pengguna
  - `changePassword(oldPassword, newPassword)`: Untuk ganti password

### 2. **Kelas: `Sessions` (Sesi)**

- **Atribut:**

  - `id`: int (Primary Key)
  - `userId`: int (Foreign Key - merujuk ke Users)
  - `token`: string (Token JWT untuk autentikasi)
  - `expiresAt`: timestamp (Waktu kadaluarsa sesi)
  - `createdAt`: timestamp (Waktu pembuatan sesi)

- **Metode (Fungsi):**
  - `createSession(userId)`: Untuk membuat sesi baru
  - `validateToken(token)`: Untuk validasi token
  - `expireSession()`: Untuk mengakhiri sesi

### 3. **Kelas: `News` (Berita)**

- **Atribut:**

  - `id`: int (Primary Key)
  - `title`: string (Judul berita)
  - `content`: text (Isi konten berita)
  - `imageUrl`: string (URL gambar berita)
  - `authorId`: int (Foreign Key - merujuk ke Users)
  - `isPublished`: boolean (Status publikasi berita)
  - `publishedAt`: timestamp (Waktu publikasi)
  - `createdAt`: timestamp (Waktu pembuatan berita)
  - `updatedAt`: timestamp (Waktu terakhir update)

- **Metode (Fungsi):**
  - `createNews(data)`: Untuk membuat berita baru
  - `updateNews(id, data)`: Untuk update berita
  - `deleteNews(id)`: Untuk hapus berita
  - `publishNews(id)`: Untuk publikasi berita
  - `getPublishedNews()`: Untuk ambil berita yang sudah dipublikasi

### 4. **Kelas: `Gallery` (Galeri)**

- **Atribut:**

  - `id`: int (Primary Key)
  - `title`: string (Judul galeri)
  - `imageUrl`: string (URL gambar galeri)
  - `authorId`: int (Foreign Key - merujuk ke Users)
  - `isPublished`: boolean (Status publikasi galeri)
  - `publishedAt`: timestamp (Waktu publikasi)
  - `createdAt`: timestamp (Waktu pembuatan galeri)
  - `updatedAt`: timestamp (Waktu terakhir update)

- **Metode (Fungsi):**
  - `uploadImage(file)`: Untuk upload gambar
  - `updateGallery(id, data)`: Untuk update galeri
  - `deleteGallery(id)`: Untuk hapus galeri
  - `publishGallery(id)`: Untuk publikasi galeri
  - `getPublishedGallery()`: Untuk ambil galeri yang sudah dipublikasi

### 5. **Kelas: `Prayers` (Doa-doa)**

- **Atribut:**

  - `id`: int (Primary Key)
  - `title`: string (Judul doa)
  - `arabicText`: text (Teks doa dalam bahasa Arab)
  - `latinText`: text (Teks doa dalam huruf latin)
  - `translation`: text (Terjemahan doa)
  - `category`: string (Kategori doa)
  - `authorId`: int (Foreign Key - merujuk ke Users)
  - `isPublished`: boolean (Status publikasi doa)
  - `publishedAt`: timestamp (Waktu publikasi)
  - `createdAt`: timestamp (Waktu pembuatan doa)
  - `updatedAt`: timestamp (Waktu terakhir update)

- **Metode (Fungsi):**
  - `addPrayer(data)`: Untuk tambah doa baru
  - `updatePrayer(id, data)`: Untuk update doa
  - `deletePrayer(id)`: Untuk hapus doa
  - `publishPrayer(id)`: Untuk publikasi doa
  - `getPrayersByCategory(category)`: Untuk ambil doa berdasarkan kategori

### 6. **Kelas: `Registrations` (Pendaftaran)**

- **Atribut:**

  - `id`: int (Primary Key)
  - `fullName`: string (Nama lengkap pendaftar)
  - `nik`: string (Nomor Induk Kependudukan)
  - `birthPlace`: string (Tempat lahir)
  - `birthDate`: date (Tanggal lahir)
  - `gender`: string (Jenis kelamin)
  - `address`: text (Alamat lengkap)
  - `phoneNumber`: string (Nomor telepon)
  - `parentName`: string (Nama orang tua)
  - `parentPhone`: string (Nomor telepon orang tua)
  - `motivation`: text (Motivasi mendaftar)
  - `status`: enum ('PENDING', 'APPROVED', 'REJECTED')
  - `notes`: text (Catatan tambahan)
  - `processedBy`: int (Foreign Key - merujuk ke Users/Admin)
  - `processedAt`: timestamp (Waktu pemrosesan)
  - `createdAt`: timestamp (Waktu pendaftaran)
  - `updatedAt`: timestamp (Waktu terakhir update)

- **Metode (Fungsi):**
  - `submitRegistration(data)`: Untuk submit pendaftaran
  - `updateStatus(id, status, notes)`: Untuk update status pendaftaran
  - `getRegistrationsByStatus(status)`: Untuk ambil pendaftaran berdasarkan status
  - `processRegistration(id, adminId)`: Untuk proses pendaftaran oleh admin

## Hubungan Antar Kelas (Relationships)

Class Diagram ini menunjukkan berbagai hubungan antar kelas dengan pola yang konsisten:

### 1. **`Users` dan `Sessions`**

- **Tipe Relasi**: Satu-ke-Banyak (One-to-Many)
- **Keterangan**: Satu `Users` dapat memiliki banyak `Sessions`
- **Implementasi**: `Sessions` memiliki `userId` sebagai Foreign Key yang merujuk ke `Users`

### 2. **`Users` dan `News`**

- **Tipe Relasi**: Satu-ke-Banyak (One-to-Many)
- **Keterangan**: Satu `Users` (dengan role ADMIN) dapat membuat banyak `News`
- **Implementasi**: `News` memiliki `authorId` sebagai Foreign Key yang merujuk ke `Users`

### 3. **`Users` dan `Gallery`**

- **Tipe Relasi**: Satu-ke-Banyak (One-to-Many)
- **Keterangan**: Satu `Users` (dengan role ADMIN) dapat upload banyak `Gallery`
- **Implementasi**: `Gallery` memiliki `authorId` sebagai Foreign Key yang merujuk ke `Users`

### 4. **`Users` dan `Prayers`**

- **Tipe Relasi**: Satu-ke-Banyak (One-to-Many)
- **Keterangan**: Satu `Users` (dengan role ADMIN) dapat menambah banyak `Prayers`
- **Implementasi**: `Prayers` memiliki `authorId` sebagai Foreign Key yang merujuk ke `Users`

### 5. **`Users` dan `Registrations`**

- **Tipe Relasi**: Satu-ke-Banyak (One-to-Many)
- **Keterangan**: Satu `Users` (dengan role ADMIN) dapat memproses banyak `Registrations`
- **Implementasi**: `Registrations` memiliki `processedBy` sebagai Foreign Key yang merujuk ke `Users`

## Karakteristik Khusus Sistem PPTB-BQ

### 1. **Role-Based Access Control (RBAC)**

- Sistem menggunakan role `USER` dan `ADMIN` untuk membedakan hak akses
- Hanya `ADMIN` yang dapat mengelola konten (berita, galeri, doa-doa)
- `USER` dapat melihat konten dan melakukan pendaftaran

### 2. **Session Management**

- Menggunakan JWT (JSON Web Token) untuk autentikasi
- Session memiliki waktu kadaluarsa untuk keamanan
- Satu user dapat memiliki multiple session

### 3. **Content Publishing System**

- Semua konten (berita, galeri, doa-doa) memiliki status publikasi
- Admin dapat mengontrol kapan konten dipublikasikan
- Timestamp untuk tracking waktu publikasi

### 4. **Registration Workflow**

- Pendaftaran memiliki status yang dapat diubah oleh admin
- Tracking lengkap proses pendaftaran (dibuat, diproses, selesai)
- Audit trail untuk admin yang memproses pendaftaran

## Kesimpulan

Class Diagram sistem PPTB-BQ menggambarkan struktur kelas yang dirancang untuk mengelola sistem informasi pondok pesantren dengan fitur utama:

1. **Manajemen Pengguna**: Sistem autentikasi dan otorisasi berbasis role
2. **Manajemen Konten**: Berita, galeri foto, dan kumpulan doa-doa
3. **Sistem Pendaftaran**: Pendaftaran santri dengan workflow approval
4. **Keamanan**: Session management dan role-based access control

Struktur kelas ini dirancang dengan mempertimbangkan prinsip Object-Oriented Programming (OOP), dengan relasi yang jelas antar kelas dan penggunaan foreign key yang konsisten untuk implementasi relasi database.
