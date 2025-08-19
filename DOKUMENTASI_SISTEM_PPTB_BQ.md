# DOKUMENTASI SISTEM PONDOK PESANTREN TAHFIDZ & BAHASA BAROKATUL QUR'AN (PPTB-BQ)

## 1. PENDAHULUAN

### 1.1 Latar Belakang

Sistem PPTB-BQ adalah aplikasi web yang dikembangkan untuk Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR'AN. Sistem ini dirancang untuk mengelola informasi pondok pesantren, pendaftaran santri baru, berita, galeri, dan doa-doa Islam.

### 1.2 Tujuan

- Memudahkan pengelolaan informasi pondok pesantren
- Menyediakan sistem pendaftaran santri baru yang terintegrasi
- Mengelola konten berita, galeri, dan doa-doa
- Memberikan akses informasi yang mudah bagi pengunjung

### 1.3 Ruang Lingkup

Sistem mencakup:

- Website informasi pondok pesantren
- Sistem pendaftaran santri baru
- Panel administrasi untuk pengelolaan konten
- Sistem autentikasi dan otorisasi
- Manajemen berita, galeri, dan doa-doa

## 2. TEKNOLOGI YANG DIGUNAKAN

### 2.1 Frontend

- **Next.js 15.4.4** - React framework
- **React 19.1.0** - JavaScript library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components

### 2.2 Backend

- **Next.js API Routes** - Server-side API
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database management system
- **JWT** - JSON Web Token untuk autentikasi
- **bcryptjs** - Password hashing

### 2.3 Database

- **PostgreSQL** dengan Neon sebagai provider
- **Prisma Schema** untuk model data

## 3. ARSITEKTUR SISTEM

### 3.1 Arsitektur Umum

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (PostgreSQL)  │
│   React + TS    │    │   Prisma ORM    │    │   Neon          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 3.2 Struktur Folder

```
pptb-bq/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API endpoints
│   │   ├── admin/          # Admin panel
│   │   ├── registration/   # Registration page
│   │   └── ...
│   ├── components/         # React components
│   ├── lib/               # Utility libraries
│   └── hooks/             # Custom hooks
├── prisma/                # Database schema
├── public/                # Static assets
└── scripts/               # Utility scripts
```

## 4. ANALISIS PEMAKAI

### 4.1 Pengunjung (Public Users)

#### 4.1.1 Karakteristik

- **Demografi**: Masyarakat umum, calon santri, orang tua santri
- **Usia**: 15-50 tahun
- **Lokasi**: Lokal dan regional
- **Teknologi**: Menggunakan smartphone dan komputer

#### 4.1.2 Kebutuhan

- **Informasi Pondok Pesantren**

  - Profil dan visi misi
  - Program pendidikan
  - Fasilitas yang tersedia
  - Lokasi dan kontak

- **Konten Religius**

  - Berita pondok pesantren
  - Galeri kegiatan
  - Kumpulan doa-doa

- **Pendaftaran Santri**
  - Form pendaftaran online
  - Informasi persyaratan
  - Status pendaftaran

#### 4.1.3 Aktivitas Utama

1. **Melihat Halaman Utama**

   - Hero section dengan informasi utama
   - Visi misi pondok pesantren
   - Berita terbaru

2. **Mengakses Konten**

   - Membaca berita pondok pesantren
   - Melihat galeri kegiatan
   - Mempelajari doa-doa

3. **Pendaftaran Santri**
   - Mengisi form pendaftaran
   - Melihat informasi pendaftaran
   - Mengecek status pendaftaran

### 4.2 Admin

#### 4.2.1 Karakteristik

- **Demografi**: Pengurus pondok pesantren, staff administrasi
- **Usia**: 25-60 tahun
- **Lokasi**: Di dalam pondok pesantren
- **Teknologi**: Menggunakan komputer dan laptop

#### 4.2.2 Kebutuhan

