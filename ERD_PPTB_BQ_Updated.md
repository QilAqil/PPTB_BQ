# Analisis Diagram Entitas-Relasi (ERD) Sistem PPTB-BQ

## Pengertian Diagram Entitas-Relasi (ERD)

Diagram Entitas-Relasi (ERD) adalah representasi visual dari struktur basis data, yang menunjukkan entitas (objek atau konsep penting dalam sistem), atribut (properti dari entitas), dan hubungan (koneksi atau interaksi) antar entitas tersebut. ERD ini menggambarkan bagaimana data diatur dan saling terkait dalam sistem PPTB-BQ.

## Entitas dan Atributnya

Berdasarkan analisis sistem PPTB-BQ, terdapat beberapa entitas utama beserta atribut-atributnya:

### 1. **Entitas: `Users` (Pengguna)**

- `id`: Pengidentifikasi unik untuk setiap pengguna
- `email`: Alamat email pengguna (digunakan untuk login)
- `name`: Nama lengkap pengguna
- `password`: Kata sandi pengguna (terenkripsi dengan bcrypt)
- `role`: Peran pengguna (USER atau ADMIN)
- `isVerified`: Status verifikasi email pengguna
- `isActive`: Status aktif/tidak aktif pengguna
- `lastLoginAt`: Waktu terakhir login
- `createdAt`: Waktu pembuatan akun
- `updatedAt`: Waktu terakhir update

### 2. **Entitas: `Sessions` (Sesi)**

- `id`: Pengidentifikasi unik untuk setiap sesi
- `userId`: Kunci asing yang merujuk ke `id` pengguna
- `token`: Token JWT untuk autentikasi
- `expiresAt`: Waktu kadaluarsa sesi
- `createdAt`: Waktu pembuatan sesi

### 3. **Entitas: `News` (Berita)**

- `id`: Pengidentifikasi unik untuk setiap berita
- `title`: Judul berita
- `content`: Isi konten berita
- `imageUrl`: URL gambar berita
- `authorId`: Kunci asing yang merujuk ke `id` pengguna pembuat
- `isPublished`: Status publikasi berita
- `publishedAt`: Waktu publikasi
- `createdAt`: Waktu pembuatan berita
- `updatedAt`: Waktu terakhir update

### 4. **Entitas: `Gallery` (Galeri)**

- `id`: Pengidentifikasi unik untuk setiap galeri
- `title`: Judul galeri
- `imageUrl`: URL gambar galeri
- `authorId`: Kunci asing yang merujuk ke `id` pengguna pembuat
- `isPublished`: Status publikasi galeri
- `publishedAt`: Waktu publikasi
- `createdAt`: Waktu pembuatan galeri
- `updatedAt`: Waktu terakhir update

### 5. **Entitas: `Prayers` (Doa-doa)**

- `id`: Pengidentifikasi unik untuk setiap doa
- `title`: Judul doa
- `arabicText`: Teks doa dalam bahasa Arab
- `latinText`: Teks doa dalam huruf latin
- `translation`: Terjemahan doa
- `category`: Kategori doa
- `authorId`: Kunci asing yang merujuk ke `id` pengguna pembuat
- `isPublished`: Status publikasi doa
- `publishedAt`: Waktu publikasi
- `createdAt`: Waktu pembuatan doa
- `updatedAt`: Waktu terakhir update

### 6. **Entitas: `Registrations` (Pendaftaran)**

- `id`: Pengidentifikasi unik untuk setiap pendaftaran
- `fullName`: Nama lengkap pendaftar
- `nik`: Nomor Induk Kependudukan
- `birthPlace`: Tempat lahir
- `birthDate`: Tanggal lahir
- `gender`: Jenis kelamin
- `address`: Alamat lengkap
- `phoneNumber`: Nomor telepon
- `parentName`: Nama orang tua
- `parentPhone`: Nomor telepon orang tua
- `motivation`: Motivasi mendaftar
- `status`: Status pendaftaran (PENDING, APPROVED, REJECTED)
- `notes`: Catatan tambahan
- `processedBy`: Kunci asing yang merujuk ke `id` admin yang memproses
- `processedAt`: Waktu pemrosesan
- `createdAt`: Waktu pendaftaran
- `updatedAt`: Waktu terakhir update

## Hubungan Antar Entitas

ERD ini menunjukkan berbagai hubungan antar entitas dengan pola yang konsisten:

### 1. **`Users` Mengelola `News`**

- **Hubungan**: Satu `Users` (dengan role ADMIN) dapat mengelola banyak entri `News`
- **Arah**: `Users` → `Mengelola` → `News`
- **Kardinalitas**: 1:N (Satu admin dapat membuat banyak berita)

### 2. **`Users` Mengelola `Gallery`**

- **Hubungan**: Satu `Users` (dengan role ADMIN) dapat mengelola banyak entri `Gallery`
- **Arah**: `Users` → `Mengelola` → `Gallery`
- **Kardinalitas**: 1:N (Satu admin dapat upload banyak foto)

### 3. **`Users` Mengelola `Prayers`**

- **Hubungan**: Satu `Users` (dengan role ADMIN) dapat mengelola banyak entri `Prayers`
- **Arah**: `Users` → `Mengelola` → `Prayers`
- **Kardinalitas**: 1:N (Satu admin dapat menambah banyak doa)

### 4. **`Users` Mengelola `Registrations`**

- **Hubungan**: Satu `Users` (dengan role ADMIN) dapat memproses banyak entri `Registrations`
- **Arah**: `Users` → `Mengelola` → `Registrations`
- **Kardinalitas**: 1:N (Satu admin dapat memproses banyak pendaftaran)

### 5. **`Users` Memiliki `Sessions`**

- **Hubungan**: Satu `Users` dapat memiliki banyak `Sessions` (untuk multiple device login)
- **Arah**: `Users` → `Memiliki` → `Sessions`
- **Kardinalitas**: 1:N (Satu user dapat login di banyak device)

### 6. **`Users` Membuat `Registrations`**

- **Hubungan**: Satu `Users` (dengan role USER) dapat membuat banyak `Registrations`
- **Arah**: `Users` → `Membuat` → `Registrations`
- **Kardinalitas**: 1:N (Satu user dapat mendaftar berkali-kali)

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

ERD sistem PPTB-BQ menggambarkan struktur basis data yang dirancang untuk mengelola sistem informasi pondok pesantren dengan fitur utama:

1. **Manajemen Pengguna**: Sistem autentikasi dan otorisasi berbasis role
2. **Manajemen Konten**: Berita, galeri foto, dan kumpulan doa-doa
3. **Sistem Pendaftaran**: Pendaftaran santri dengan workflow approval
4. **Keamanan**: Session management dan role-based access control

Struktur database ini dirancang dengan mempertimbangkan skalabilitas, keamanan, dan kemudahan maintenance, dengan relasi yang jelas antar entitas dan penggunaan foreign key yang konsisten.
