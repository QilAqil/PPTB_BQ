

## 4.1 Analisis Pemakai

Pada tahap awal pengembangan sistem, dilakukan analisis pemakai untuk mengetahui siapa saja yang nantinya akan menggunakan sistem ini, selain itu juga diperlukan analisis untuk mengetahui kebutuhan dari pemakai itu sendiri. Setelah dilakukan analisis, sistem ini nantinya akan digunakan oleh 2 pemakai.

### a. Pengunjung

Beberapa tujuan dan kebutuhan pengunjung yaitu:

**Tujuan:**
1. Melihat informasi pondok pesantren dan visi misi
2. Melihat berita dan galeri kegiatan pondok pesantren
3. Mempelajari doa-doa Islam
4. Melakukan pendaftaran santri baru
5. Mengecek status pendaftaran

**Kebutuhan:**
1. Antarmuka mudah dipakai di smartphone dan komputer
2. Informasi lengkap dan terpercaya tentang pondok pesantren
3. Konten religius yang mudah diakses
4. Form pendaftaran yang mudah dipahami
5. Status pendaftaran yang jelas dan transparan

### b. Admin

Beberapa tujuan dan kebutuhan admin yaitu:

**Tujuan:**
1. Mengelola data berita pondok pesantren
2. Mengelola galeri foto kegiatan
3. Mengelola kumpulan doa-doa
4. Melihat dan mengelola pendaftaran santri baru
5. Mengelola data pengguna sistem
6. Menyediakan laporan dan statistik

**Kebutuhan:**
1. Dashboard admin yang aman dan mudah digunakan
2. Form input data yang user-friendly
3. Sistem manajemen konten yang terstruktur
4. Filter dan laporan yang rapi
5. Sistem autentikasi yang kuat

## 4.2 Analisis Kebutuhan Sistem

Pada tahap ini dilakukan analisis kebutuhan sistem untuk memahami secara detail fitur-fitur yang harus disediakan oleh Sistem PPTB-BQ. Berdasarkan observasi dan analisis kebutuhan, beberapa kebutuhan sistem yang telah diidentifikasi meliputi:

### a. Kebutuhan Fungsional

**Pengunjung:**
1. Melihat halaman utama dengan informasi pondok pesantren
2. Melihat berita pondok pesantren
3. Melihat galeri foto kegiatan
4. Mempelajari doa-doa Islam
5. Melakukan pendaftaran santri baru
6. Mengecek status pendaftaran
7. Melihat visi misi pondok pesantren

**Admin:**
1. Login Admin dengan autentikasi yang aman
2. Mengelola data berita (Create, Read, Update, Delete)
3. Mengelola galeri foto kegiatan
4. Mengelola kumpulan doa-doa
5. Melihat dan mengelola data pendaftaran santri
6. Mengelola data pengguna sistem
7. Melihat dashboard dengan statistik
8. Export laporan pendaftaran

**Sistem:**
1. Menghasilkan kode pendaftaran unik
2. Validasi data pendaftaran
3. Sistem autentikasi dengan JWT
4. Role-based access control

### b. Kebutuhan Non-Fungsional

Beberapa kebutuhan non-fungsional meliputi usability, performance, reliability dan scalability sebagai berikut:

1. Antarmuka yang responsif (mobile-first design)
2. Navigasi mudah dipahami
3. Validasi data untuk mencegah kesalahan input
4. Login admin dengan autentikasi yang aman
5. Kode bersih untuk memudahkan pemeliharaan
6. Terpisah antara pengunjung dan admin
7. Performa yang cepat (< 3 detik response time)
8. Keamanan data yang terjamin

## 4.3 Perancangan Sistem

Pada tahap perancangan sistem dilakukan penyusunan arsitektur sistem yang mencakup alur proses bisnis, struktur basis data dan desain tampilan antarmuka pengguna. Beberapa langkah yang diambil dalam perancangan sistem adalah sebagai berikut:

### a. Use Case Diagram

**Usecase diagram aktor pengunjung:**

```
┌─────────────────────────────────────────────────────────────────┐
│                        PPTB-BQ System                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐
│  Pengunjung │
└─────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Use Cases                              │
│                                                               │
│  ◉ Melihat Berita                                            │
│  ◉ Melihat Galeri                                            │
│  ◉ Melihat Doa-doa                                           │
│  ◉ Pendaftaran Santri                                        │
│  ◉ Melihat Visi Misi                                         │
│  ◉ Mengecek Status Pendaftaran                               │
└─────────────────────────────────────────────────────────────────┘
```