- **Manajemen Konten**

  - Membuat dan mengedit berita
  - Mengelola galeri foto
  - Menambah doa-doa baru

- **Manajemen Pendaftaran**

  - Melihat daftar pendaftar
  - Menyetujui/menolak pendaftaran
  - Memberikan catatan pada pendaftaran

- **Manajemen Pengguna**

  - Membuat akun admin baru
  - Mengelola hak akses
  - Memantau aktivitas pengguna

- **Dashboard dan Laporan**
  - Statistik pendaftaran
  - Laporan aktivitas
  - Monitoring sistem

#### 4.2.3 Aktivitas Utama

1. **Login ke Sistem**

   - Autentikasi dengan email dan password
   - Akses ke panel admin

2. **Manajemen Konten**

   - CRUD berita
   - CRUD galeri
   - CRUD doa-doa

3. **Manajemen Pendaftaran**

   - Melihat daftar pendaftar
   - Menyetujui/menolak pendaftaran
   - Memberikan catatan

4. **Manajemen Pengguna**
   - Membuat akun baru
   - Mengubah role pengguna
   - Menonaktifkan akun

## 5. ANALISIS KEBUTUHAN SISTEM

### 5.1 Kebutuhan Fungsional

#### 5.1.1 Manajemen Autentikasi

- **RF-001**: Sistem login dengan email dan password
- **RF-002**: Sistem registrasi pengguna baru
- **RF-003**: Logout dan manajemen session
- **RF-004**: Role-based access control (USER/ADMIN)
- **RF-005**: Password hashing dan keamanan

#### 5.1.2 Manajemen Berita

- **RF-006**: Membuat berita baru
- **RF-007**: Mengedit berita yang ada
- **RF-008**: Menghapus berita
- **RF-009**: Publish/unpublish berita
- **RF-010**: Menampilkan berita di halaman publik

#### 5.1.3 Manajemen Galeri

- **RF-011**: Upload foto ke galeri
- **RF-012**: Mengedit informasi foto
- **RF-013**: Menghapus foto
- **RF-014**: Publish/unpublish foto
- **RF-015**: Menampilkan galeri di halaman publik

#### 5.1.4 Manajemen Doa-doa

- **RF-016**: Menambah doa baru
- **RF-017**: Mengedit doa yang ada
- **RF-018**: Menghapus doa
- **RF-019**: Publish/unpublish doa
- **RF-020**: Menampilkan doa di halaman publik

#### 5.1.5 Sistem Pendaftaran Santri

- **RF-021**: Form pendaftaran santri baru
- **RF-022**: Validasi data pendaftaran
- **RF-023**: Menyimpan data pendaftaran
- **RF-024**: Melihat daftar pendaftar (admin)
- **RF-025**: Menyetujui/menolak pendaftaran
- **RF-026**: Memberikan catatan pada pendaftaran

#### 5.1.6 Manajemen Pengguna

- **RF-027**: Membuat akun pengguna baru
- **RF-028**: Mengedit data pengguna
- **RF-029**: Menghapus akun pengguna
- **RF-030**: Mengubah role pengguna
- **RF-031**: Menonaktifkan/mengaktifkan akun

#### 5.1.7 Dashboard dan Laporan

- **RF-032**: Dashboard admin dengan statistik
- **RF-033**: Laporan pendaftaran santri
- **RF-034**: Laporan aktivitas pengguna
- **RF-035**: Monitoring sistem

### 5.2 Kebutuhan Non-Fungsional

#### 5.2.1 Kebutuhan Performa

- **RNF-001**: Response time < 3 detik untuk semua operasi
- **RNF-002**: Sistem dapat menangani 100+ pengguna bersamaan
- **RNF-003**: Optimasi loading gambar dan konten
- **RNF-004**: Caching untuk konten statis

#### 5.2.2 Kebutuhan Keamanan

- **RNF-005**: Enkripsi password dengan bcrypt
- **RNF-006**: JWT token dengan expiry time
- **RNF-007**: Validasi input untuk mencegah SQL injection
- **RNF-008**: CSRF protection
- **RNF-009**: XSS protection
- **RNF-010**: Role-based access control

#### 5.2.3 Kebutuhan Usabilitas

- **RNF-011**: Interface yang responsif (mobile-first)
- **RNF-012**: Navigasi yang intuitif
- **RNF-013**: Loading states dan feedback
- **RNF-014**: Error handling yang user-friendly
- **RNF-015**: Accessibility compliance

#### 5.2.4 Kebutuhan Reliability

- **RNF-016**: Uptime 99.5%
- **RNF-017**: Backup database otomatis
- **RNF-018**: Error logging dan monitoring
- **RNF-019**: Graceful error handling

#### 5.2.5 Kebutuhan Scalability

- **RNF-020**: Arsitektur yang dapat di-scale
- **RNF-021**: Database optimization
- **RNF-022**: CDN untuk static assets
- **RNF-023**: Load balancing capability

## 6. PERANCANGAN SISTEM

### 6.1 Use Case Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        PPTB-BQ System                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Pengunjung │    │    Admin    │    │    User     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Use Cases                              │
│                                                               │
│  ◉ Melihat Berita          ◉ Login                          │
│  ◉ Melihat Galeri          ◉ Logout                         │
│  ◉ Melihat Doa-doa         ◉ Manajemen Berita              │
│  ◉ Pendaftaran Santri      ◉ Manajemen Galeri              │
│  ◉ Melihat Visi Misi       ◉ Manajemen Doa-doa             │
│                             ◉ Manajemen Pendaftaran         │
│                             ◉ Manajemen Pengguna            │
│                             ◉ Dashboard Admin               │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Activity Diagram

#### 6.2.1 Activity Diagram Login Admin

```
┌─────────────┐
│    Start    │
└─────────────┘
       │
       ▼
┌─────────────┐
│ Input Email │
│ & Password  │
└─────────────┘
       │
       ▼
┌─────────────┐
│   Validate  │
│ Credentials │
└─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ Valid?      │────►│ Show Error  │
└─────────────┘     └─────────────┘
       │ Yes
       ▼
┌─────────────┐
│ Check Role  │
└─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ Is Admin?   │────►│ Redirect to │
└─────────────┘     │   Home      │
       │ Yes
       ▼
┌─────────────┐
│ Create JWT  │
│   Token     │
└─────────────┘
       │
       ▼
┌─────────────┐
│ Redirect to │
│ Admin Panel │
└─────────────┘
       │
       ▼
┌─────────────┐
│    End      │
└─────────────┘
```

#### 6.2.2 Activity Diagram Pendaftaran Santri

```
┌─────────────┐
│    Start    │
└─────────────┘
       │
       ▼
┌─────────────┐
│ Access Form │
│Registration │
└─────────────┘
       │
       ▼
┌─────────────┐
│ Fill Form   │
│ Data        │
└─────────────┘
       │
       ▼
┌─────────────┐
│ Validate    │
│ Form Data   │
└─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ Valid?      │────►│ Show Error  │
└─────────────┘     └─────────────┘
       │ Yes
       ▼
┌─────────────┐
│ Save to     │
│ Database    │
└─────────────┘
       │
       ▼
┌─────────────┐
│ Send Email  │
│ Confirmation│
└─────────────┘
       │
       ▼
┌─────────────┐
│ Show Success│
│ Message     │
└─────────────┘
       │
       ▼
┌─────────────┐
│    End      │
└─────────────┘
```

### 6.3 Sequence Diagram