**Usecase diagram admin:**

```
┌─────────────────────────────────────────────────────────────────┐
│                        PPTB-BQ System                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐
│    Admin    │
└─────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Use Cases                              │
│                                                               │
│  ◉ Login Admin                                               │
│  ◉ Manajemen Berita                                          │
│  ◉ Manajemen Galeri                                          │
│  ◉ Manajemen Doa-doa                                         │
│  ◉ Manajemen Pendaftaran                                     │
│  ◉ Manajemen Pengguna                                        │
│  ◉ Dashboard Admin                                            │
│  ◉ Export Laporan                                            │
└─────────────────────────────────────────────────────────────────┘
```

**Tabel 4.1 Deskripsi Usecase Melihat Berita**

| Nama Use Case | Melihat Berita |
|---------------|----------------|
| Tujuan | Pengunjung dapat melihat berita pondok pesantren di halaman utama dan halaman berita |
| Pre Kondisi | - |
| Kondisi Saat Gagal | - |
| Aktor Utama | Pengunjung |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman utama website<br>2. Pengunjung menggunakan navigasi untuk melihat berita<br>3. Pengunjung bisa memilih berita untuk melihat detailnya |
| Post Kondisi | Pengunjung berhasil membuka halaman berita |

**Tabel 4.2 Deskripsi Usecase Pendaftaran Santri**

| Nama Use Case | Pendaftaran Santri |
|---------------|-------------------|
| Tujuan | Pengunjung dapat melakukan pendaftaran santri baru dengan mengisi form yang disediakan |
| Pre Kondisi | Pengunjung harus membuka halaman pendaftaran |
| Kondisi Saat Gagal | Data tidak lengkap atau tidak valid |
| Aktor Utama | Pengunjung |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman pendaftaran<br>2. Pengunjung mengisi form pendaftaran dengan data lengkap<br>3. Pengunjung menekan tombol submit<br>4. Sistem memvalidasi data pendaftaran<br>5. Data pendaftaran tersimpan di database<br>6. Pengunjung mendapat konfirmasi pendaftaran berhasil |
| Post Kondisi | Pengunjung berhasil mendaftar sebagai santri baru |

**Tabel 4.3 Deskripsi Usecase Login Admin**

| Nama Use Case | Login Admin |
|---------------|-------------|
| Tujuan | Admin dapat mengakses sistem dengan cara menggunakan email dan password yang telah didaftarkan |
| Pre Kondisi | Admin harus sudah terdaftar dalam sistem dan memiliki akun |
| Kondisi Saat Gagal | Kembali ke halaman login |
| Aktor Utama | Admin |
| Arus utama / jalur dasar | 1. Admin membuka halaman login<br>2. Admin memasukkan email dan password<br>3. Sistem verifikasi kredensial<br>4. Jika kredensial valid, admin akan diarahkan ke dashboard admin<br>5. Jika kredensial tidak valid, sistem memberikan pesan eror |
| Post Kondisi | Admin berhasil masuk ke sistem |

**Tabel 4.4 Deskripsi Usecase Manajemen Berita**

| Nama Use Case | Manajemen Berita |
|---------------|------------------|
| Tujuan | Admin memiliki akses untuk mengelola data berita melalui halaman admin |
| Pre Kondisi | Admin harus sudah login |
| Kondisi Saat Gagal | - |
| Aktor Utama | Admin |
| Arus utama / jalur dasar | 1. Admin memilih menu Berita di navigasi<br>2. Admin menambah berita dengan memasukkan judul, konten, dan gambar<br>3. Admin mengedit berita yang sudah ada<br>4. Admin menghapus berita yang sudah tidak digunakan<br>5. Admin dapat publish/unpublish berita |
| Post Kondisi | Data berita berhasil diatur sesuai tindakan admin |

### b. Activity Diagram

**1. Activity Diagram Pendaftaran Santri**

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
│ Show Success│
│ Message     │
└─────────────┘
       │
       ▼