#### 6.3.1 Sequence Diagram Login Admin

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Admin  │    │ Frontend│    │ Backend │    │Database │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │
     │──Login Req──►│              │              │
     │              │              │              │
     │              │──POST /login─►│              │
     │              │              │              │
     │              │              │──Find User──►│
     │              │              │              │
     │              │              │◄──User Data──│
     │              │              │              │
     │              │              │──Validate───►│
     │              │              │  Password    │
     │              │              │              │
     │              │              │◄──Valid──────│
     │              │              │              │
     │              │              │──Create JWT──│
     │              │              │              │
     │              │◄──JWT Token──│              │
     │              │              │              │
     │◄──Success────│              │              │
     │              │              │              │
     │──Redirect───►│              │              │
     │              │              │              │
```

#### 6.3.2 Sequence Diagram Pendaftaran Santri

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Visitor │    │ Frontend│    │ Backend │    │Database │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │
     │──Fill Form──►│              │              │
     │              │              │              │
     │              │──POST /reg──►│              │
     │              │              │              │
     │              │              │──Validate───►│
     │              │              │  Data        │
     │              │              │              │
     │              │              │──Save Reg───►│
     │              │              │              │
     │              │              │◄──Success────│
     │              │              │              │
     │◄──Success────│              │              │
     │              │              │              │
```

### 6.4 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────┐
│                        ERD PPTB-BQ                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    User     │         │   Session   │         │    News     │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id (PK)     │◄────────│ id (PK)     │         │ id (PK)     │
│ email       │         │ userId (FK) │         │ title       │
│ name        │         │ token       │         │ content     │
│ password    │         │ expiresAt   │         │ imageUrl    │
│ role        │         │ createdAt   │         │ authorId(FK)│
│ isVerified  │         └─────────────┘         │ isPublished │
│ isActive    │                                 │ publishedAt │
│ lastLoginAt │                                 │ createdAt   │
│ createdAt   │                                 │ updatedAt   │
│ updatedAt   │                                 └─────────────┘
└─────────────┘                                         │
       │                                                 │
       │                                                 │
       │         ┌─────────────┐         ┌─────────────┐│
       │         │  Gallery    │         │   Prayer    ││
       │         ├─────────────┤         ├─────────────┤│
       │         │ id (PK)     │         │ id (PK)     ││
       │         │ title       │         │ title       ││
       │         │ imageUrl    │         │ arabicText  ││
       │         │ authorId(FK)│         │ latinText   ││
       │         │ isPublished │         │ translation ││
       │         │ publishedAt │         │ category    ││
       │         │ createdAt   │         │ authorId(FK)││
       │         │ updatedAt   │         │ isPublished ││
       │         └─────────────┘         │ publishedAt ││
       │                                 │ createdAt   ││
       │                                 │ updatedAt   ││
       │                                 └─────────────┘│
       │                                                 │
       │         ┌─────────────┐                        │
       │         │Registration │                        │
       │         ├─────────────┤                        │
       │         │ id (PK)     │                        │
       │         │ fullName    │                        │
       │         │ nik         │                        │
       │         │ birthPlace  │                        │
       │         │ birthDate   │                        │
       │         │ gender      │                        │
       │         │ address     │                        │
       │         │ phoneNumber │                        │
       │         │ parentName  │                        │
       │         │ parentPhone │                        │
       │         │ motivation  │                        │
       │         │ status      │                        │
       │         │ notes       │                        │
       │         │ processedBy(FK)                      │
       │         │ processedAt │                        │
       │         │ createdAt   │                        │
       │         │ updatedAt   │                        │
       │         └─────────────┘                        │
       │                                                 │
       └─────────────────────────────────────────────────┘
```

### 6.5 Class Diagram (Gambar)

- Menggambarkan struktur kelas aplikasi, atribut, metode inti, dan relasi antar kelas.
- Kelas utama: `User`, `Session`, `News`, `Gallery`, `Prayer`, `Registration`.
- Enumerasi: `UserRole` (USER, ADMIN), `RegistrationStatus` (PENDING, APPROVED, REJECTED).

![Class Diagram](/diagrams/class_diagram_boxes.png)

Ringkasan relasi:

- `User` 1..\* `Session` (multi-device login)
- `User` 1..\* `News` / `Gallery` / `Prayer` (authoring konten)
- `User` 1..\* `Registration` melalui `processedBy` (admin pemroses)

### 6.6 ERD Crow's Foot (Gambar)

- Menunjukkan entitas, atribut kunci, dan kardinalitas relasi.
- Kunci/constraint penting: `User.email` UNIQUE, `Session.token` UNIQUE.

![ERD Crow's Foot](/diagrams/erd_crows_foot_id.png)

### 6.7 ERD Gaya Chen (Gambar)

- Visualisasi entity–attribute dengan hubungan bertanda berlian (relationship) sesuai contoh konvensi Chen.

![ERD Chen](/diagrams/erd_chen_id.png)

### 6.8 Sequence Diagram (Gambar)

Penjelasan umum: interaksi antar aktor–UI–API–Database sesuai alur fitur. Setiap diagram berikut ditautkan sebagai PNG.

1. Login User

![Sequence Login User](/diagrams/seq_login_user.png)

2. Register User

![Sequence Register User](/diagrams/seq_register_user.png)

3. Pendaftaran User (Kirim Form)

![Sequence Pendaftaran User](/diagrams/seq_pendaftaran_user.png)

4. Login Admin (dengan verifikasi role)

![Sequence Login Admin](/diagrams/seq_login_admin.png)

5. Manajemen Pengguna (CRUD)

![Sequence Manajemen Pengguna](/diagrams/seq_manajemen_pengguna.png)

6. Manajemen Pendaftaran (Approve/Reject)

![Sequence Manajemen Pendaftaran](/diagrams/seq_manajemen_pendaftaran.png)

7. Manajemen Berita (CRUD + Publish)

![Sequence Manajemen Berita](/diagrams/seq_manajemen_berita.png)

8. Manajemen Galeri (Upload + CRUD + Publish)

![Sequence Manajemen Galeri](/diagrams/seq_manajemen_galeri.png)

9. Manajemen Doa (CRUD + Publish)

![Sequence Manajemen Doa](/diagrams/seq_manajemen_doa.png)

## 7. PERANCANGAN BASIS DATA

### 7.1 Struktur Database

#### 7.1.1 Tabel User

```sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    isVerified BOOLEAN DEFAULT false,
    isActive BOOLEAN DEFAULT true,
    lastLoginAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 7.1.2 Tabel Session