┌─────────────┐
│    End      │
└─────────────┘
```

**2. Activity Diagram Login Admin**

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

### c. Sequence Diagram

**1. Sequence Diagram Pendaftaran Santri**

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

**2. Sequence Diagram Login Admin**

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

### d. Entity Relationship Diagram

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

### e. Tabel Basis Data

Pada perancangan basis data untuk Sistem PPTB-BQ, terdapat beberapa tabel yang dirancang untuk menyimpan data terkait. Berikut ini deskripsi masing-masing tabel:

**1. Tabel Users**

| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | VARCHAR(255) | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE NOT NULL |
| name | VARCHAR(255) | |
| password | VARCHAR(255) | NOT NULL |
| role | ENUM('USER', 'ADMIN') | DEFAULT 'USER' |
| isVerified | BOOLEAN | DEFAULT false |
| isActive | BOOLEAN | DEFAULT true |
| lastLoginAt | TIMESTAMP | |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**2. Tabel Sessions**

| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | VARCHAR(255) | PRIMARY KEY |
| userId | VARCHAR(255) | FOREIGN KEY |
| token | VARCHAR(255) | UNIQUE NOT NULL |
| expiresAt | TIMESTAMP | NOT NULL |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**3. Tabel News**

| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | VARCHAR(255) | PRIMARY KEY |
| title | VARCHAR(255) | NOT NULL |
| content | TEXT | NOT NULL |
| imageUrl | VARCHAR(500) | |
| authorId | VARCHAR(255) | FOREIGN KEY |
| isPublished | BOOLEAN | DEFAULT false |
| publishedAt | TIMESTAMP | |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**4. Tabel Gallery**

| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | VARCHAR(255) | PRIMARY KEY |
| title | VARCHAR(255) | NOT NULL |
| imageUrl | VARCHAR(500) | NOT NULL |
| authorId | VARCHAR(255) | FOREIGN KEY |
| isPublished | BOOLEAN | DEFAULT false |
| publishedAt | TIMESTAMP | |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**5. Tabel Registrations**

| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | VARCHAR(255) | PRIMARY KEY |
| fullName | VARCHAR(255) | NOT NULL |
| nik | VARCHAR(255) | NOT NULL |
| birthPlace | VARCHAR(255) | NOT NULL |
| birthDate | DATE | NOT NULL |
| gender | VARCHAR(50) | NOT NULL |
| address | TEXT | NOT NULL |
| phoneNumber | VARCHAR(255) | NOT NULL |
| parentName | VARCHAR(255) | NOT NULL |
| parentPhone | VARCHAR(255) | NOT NULL |
| motivation | TEXT | NOT NULL |
| status | ENUM('PENDING', 'APPROVED', 'REJECTED') | DEFAULT 'PENDING' |
| notes | TEXT | |
| processedBy | VARCHAR(255) | FOREIGN KEY |
| processedAt | TIMESTAMP | |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**6. Tabel Prayers**

| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | VARCHAR(255) | PRIMARY KEY |
| title | VARCHAR(255) | NOT NULL |
| arabicText | TEXT | NOT NULL |
| latinText | TEXT | NOT NULL |
| translation | TEXT | NOT NULL |
| category | VARCHAR(255) | NOT NULL |
| authorId | VARCHAR(255) | FOREIGN KEY |
| isPublished | BOOLEAN | DEFAULT false |
| publishedAt | TIMESTAMP | |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### f. Perancangan Tampilan Antarmuka Sistem

Perancangan Tampilan Antarmuka meliputi tampilan dari sisi pengunjung dan juga tampilan sebagai admin. Rancangan Tampilan Antarmuka Sistem PPTB-BQ bisa dilihat pada gambar-gambar di bawah ini:

**1. Tampilan Pengunjung**

**Gambar 4.1 Tampilan Halaman Utama Pengunjung**

Pada halaman ini ditampilkan hero section dengan informasi utama pondok pesantren, visi misi, dan berita terbaru.

**Gambar 4.2 Tampilan Halaman Berita**

Pada halaman ini ditampilkan daftar berita pondok pesantren dengan pagination dan fitur pencarian.

**Gambar 4.3 Tampilan Halaman Galeri**

Pada halaman ini ditampilkan galeri foto kegiatan pondok pesantren dalam bentuk grid layout.

**Gambar 4.4 Tampilan Halaman Doa-doa**

Pada halaman ini ditampilkan kumpulan doa-doa Islam dengan kategori dan fitur pencarian.

**Gambar 4.5 Form Pendaftaran Santri**

Pada halaman ini terdapat form yang harus diisi pengunjung untuk melakukan pendaftaran santri baru.

**2. Tampilan Admin**

**Gambar 4.6 Tampilan Login Admin**

Admin wajib melakukan login dengan email dan password yang terdaftar.

**Gambar 4.7 Tampilan Dashboard Admin**

Tampilan Dashboard menyajikan beberapa data statistik yang berkaitan dengan sistem. Disamping juga terdapat sidebar yang berisi navigasi menu-menu yang ada.

**Gambar 4.8 Tampilan Halaman Manajemen Berita**

Pada halaman ini admin dapat mengelola data berita, baik menambah, mengedit maupun menghapus berita.

**Gambar 4.9 Tampilan Halaman Manajemen Galeri**

Halaman ini digunakan untuk admin mengelola data galeri foto, admin dapat menambahkan dan menghapusnya.

**Gambar 4.10 Tampilan Halaman Manajemen Doa-doa**

Pada halaman ini admin dapat menambahkan, mengedit dan menghapus data doa-doa.

**Gambar 4.11 Tampilan Daftar Pendaftaran**

Pada halaman ini, admin dapat memeriksa data pendaftaran santri, karena untuk pendaftaran perlu diupdate untuk statusnya apakah diterima atau ditolak.

## 4.4 Implementasi Sistem

Tahap Implementasi dilakukan dengan menggunakan framework Next.js yang memfasilitasi pengembangan aplikasi berbasis web. Beberapa komponen sistem yang telah diimplementasikan meliputi:

### 1. Beranda Pengunjung

**Gambar 4.12 Implementasi Beranda Pengunjung**

Pada sistem ini telah diimplementasikan dengan pengunjung dapat mengakses ini secara langsung tanpa login. Pada halaman beranda ini pengunjung dapat melihat hero section, visi misi, dan berita terbaru.

### 2. Pendaftaran Santri Pengunjung

**Gambar 4.13 Implementasi Form Pendaftaran**

Form Pendaftaran telah diimplementasikan dengan validasi data yang lengkap. Pengunjung dapat mengisi form pendaftaran dengan data yang diperlukan dan sistem akan memvalidasi input sebelum menyimpan ke database.

**Gambar 4.14 Implementasi Konfirmasi Pendaftaran**

Setelah pendaftaran berhasil, pengunjung akan mendapat konfirmasi bahwa pendaftaran telah diterima dan sedang dalam proses review.

### 3. Login Admin

**Gambar 4.15 Implementasi Login Admin**

Semua halaman admin hanya bisa diakses ketika sudah login menggunakan email dan password admin yang sesuai dengan yang terdaftar pada database.

### 4. Dashboard Admin

**Gambar 4.16 Implementasi Dashboard Admin**

Dashboard Admin telah diimplementasikan dengan menampilkan data statistik yang ada pada database seperti total pendaftar, berita, galeri, dan doa-doa.

### 5. Manajemen Konten

**Gambar 4.17 Implementasi Manajemen Berita**

Halaman berita telah diimplementasikan, dimana admin bisa mengelola data berita baik menghapus, menambahkan maupun mengeditnya.

**Gambar 4.18 Implementasi Manajemen Galeri**

Halaman galeri telah diimplementasikan dengan fitur upload gambar dan manajemen konten.

### 6. Manajemen Data Pendaftaran

**Gambar 4.19 Implementasi Manajemen Data Pendaftaran**

Data Pendaftaran dapat diakses oleh admin, fitur filter juga telah diimplementasikan, dengan data dapat ditampilkan sesuai dengan filter yang diterapkan.

**Gambar 4.20 Implementasi Update Status Pendaftaran**

Ketika data pendaftaran sesuai dan lengkap, admin sudah bisa melakukan update untuk status pendaftarannya menjadi diterima atau ditolak.

### 7. Fitur Logout

**Gambar 4.21 Implementasi Logout**

Fitur untuk logout admin juga telah diimplementasikan, ketika admin menekan tombol logout maka akan dikonfirmasi apakah benar ingin logout. Ketika sudah logout maka halaman akan dialihkan ke halaman login lagi.

## 4.5 Pengujian Sistem

Pengujian sistem dilakukan menggunakan metode Black box testing yang mengedepankan fungsionalitas sistem tanpa melihat ke dalam kode program. Pengujian dilakukan dengan memberikan input tertentu, kemudian mengevaluasi output yang dihasilkan apakah sesuai dengan harapan.

### a. Pengujian Pengunjung

**Tabel 4.5 Tabel Pengujian Pengunjung**

| No | Fitur yang diuji | Input | Langkah Uji | Output yang diharapkan | Hasil |
|----|------------------|-------|-------------|------------------------|-------|
| 1 | Melihat halaman utama | - | Akses halaman utama | Halaman utama ditampilkan lengkap | Berhasil |
| 2 | Melihat berita | Klik menu berita | Klik menu berita | Daftar berita ditampilkan | Berhasil |
| 3 | Melihat galeri | Klik menu galeri | Klik menu galeri | Galeri foto ditampilkan | Berhasil |
| 4 | Melihat doa-doa | Klik menu doa | Klik menu doa | Daftar doa ditampilkan | Berhasil |
| 5 | Form Pendaftaran | Data lengkap | Isi form dan klik "Daftar" | Data tersimpan & konfirmasi muncul | Berhasil |
| 6 | Validasi form | Data tidak lengkap | Isi form tidak lengkap | Pesan error muncul | Berhasil |

### b. Pengujian Admin

**Tabel 4.6 Tabel Pengujian Admin**

| No | Fitur yang diuji | Input | Langkah Uji | Output yang diharapkan | Hasil |
|----|------------------|-------|-------------|------------------------|-------|
| 1 | Login admin | Email & password valid | Isi form login dan submit | Masuk ke dashboard admin | Berhasil |
| 2 | Akses data pendaftaran | - | Klik menu "Pendaftaran" | Tabel pendaftaran muncul | Berhasil |
| 3 | Update status pendaftaran | Klik tombol update | Klik dropdown "Disetujui" | Status berubah menjadi "Disetujui" | Berhasil |
| 4 | Kelola berita | Tambah/Edit/Hapus berita | Isi form dan simpan | Data berita berubah di database | Berhasil |
| 5 | Kelola galeri | Upload gambar dan data | Tambah atau hapus galeri | Gambar tampil di galeri | Berhasil |
| 6 | Kelola doa-doa | Tambah/Edit/Hapus doa | Isi form dan simpan | Data doa berubah di database | Berhasil |

## 4.6 Hasil Evaluasi Sistem

Dari hasil pengujian dan implementasi, beberapa poin evaluasi yang berhasil dicapai adalah sebagai berikut:

### a. Peningkatan Efisiensi

Dengan diimplementasikannya Sistem PPTB-BQ berbasis website ini, proses pendaftaran santri menjadi lebih mudah dan juga lebih terstruktur untuk pencatatan datanya oleh pihak pengelola pondok pesantren.

### b. Akurasi Data

Sistem ini juga meningkatkan akurasi data pendaftaran, dimana kesalahan pencatatan yang sering terjadi karena kesalahan manusia pada saat pencatatan manual bisa diminimalisir dengan adanya otomatisasi.

### c. Kemudahan Akses

Pengunjung dan Pengelola dapat mengakses sistem ini dimana saja dan kapan saja melalui perangkat yang terhubung ke internet, sehingga memudahkan mereka untuk melakukan baik pendaftaran oleh pengunjung, maupun pengelolaan data oleh pihak pengelola pondok pesantren.

### d. Keamanan Sistem

Sistem telah mengimplementasikan keamanan yang baik dengan:
- Autentikasi JWT yang aman
- Password hashing dengan bcrypt
- Role-based access control
- Validasi input yang ketat
- Session management yang proper

### e. Performa Sistem

Sistem menunjukkan performa yang baik dengan:
- Response time < 3 detik
- Interface yang responsif
- Optimasi database dengan indexing
- Caching untuk konten statis

### f. Usabilitas

Sistem memiliki usabilitas yang baik dengan:
- Interface yang intuitif dan mudah dipahami
- Navigasi yang jelas
- Feedback yang informatif
- Error handling yang user-friendly
- Mobile-first design

---

**BAB IV ini dibuat berdasarkan implementasi sistem PPTB-BQ yang telah dikembangkan dengan teknologi Next.js, Prisma ORM, dan PostgreSQL.** 