```sql
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expiresAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 7.1.3 Tabel News

```sql
CREATE TABLE news (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    imageUrl VARCHAR(500),
    authorId VARCHAR(255) NOT NULL,
    isPublished BOOLEAN DEFAULT false,
    publishedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 7.1.4 Tabel Gallery

```sql
CREATE TABLE gallery (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(500) NOT NULL,
    authorId VARCHAR(255) NOT NULL,
    isPublished BOOLEAN DEFAULT false,
    publishedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 7.1.5 Tabel Registration

```sql
CREATE TABLE registrations (
    id VARCHAR(255) PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    nik VARCHAR(255) NOT NULL,
    birthPlace VARCHAR(255) NOT NULL,
    birthDate DATE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    parentName VARCHAR(255) NOT NULL,
    parentPhone VARCHAR(255) NOT NULL,
    motivation TEXT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    notes TEXT,
    processedBy VARCHAR(255),
    processedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (processedBy) REFERENCES users(id)
);
```

#### 7.1.6 Tabel Prayer

```sql
CREATE TABLE prayers (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    arabicText TEXT NOT NULL,
    latinText TEXT NOT NULL,
    translation TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    authorId VARCHAR(255) NOT NULL,
    isPublished BOOLEAN DEFAULT false,
    publishedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
);
```

### 7.2 Indeks Database

#### 7.2.1 Indeks untuk Performa Query

```sql
-- Indeks untuk tabel users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_isActive ON users(isActive);

-- Indeks untuk tabel sessions
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_userId ON sessions(userId);
CREATE INDEX idx_sessions_expiresAt ON sessions(expiresAt);

-- Indeks untuk tabel news
CREATE INDEX idx_news_authorId ON news(authorId);
CREATE INDEX idx_news_isPublished ON news(isPublished);
CREATE INDEX idx_news_publishedAt ON news(publishedAt);

-- Indeks untuk tabel gallery
CREATE INDEX idx_gallery_authorId ON gallery(authorId);
CREATE INDEX idx_gallery_isPublished ON gallery(isPublished);

-- Indeks untuk tabel registrations
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_processedBy ON registrations(processedBy);
CREATE INDEX idx_registrations_createdAt ON registrations(createdAt);

-- Indeks untuk tabel prayers
CREATE INDEX idx_prayers_authorId ON prayers(authorId);
CREATE INDEX idx_prayers_category ON prayers(category);
CREATE INDEX idx_prayers_isPublished ON prayers(isPublished);
```

### 7.3 Relasi Antar Tabel

#### 7.3.1 Relasi One-to-Many

- **User → Session**: Satu user dapat memiliki banyak session
- **User → News**: Satu user dapat membuat banyak berita
- **User → Gallery**: Satu user dapat upload banyak foto
- **User → Prayer**: Satu user dapat membuat banyak doa
- **User → Registration**: Satu admin dapat memproses banyak pendaftaran

#### 7.3.2 Relasi One-to-One

- **User ↔ Registration (processedBy)**: Satu pendaftaran hanya dapat diproses oleh satu admin

### 7.4 Constraints dan Validasi

#### 7.4.1 Constraints Database

```sql
-- Unique constraints
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE sessions ADD CONSTRAINT unique_token UNIQUE (token);

-- Check constraints
ALTER TABLE registrations ADD CONSTRAINT check_gender
    CHECK (gender IN ('Laki-laki', 'Perempuan'));
ALTER TABLE registrations ADD CONSTRAINT check_status
    CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'));

-- Not null constraints
ALTER TABLE users MODIFY email VARCHAR(255) NOT NULL;
ALTER TABLE users MODIFY password VARCHAR(255) NOT NULL;
ALTER TABLE news MODIFY title VARCHAR(255) NOT NULL;
ALTER TABLE news MODIFY content TEXT NOT NULL;
```

#### 7.4.2 Validasi Aplikasi

- **Email**: Format email yang valid
- **Password**: Minimal 6 karakter
- **NIK**: 16 digit angka
- **Phone Number**: Format nomor telepon Indonesia
- **Birth Date**: Tanggal lahir tidak boleh di masa depan
- **File Upload**: Tipe file dan ukuran yang diizinkan

### 7.5 Backup dan Recovery

#### 7.5.1 Strategi Backup

- **Daily Backup**: Backup otomatis setiap hari
- **Weekly Backup**: Backup lengkap setiap minggu
- **Monthly Backup**: Backup arsip setiap bulan

#### 7.5.2 Recovery Plan

- **Point-in-time Recovery**: Dapat memulihkan ke waktu tertentu
- **Disaster Recovery**: Prosedur pemulihan bencana
- **Data Integrity**: Validasi integritas data setelah recovery

## 8. KESIMPULAN

Dokumentasi sistem PPTB-BQ ini telah mencakup semua aspek yang diperlukan untuk pengembangan dan implementasi sistem. Sistem ini dirancang dengan arsitektur modern menggunakan Next.js, Prisma ORM, dan PostgreSQL yang memberikan performa, keamanan, dan skalabilitas yang baik.

Sistem ini dapat memenuhi kebutuhan pengunjung untuk mendapatkan informasi pondok pesantren dan melakukan pendaftaran, serta kebutuhan admin untuk mengelola konten dan pendaftaran dengan efisien.

---

**Dokumentasi ini dibuat pada:** [Tanggal]
**Versi:** 1.0
**Status:** Final
