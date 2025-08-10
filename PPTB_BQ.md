## 4.1 Analisis Pemakai

Pada tahap awal pengembangan sistem, dilakukan analisis pemakai untuk mengetahui siapa saja yang nantinya akan menggunakan sistem ini, selain itu juga diperlukan analisis untuk mengetahui kebutuhan dari pemakai itu sendiri. Setelah dilakukan analisis, sistem ini nantinya akan digunakan oleh 3 (tiga) pemakai dengan role dan akses yang berbeda.

### a. Pengunjung (Visitor)

Beberapa tujuan dan kebutuhan pengunjung yaitu:

**Tujuan:**

1. Melihat informasi pondok pesantren dan visi misi
2. Melihat berita dan galeri kegiatan pondok pesantren
3. Mempelajari doa-doa Islam
4. Melakukan pendaftaran santri baru
5. Mengecek status pendaftaran
6. Menghubungi pondok pesantren
7. Melihat statistik umum pondok pesantren

**Kebutuhan:**

1. Antarmuka mudah dipakai di smartphone dan komputer
2. Informasi lengkap dan terpercaya tentang pondok pesantren
3. Konten religius yang mudah diakses
4. Form pendaftaran yang mudah dipahami
5. Status pendaftaran yang jelas dan transparan
6. Informasi kontak yang mudah diakses
7. Statistik yang informatif dan mudah dipahami

### b. User (Registered User)

Beberapa tujuan dan kebutuhan user yang telah terdaftar yaitu:

**Tujuan:**

1. Mengakses dashboard pribadi
2. Melihat riwayat pendaftaran
3. Mengelola profil pribadi
4. Melakukan pendaftaran tambahan
5. Mengakses fitur terbatas sesuai role
6. Melihat berita dan galeri dengan akses khusus
7. Logout dari sistem dengan aman

**Kebutuhan:**

1. Dashboard yang informatif dan mudah dinavigasi
2. Akses ke fitur-fitur user yang relevan
3. Keamanan data pribadi
4. Interface yang konsisten dengan role
5. Akses terbatas ke konten tertentu
6. Kemampuan logout yang aman

### c. Admin (System Administrator)

Beberapa tujuan dan kebutuhan admin yaitu:

**Tujuan:**

1. Mengelola data berita pondok pesantren
2. Mengelola galeri foto kegiatan
3. Mengelola kumpulan doa-doa
4. Melihat dan mengelola pendaftaran santri baru
5. Mengelola data pengguna sistem
6. Menyediakan laporan dan statistik
7. Mengakses dashboard admin dengan statistik lengkap
8. Mengekspor laporan dalam berbagai format
9. Logout dari sistem dengan aman

**Kebutuhan:**

1. Dashboard admin yang aman dan mudah digunakan
2. Form input data yang user-friendly
3. Sistem manajemen konten yang terstruktur
4. Filter dan laporan yang rapi
5. Sistem autentikasi yang kuat
6. Akses penuh ke semua fitur sistem
7. Kemampuan export data dan laporan
8. Logout yang aman dan terverifikasi

## 4.2 Analisis Kebutuhan Sistem

Pada tahap ini dilakukan analisis kebutuhan sistem untuk memahami secara detail fitur-fitur yang harus disediakan oleh Sistem PPTB-BQ. Berdasarkan observasi dan analisis kebutuhan, beberapa kebutuhan sistem yang telah diidentifikasi meliputi:

### a. Kebutuhan Fungsional

**Pengunjung (Visitor):**

1. Melihat halaman utama dengan informasi pondok pesantren
2. Melihat berita pondok pesantren
3. Melihat galeri foto kegiatan
4. Mempelajari doa-doa Islam
5. Melakukan pendaftaran santri baru
6. Mengecek status pendaftaran
7. Melihat visi misi pondok pesantren
8. Menghubungi pondok pesantren
9. Melihat statistik umum pondok pesantren

**User (Registered User):**

1. Login dengan autentikasi yang aman
2. Mengakses dashboard pribadi
3. Melihat riwayat pendaftaran
4. Mengelola profil pribadi
5. Melakukan pendaftaran tambahan
6. Melihat berita dengan akses terbatas
7. Melihat galeri dengan akses terbatas
8. Logout dari sistem

**Admin (System Administrator):**

1. Login Admin dengan autentikasi yang aman
2. Mengakses dashboard admin dengan statistik lengkap
3. Mengelola data berita (Create, Read, Update, Delete)
4. Mengelola galeri foto kegiatan
5. Mengelola kumpulan doa-doa
6. Melihat dan mengelola data pendaftaran santri
7. Mengelola data pengguna sistem
8. Melihat statistik sistem secara detail
9. Export laporan dalam berbagai format
10. Logout dari sistem

**Sistem:**

1. Menghasilkan kode pendaftaran unik
2. Validasi data pendaftaran
3. Sistem autentikasi dengan JWT
4. Role-based access control (USER & ADMIN)
5. Session management
6. Data encryption dan security
7. Manajemen konten (publish/unpublish)
8. Backup dan recovery data

### b. Kebutuhan Non-Fungsional

Beberapa kebutuhan non-fungsional meliputi usability, performance, security, reliability dan scalability sebagai berikut:

**Usability:**

1. Antarmuka yang responsif (mobile-first design) untuk semua perangkat
2. Navigasi yang intuitif dan mudah dipahami untuk semua jenis pengguna
3. Konsistensi desain antar halaman dan komponen
4. Aksesibilitas yang baik untuk pengguna dengan kebutuhan khusus
5. Validasi data real-time untuk mencegah kesalahan input

**Performance:**

1. Response time yang cepat (< 3 detik) untuk semua operasi
2. Optimasi loading gambar dan konten multimedia
3. Lazy loading untuk konten yang tidak langsung diperlukan
4. Caching yang efektif untuk data statis dan dinamis
5. Database query yang dioptimasi dengan indexing

**Security:**

1. Autentikasi multi-level (Pengunjung, User, Admin) dengan JWT
2. Role-based access control (RBAC) yang ketat
3. Enkripsi data sensitif dan password hashing
4. Proteksi terhadap SQL injection, XSS, dan CSRF
5. Rate limiting untuk mencegah abuse
6. Session management yang aman
7. HTTPS enforcement untuk semua komunikasi

**Reliability:**

1. Uptime sistem yang tinggi (> 99.5%)
2. Backup data otomatis dan regular
3. Error handling yang komprehensif
4. Logging dan monitoring sistem
5. Recovery mechanism untuk kegagalan sistem

**Scalability:**

1. Arsitektur yang mendukung pertumbuhan pengguna
2. Database connection pooling
3. Load balancing capability
4. Microservices ready architecture
5. Horizontal scaling untuk komponen kritis

## 4.3 Perancangan Sistem

Pada tahap perancangan sistem dilakukan penyusunan arsitektur sistem yang mencakup alur proses bisnis, struktur basis data dan desain tampilan antarmuka pengguna. Beberapa langkah yang diambil dalam perancangan sistem adalah sebagai berikut:

### a. Use Case Diagram (Format UML Standar)

**Main Use Case Diagram - Semua Aktor:**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                    PPTB-BQ System                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│  Pengunjung │                    │    User     │                    │    Admin    │
└─────────────┘                    └─────────────┘                    └─────────────┘
       │                                 │                                 │
       │                                 │                                 │
       ▼                                 ▼                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                      Use Cases                                                                │
│                                                                                                                               │
│  ◉ Melihat Berita                    ◉ Login User                    ◉ Login Admin                                           │
│  ◉ Melihat Galeri                    ◉ Dashboard User                 ◉ Dashboard Admin                                       │
│  ◉ Melihat Doa-doa                   ◉ Lihat Riwayat Pendaftaran     ◉ Manajemen Berita                                     │
│  ◉ Pendaftaran Santri                ◉ Kelola Profil                 ◉ Manajemen Galeri                                     │
│  ◉ Melihat Visi Misi                 ◉ Pendaftaran Tambahan          ◉ Manajemen Doa-doa                                     │
│  ◉ Mengecek Status Pendaftaran       ◉ Logout                        ◉ Manajemen Pendaftaran                                 │
│  ◉ Kontak Pondok                     ◉ Lihat Berita Terbatas         ◉ Manajemen Pengguna                                   │
│  ◉ Lihat Statistik Publik            ◉ Lihat Galeri Terbatas         ◉ Lihat Statistik Sistem                               │
│                                                                                                                               │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Use Case Diagram Aktor Pengunjung:**

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
│  ◉ Kontak Pondok                                             │
│  ◉ Lihat Statistik Publik                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Use Case Diagram Aktor User (Registered):**

```
┌─────────────────────────────────────────────────────────────────┐
│                        PPTB-BQ System                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐
│    User     │
└─────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Use Cases                              │
│                                                               │
│  ◉ Login User                                                │
│  ◉ Dashboard User                                            │
│  ◉ Lihat Riwayat Pendaftaran                                 │
│  ◉ Kelola Profil                                             │
│  ◉ Pendaftaran Tambahan                                      │
│  ◉ Lihat Berita Terbatas                                     │
│  ◉ Lihat Galeri Terbatas                                     │
│  ◉ Logout                                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Use Case Diagram Aktor Admin:**

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
│  ◉ Dashboard Admin                                           │
│  ◉ Manajemen Berita                                          │
│  ◉ Manajemen Galeri                                          │
│  ◉ Manajemen Doa-doa                                         │
│  ◉ Manajemen Pendaftaran                                     │
│  ◉ Manajemen Pengguna                                        │
│  ◉ Lihat Statistik Sistem                                    │
│  ◉ Export Laporan                                            │
│  ◉ Logout                                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Deskripsi Use Case Lengkap:**

**Tabel 4.1 Deskripsi Use Case - Aktor Pengunjung**

| Nama Use Case            | Melihat Berita                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Pengunjung dapat melihat berita pondok pesantren di halaman utama dan halaman berita                                                                                |
| Pre Kondisi              | -                                                                                                                                                                   |
| Kondisi Saat Gagal       | -                                                                                                                                                                   |
| Aktor Utama              | Pengunjung                                                                                                                                                          |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman utama website<br>2. Pengunjung menggunakan navigasi untuk melihat berita<br>3. Pengunjung bisa memilih berita untuk melihat detailnya |
| Post Kondisi             | Pengunjung berhasil membuka halaman berita                                                                                                                          |

| Nama Use Case            | Melihat Galeri                                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Pengunjung dapat melihat galeri foto kegiatan pondok pesantren                                                              |
| Pre Kondisi              | -                                                                                                                           |
| Kondisi Saat Gagal       | -                                                                                                                           |
| Aktor Utama              | Pengunjung                                                                                                                  |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman galeri<br>2. Pengunjung melihat foto-foto kegiatan<br>3. Pengunjung dapat melihat detail foto |
| Post Kondisi             | Pengunjung berhasil melihat galeri foto                                                                                     |

| Nama Use Case            | Melihat Doa-doa                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Pengunjung dapat mempelajari doa-doa Islam yang tersedia                                                              |
| Pre Kondisi              | -                                                                                                                     |
| Kondisi Saat Gagal       | -                                                                                                                     |
| Aktor Utama              | Pengunjung                                                                                                            |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman doa-doa<br>2. Pengunjung melihat daftar doa<br>3. Pengunjung dapat membaca doa tertentu |
| Post Kondisi             | Pengunjung berhasil melihat doa-doa                                                                                   |

| Nama Use Case            | Pendaftaran Santri                                                                                                                                                                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Pengunjung dapat melakukan pendaftaran santri baru dengan mengisi form yang disediakan                                                                                                                                                                                                          |
| Pre Kondisi              | Pengunjung harus membuka halaman pendaftaran                                                                                                                                                                                                                                                    |
| Kondisi Saat Gagal       | Data tidak lengkap atau tidak valid                                                                                                                                                                                                                                                             |
| Aktor Utama              | Pengunjung                                                                                                                                                                                                                                                                                      |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman pendaftaran<br>2. Pengunjung mengisi form pendaftaran dengan data lengkap<br>3. Pengunjung menekan tombol submit<br>4. Sistem memvalidasi data pendaftaran<br>5. Data pendaftaran tersimpan di database<br>6. Pengunjung mendapat konfirmasi pendaftaran berhasil |
| Post Kondisi             | Pengunjung berhasil mendaftar sebagai santri baru                                                                                                                                                                                                                                               |

| Nama Use Case            | Melihat Visi Misi                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Pengunjung dapat melihat visi dan misi pondok pesantren                                                               |
| Pre Kondisi              | -                                                                                                                     |
| Kondisi Saat Gagal       | -                                                                                                                     |
| Aktor Utama              | Pengunjung                                                                                                            |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman utama<br>2. Pengunjung melihat section visi misi<br>3. Pengunjung membaca visi dan misi |
| Post Kondisi             | Pengunjung berhasil melihat visi misi                                                                                 |

| Nama Use Case            | Mengecek Status Pendaftaran                                                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Pengunjung dapat mengecek status pendaftaran yang telah dilakukan                                                                                                       |
| Pre Kondisi              | Pengunjung telah melakukan pendaftaran                                                                                                                                  |
| Kondisi Saat Gagal       | Data pendaftaran tidak ditemukan                                                                                                                                        |
| Aktor Utama              | Pengunjung                                                                                                                                                              |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman cek status<br>2. Pengunjung memasukkan kode pendaftaran<br>3. Sistem mencari data pendaftaran<br>4. Sistem menampilkan status pendaftaran |
| Post Kondisi             | Pengunjung berhasil melihat status pendaftaran                                                                                                                          |

| Nama Use Case            | Kontak Pondok                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Tujuan                   | Pengunjung dapat menghubungi pondok pesantren                                                                            |
| Pre Kondisi              | -                                                                                                                        |
| Kondisi Saat Gagal       | -                                                                                                                        |
| Aktor Utama              | Pengunjung                                                                                                               |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman kontak<br>2. Pengunjung melihat informasi kontak<br>3. Pengunjung dapat menghubungi pondok |
| Post Kondisi             | Pengunjung berhasil melihat informasi kontak                                                                             |

| Nama Use Case            | Lihat Statistik Publik                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------- |
| Tujuan                   | Pengunjung dapat melihat statistik umum pondok pesantren                               |
| Pre Kondisi              | -                                                                                      |
| Kondisi Saat Gagal       | -                                                                                      |
| Aktor Utama              | Pengunjung                                                                             |
| Arus utama / jalur dasar | 1. Pengunjung membuka halaman statistik<br>2. Pengunjung melihat data statistik publik |
| Post Kondisi             | Pengunjung berhasil melihat statistik                                                  |

**Tabel 4.2 Deskripsi Use Case - Aktor User (Registered)**

| Nama Use Case            | Login User                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | User dapat mengakses sistem dengan autentikasi yang aman                                                                                                                                                      |
| Pre Kondisi              | User harus sudah terdaftar dalam sistem                                                                                                                                                                       |
| Kondisi Saat Gagal       | Kredensial tidak valid                                                                                                                                                                                        |
| Aktor Utama              | User                                                                                                                                                                                                          |
| Arus utama / jalur dasar | 1. User membuka halaman login<br>2. User memasukkan email dan password<br>3. Sistem verifikasi kredensial<br>4. Jika valid, user diarahkan ke dashboard<br>5. Jika tidak valid, sistem memberikan pesan error |
| Post Kondisi             | User berhasil masuk ke sistem                                                                                                                                                                                 |

| Nama Use Case            | Dashboard User                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Tujuan                   | User dapat mengakses dashboard pribadi                                                                     |
| Pre Kondisi              | User harus sudah login                                                                                     |
| Kondisi Saat Gagal       | -                                                                                                          |
| Aktor Utama              | User                                                                                                       |
| Arus utama / jalur dasar | 1. User login ke sistem<br>2. Sistem menampilkan dashboard user<br>3. User dapat melihat informasi pribadi |
| Post Kondisi             | User berhasil mengakses dashboard                                                                          |

| Nama Use Case            | Lihat Riwayat Pendaftaran                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | User dapat melihat riwayat pendaftaran yang telah dilakukan                                                                      |
| Pre Kondisi              | User harus sudah login                                                                                                           |
| Kondisi Saat Gagal       | -                                                                                                                                |
| Aktor Utama              | User                                                                                                                             |
| Arus utama / jalur dasar | 1. User membuka menu riwayat pendaftaran<br>2. Sistem menampilkan daftar pendaftaran<br>3. User dapat melihat detail pendaftaran |
| Post Kondisi             | User berhasil melihat riwayat pendaftaran                                                                                        |

| Nama Use Case            | Kelola Profil                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| Tujuan                   | User dapat mengelola profil pribadi                                                        |
| Pre Kondisi              | User harus sudah login                                                                     |
| Kondisi Saat Gagal       | Data tidak valid                                                                           |
| Aktor Utama              | User                                                                                       |
| Arus utama / jalur dasar | 1. User membuka menu profil<br>2. User mengedit data profil<br>3. User menyimpan perubahan |
| Post Kondisi             | Profil user berhasil diperbarui                                                            |

| Nama Use Case            | Pendaftaran Tambahan                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| Tujuan                   | User dapat melakukan pendaftaran tambahan                                                             |
| Pre Kondisi              | User harus sudah login                                                                                |
| Kondisi Saat Gagal       | Data tidak lengkap                                                                                    |
| Aktor Utama              | User                                                                                                  |
| Arus utama / jalur dasar | 1. User membuka form pendaftaran<br>2. User mengisi data pendaftaran<br>3. User menyimpan pendaftaran |
| Post Kondisi             | Pendaftaran tambahan berhasil disimpan                                                                |

| Nama Use Case            | Lihat Berita Terbatas                                                  |
| ------------------------ | ---------------------------------------------------------------------- |
| Tujuan                   | User dapat melihat berita dengan akses terbatas                        |
| Pre Kondisi              | User harus sudah login                                                 |
| Kondisi Saat Gagal       | -                                                                      |
| Aktor Utama              | User                                                                   |
| Arus utama / jalur dasar | 1. User membuka halaman berita<br>2. User melihat berita yang tersedia |
| Post Kondisi             | User berhasil melihat berita                                           |

| Nama Use Case            | Lihat Galeri Terbatas                                                  |
| ------------------------ | ---------------------------------------------------------------------- |
| Tujuan                   | User dapat melihat galeri dengan akses terbatas                        |
| Pre Kondisi              | User harus sudah login                                                 |
| Kondisi Saat Gagal       | -                                                                      |
| Aktor Utama              | User                                                                   |
| Arus utama / jalur dasar | 1. User membuka halaman galeri<br>2. User melihat galeri yang tersedia |
| Post Kondisi             | User berhasil melihat galeri                                           |

| Nama Use Case            | Logout                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | User dapat keluar dari sistem dengan aman                                                                                           |
| Pre Kondisi              | User harus sudah login                                                                                                              |
| Kondisi Saat Gagal       | -                                                                                                                                   |
| Aktor Utama              | User                                                                                                                                |
| Arus utama / jalur dasar | 1. User memilih menu logout<br>2. Sistem mengkonfirmasi logout<br>3. Sistem menghapus session<br>4. User diarahkan ke halaman utama |
| Post Kondisi             | User berhasil keluar dari sistem                                                                                                    |

**Tabel 4.3 Deskripsi Use Case - Aktor Admin**

| Nama Use Case            | Login Admin                                                                                                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tujuan                   | Admin dapat mengakses sistem dengan cara menggunakan email dan password yang telah didaftarkan                                                                                                                                                   |
| Pre Kondisi              | Admin harus sudah terdaftar dalam sistem dan memiliki akun                                                                                                                                                                                       |
| Kondisi Saat Gagal       | Kembali ke halaman login                                                                                                                                                                                                                         |
| Aktor Utama              | Admin                                                                                                                                                                                                                                            |
| Arus utama / jalur dasar | 1. Admin membuka halaman login<br>2. Admin memasukkan email dan password<br>3. Sistem verifikasi kredensial<br>4. Jika kredensial valid, admin akan diarahkan ke dashboard admin<br>5. Jika kredensial tidak valid, sistem memberikan pesan eror |
| Post Kondisi             | Admin berhasil masuk ke sistem                                                                                                                                                                                                                   |

| Nama Use Case            | Dashboard Admin                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Tujuan                   | Admin dapat mengakses dashboard admin dengan statistik sistem                                                |
| Pre Kondisi              | Admin harus sudah login                                                                                      |
| Kondisi Saat Gagal       | -                                                                                                            |
| Aktor Utama              | Admin                                                                                                        |
| Arus utama / jalur dasar | 1. Admin login ke sistem<br>2. Sistem menampilkan dashboard admin<br>3. Admin dapat melihat statistik sistem |
| Post Kondisi             | Admin berhasil mengakses dashboard                                                                           |

| Nama Use Case            | Manajemen Berita                                                                                                                                                                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Admin memiliki akses untuk mengelola data berita melalui halaman admin                                                                                                                                                                                         |
| Pre Kondisi              | Admin harus sudah login                                                                                                                                                                                                                                        |
| Kondisi Saat Gagal       | -                                                                                                                                                                                                                                                              |
| Aktor Utama              | Admin                                                                                                                                                                                                                                                          |
| Arus utama / jalur dasar | 1. Admin memilih menu Berita di navigasi<br>2. Admin menambah berita dengan memasukkan judul, konten, dan gambar<br>3. Admin mengedit berita yang sudah ada<br>4. Admin menghapus berita yang sudah tidak digunakan<br>5. Admin dapat publish/unpublish berita |
| Post Kondisi             | Data berita berhasil diatur sesuai tindakan admin                                                                                                                                                                                                              |

| Nama Use Case            | Manajemen Galeri                                                                                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Admin dapat mengelola galeri foto kegiatan pondok pesantren                                                                                                                                                          |
| Pre Kondisi              | Admin harus sudah login                                                                                                                                                                                              |
| Kondisi Saat Gagal       | -                                                                                                                                                                                                                    |
| Aktor Utama              | Admin                                                                                                                                                                                                                |
| Arus utama / jalur dasar | 1. Admin memilih menu Galeri<br>2. Admin menambah foto dengan judul dan deskripsi<br>3. Admin mengedit foto yang sudah ada<br>4. Admin menghapus foto yang tidak diperlukan<br>5. Admin dapat publish/unpublish foto |
| Post Kondisi             | Galeri foto berhasil dikelola                                                                                                                                                                                        |

| Nama Use Case            | Manajemen Doa-doa                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Admin dapat mengelola kumpulan doa-doa Islam                                                                                                        |
| Pre Kondisi              | Admin harus sudah login                                                                                                                             |
| Kondisi Saat Gagal       | -                                                                                                                                                   |
| Aktor Utama              | Admin                                                                                                                                               |
| Arus utama / jalur dasar | 1. Admin memilih menu Doa-doa<br>2. Admin menambah doa baru<br>3. Admin mengedit doa yang sudah ada<br>4. Admin menghapus doa yang tidak diperlukan |
| Post Kondisi             | Kumpulan doa-doa berhasil dikelola                                                                                                                  |

| Nama Use Case            | Manajemen Pendaftaran                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tujuan                   | Admin dapat melihat dan mengelola data pendaftaran santri                                                                                                          |
| Pre Kondisi              | Admin harus sudah login                                                                                                                                            |
| Kondisi Saat Gagal       | -                                                                                                                                                                  |
| Aktor Utama              | Admin                                                                                                                                                              |
| Arus utama / jalur dasar | 1. Admin memilih menu Pendaftaran<br>2. Admin melihat daftar pendaftaran<br>3. Admin dapat approve/reject pendaftaran<br>4. Admin dapat melihat detail pendaftaran |
| Post Kondisi             | Data pendaftaran berhasil dikelola                                                                                                                                 |

| Nama Use Case            | Manajemen Pengguna                                                                                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Admin dapat mengelola data pengguna sistem                                                                                                                                                |
| Pre Kondisi              | Admin harus sudah login                                                                                                                                                                   |
| Kondisi Saat Gagal       | -                                                                                                                                                                                         |
| Aktor Utama              | Admin                                                                                                                                                                                     |
| Arus utama / jalur dasar | 1. Admin memilih menu Pengguna<br>2. Admin melihat daftar pengguna<br>3. Admin dapat menambah pengguna baru<br>4. Admin dapat mengedit data pengguna<br>5. Admin dapat menghapus pengguna |
| Post Kondisi             | Data pengguna berhasil dikelola                                                                                                                                                           |

| Nama Use Case            | Lihat Statistik Sistem                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Admin dapat melihat statistik lengkap sistem                                                                     |
| Pre Kondisi              | Admin harus sudah login                                                                                          |
| Kondisi Saat Gagal       | -                                                                                                                |
| Aktor Utama              | Admin                                                                                                            |
| Arus utama / jalur dasar | 1. Admin membuka dashboard admin<br>2. Admin melihat statistik sistem<br>3. Admin dapat melihat detail statistik |
| Post Kondisi             | Admin berhasil melihat statistik sistem                                                                          |

| Nama Use Case            | Export Laporan                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Admin dapat mengekspor laporan dalam berbagai format                                                                                    |
| Pre Kondisi              | Admin harus sudah login                                                                                                                 |
| Kondisi Saat Gagal       | -                                                                                                                                       |
| Aktor Utama              | Admin                                                                                                                                   |
| Arus utama / jalur dasar | 1. Admin memilih menu Export<br>2. Admin memilih jenis laporan<br>3. Admin memilih format export<br>4. Sistem menghasilkan file laporan |
| Post Kondisi             | Laporan berhasil diekspor                                                                                                               |

| Nama Use Case            | Logout                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Tujuan                   | Admin dapat keluar dari sistem dengan aman                                                                                            |
| Pre Kondisi              | Admin harus sudah login                                                                                                               |
| Kondisi Saat Gagal       | -                                                                                                                                     |
| Aktor Utama              | Admin                                                                                                                                 |
| Arus utama / jalur dasar | 1. Admin memilih menu logout<br>2. Sistem mengkonfirmasi logout<br>3. Sistem menghapus session<br>4. Admin diarahkan ke halaman login |
| Post Kondisi             | Admin berhasil keluar dari sistem                                                                                                     |

### b. Activity Diagram (Format UML Standar)

**1. Activity Diagram Alur Pendaftaran Santri (Pengunjung)**

```
┌─────────────┐                    ┌─────────────────────┐
│  Pengunjung │                    │      Sistem         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Buka Halaman Pendaftaran──────►│
       │                                   │
       │                                   │───Tampilkan Form───┐
       │                                   │                    │
       │                                   │◄───Form Pendaftaran│
       │                                   │                    │
       │───Isi Form Pendaftaran──────────►│                    │
       │                                   │                    │
       │                                   │───Validasi Data───►│
       │                                   │                    │
       │                                   │◄───Data Valid?────│
       │                                   │                    │
       │                                   │───Simpan ke DB───►│
       │                                   │                    │
       │                                   │◄───Sukses Simpan──│
       │                                   │                    │
       │◄───Pesan Sukses──────────────────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

**2. Activity Diagram Alur Login User (Registered)**

```
┌─────────────┐                    ┌─────────────────────┐
│     User    │                    │      Sistem         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Buka Halaman Login────────────►│
       │                                   │
       │                                   │───Tampilkan Form───┐
       │                                   │                    │
       │                                   │◄───Form Login──────│
       │                                   │                    │
       │───Masukkan Email & Password─────►│                    │
       │                                   │                    │
       │                                   │───Verifikasi──────►│
       │                                   │                    │
       │                                   │◄───Kredensial Valid?│
       │                                   │                    │
       │                                   │───Periksa Role────►│
       │                                   │                    │
       │                                   │◄───Role = USER?────│
       │                                   │                    │
       │                                   │───Buat JWT Token──►│
       │                                   │                    │
       │                                   │◄───Token Dibuat────│
       │                                   │                    │
       │◄───Redirect ke Dashboard User────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

**3. Activity Diagram Alur Login Admin**

```
┌─────────────┐                    ┌─────────────────────┐
│    Admin    │                    │      Sistem         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Buka Halaman Login────────────►│
       │                                   │
       │                                   │───Tampilkan Form───┐
       │                                   │                    │
       │                                   │◄───Form Login──────│
       │                                   │                    │
       │───Masukkan Email & Password─────►│                    │
       │                                   │                    │
       │                                   │───Verifikasi──────►│
       │                                   │                    │
       │                                   │◄───Kredensial Valid?│
       │                                   │                    │
       │                                   │───Periksa Role────►│
       │                                   │                    │
       │                                   │◄───Role = ADMIN?───│
       │                                   │                    │
       │                                   │───Buat JWT Token──►│
       │                                   │                    │
       │                                   │◄───Token Dibuat────│
       │                                   │                    │
       │◄───Redirect ke Dashboard Admin───│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

**4. Activity Diagram Alur Manajemen Berita (Admin)**

```
┌─────────────┐                    ┌─────────────────────┐
│    Admin    │                    │      Sistem         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Login sebagai Admin────────────►│
       │                                   │
       │                                   │───Verifikasi Login───┐
       │                                   │                    │
       │                                   │◄───Login Berhasil───│
       │                                   │                    │
       │───Akses Menu Manajemen Berita────►│                    │
       │                                   │                    │
       │                                   │───Tampilkan Menu───►│
       │                                   │                    │
       │                                   │◄───Menu Berita─────│
       │                                   │                    │
       │───Pilih Aksi (Tambah/Edit/Hapus)►│                    │
       │                                   │                    │
       │                                   │───Proses Aksi─────►│
       │                                   │                    │
       │                                   │◄───Aksi Diproses──│
       │                                   │                    │
       │───Input Data Berita─────────────►│                    │
       │                                   │                    │
       │                                   │───Validasi Data───►│
       │                                   │                    │
       │                                   │◄───Data Valid?────│
       │                                   │                    │
       │                                   │───Simpan ke DB───►│
       │                                   │                    │
       │                                   │◄───Data Tersimpan─│
       │                                   │                    │
       │◄───Pesan Sukses──────────────────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

**5. Activity Diagram Alur Pendaftaran Tambahan (User)**

```
┌─────────────┐                    ┌─────────────────────┐
│     User    │                    │      Sistem         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Login sebagai User─────────────►│
       │                                   │
       │                                   │───Verifikasi Login───┐
       │                                   │                    │
       │                                   │◄───Login Berhasil───│
       │                                   │                    │
       │───Akses Menu Pendaftaran────────►│                    │
       │                                   │                    │
       │                                   │───Tampilkan Menu───►│
       │                                   │                    │
       │                                   │◄───Menu Pendaftaran│
       │                                   │                    │
       │───Isi Form Pendaftaran Baru─────►│                    │
       │                                   │                    │
       │                                   │───Validasi Data───►│
       │                                   │                    │
       │                                   │◄───Data Valid?────│
       │                                   │                    │
       │                                   │───Simpan ke DB───►│
       │                                   │                    │
       │                                   │◄───Data Tersimpan│
       │                                   │                    │
       │◄───Pesan Sukses──────────────────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

### c. Sequence Diagram (Format UML Standar)

**Pengertian Sequence Diagram:**
Sequence Diagram adalah diagram UML yang menggambarkan interaksi antar objek dalam sistem secara berurutan waktu. Diagram ini menunjukkan bagaimana objek-objek berkomunikasi satu sama lain dalam skenario tertentu, termasuk pesan yang dikirim dan diterima, serta urutan eksekusi operasi.

**1. Sequence Diagram Alur Pendaftaran Santri (Pengunjung)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  PENGUNJUNG │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Website────►│                   │                   │
       │                   │                   │                   │
       │──Klik Pendaftaran►│                   │                   │
       │                   │──GET /registration│                   │
       │                   │                   │                   │
       │                   │◄──Form Pendaftaran│                   │
       │◄──Tampilkan Form──│                   │                   │
       │                   │                   │                   │
       │──Isi Data Form───►│                   │                   │
       │                   │                   │                   │
       │──Submit Form─────►│                   │                   │
       │                   │──POST /registration│                   │
       │                   │                   │──Validasi Data───►│
       │                   │                   │                   │
       │                   │                   │◄──Data Valid─────│
       │                   │                   │                   │
       │                   │                   │──Simpan Data────►│
       │                   │                   │                   │
       │                   │                   │◄──Sukses Simpan──│
       │                   │                   │                   │
       │                   │◄──Response Sukses│                   │
       │                   │                   │                   │
       │◄──Konfirmasi──────│                   │                   │
       │                   │                   │                   │
```

**2. Sequence Diagram Alur Login User (Registered)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│     USER    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Halaman Login►│                   │                   │
       │                   │                   │                   │
       │──Input Email─────►│                   │                   │
       │──Input Password──►│                   │                   │
       │                   │                   │                   │
       │──Klik Login─────►│                   │                   │
       │                   │──POST /auth/login─│                   │
       │                   │                   │──Cari User───────►│
       │                   │                   │                   │
       │                   │                   │◄──Data User──────│
       │                   │                   │                   │
       │                   │                   │──Validasi Password│
       │                   │                   │                   │
       │                   │                   │◄──Password Valid─│
       │                   │                   │                   │
       │                   │                   │──Buat JWT Token──│
       │                   │                   │                   │
       │                   │                   │──Simpan Session──│
       │                   │                   │                   │
       │                   │                   │◄──Session Tersimpan│
       │                   │                   │                   │
       │                   │◄──JWT Token──────│                   │
       │                   │                   │                   │
       │◄──Login Sukses───│                   │                   │
       │                   │                   │                   │
       │──Redirect Dashboard│                   │                   │
       │                   │                   │                   │
```

**3. Sequence Diagram Alur Login Admin**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    ADMIN    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Halaman Login►│                   │                   │
       │                   │                   │                   │
       │──Input Email─────►│                   │                   │
       │──Input Password──►│                   │                   │
       │                   │                   │                   │
       │──Klik Login─────►│                   │                   │
       │                   │──POST /auth/login─│                   │
       │                   │                   │──Cari User───────►│
       │                   │                   │                   │
       │                   │                   │◄──Data User──────│
       │                   │                   │                   │
       │                   │                   │──Validasi Password│
       │                   │                   │                   │
       │                   │                   │◄──Password Valid─│
       │                   │                   │                   │
       │                   │                   │──Cek Role Admin──│
       │                   │                   │                   │
       │                   │                   │◄──Role Admin Valid│
       │                   │                   │                   │
       │                   │                   │──Buat JWT Token──│
       │                   │                   │                   │
       │                   │                   │──Simpan Session──│
       │                   │                   │                   │
       │                   │                   │◄──Session Tersimpan│
       │                   │                   │                   │
       │                   │◄──JWT Token──────│                   │
       │                   │                   │                   │
       │◄──Login Sukses───│                   │                   │
       │                   │                   │                   │
       │──Redirect Dashboard Admin│                   │                   │
       │                   │                   │                   │
```

**4. Sequence Diagram Alur Manajemen Berita (Admin)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    ADMIN    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Dashboard Admin►│                   │                   │
       │                   │                   │                   │
       │──Klik Menu Berita►│                   │                   │
       │                   │──GET /api/news────│                   │
       │                   │                   │──Query Berita────►│
       │                   │                   │                   │
       │                   │                   │◄──Data Berita────│
       │                   │                   │                   │
       │                   │◄──List Berita────│                   │
       │                   │                   │                   │
       │◄──Tampilkan Berita│                   │                   │
       │                   │                   │                   │
       │──Klik Tambah Berita►│                   │                   │
       │                   │──GET /api/news/new│                   │
       │                   │                   │                   │
       │                   │◄──Form Berita────│                   │
       │◄──Tampilkan Form──│                   │                   │
       │                   │                   │                   │
       │──Isi Form Berita─►│                   │                   │
       │                   │                   │                   │
       │──Upload Gambar───►│                   │──Upload ke Storage│
       │                   │                   │                   │
       │                   │                   │◄──URL Gambar─────│
       │                   │                   │                   │
       │──Submit Form─────►│                   │                   │
       │                   │──POST /api/news──│                   │
       │                   │                   │──Simpan Berita──►│
       │                   │                   │                   │
       │                   │                   │◄──Berita Tersimpan│
       │                   │                   │                   │
       │                   │◄──Response Sukses│                   │
       │                   │                   │                   │
       │◄──Konfirmasi Sukses│                   │                   │
       │                   │                   │                   │
```

**5. Sequence Diagram Alur Pendaftaran Tambahan (User)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│     USER    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Login ke Sistem──►│                   │                   │
       │                   │                   │                   │
       │──Buka Dashboard──►│                   │                   │
       │                   │──GET /api/user/me─│                   │
       │                   │                   │──Cek Autentikasi►│
       │                   │                   │                   │
       │                   │                   │◄──User Terverifikasi│
       │                   │                   │                   │
       │                   │◄──Data User──────│                   │
       │                   │                   │                   │
       │◄──Tampilkan Dashboard│                   │                   │
       │                   │                   │                   │
       │──Klik Pendaftaran Tambahan►│                   │                   │
       │                   │──GET /api/registration/new│                   │
       │                   │                   │                   │
       │                   │◄──Form Pendaftaran│                   │
       │◄──Tampilkan Form──│                   │                   │
       │                   │                   │                   │
       │──Isi Form Data───►│                   │                   │
       │                   │                   │                   │
       │──Submit Form─────►│                   │                   │
       │                   │──POST /api/registration│                   │
       │                   │                   │──Validasi Data───►│
       │                   │                   │                   │
       │                   │                   │◄──Data Valid─────│
       │                   │                   │                   │
       │                   │                   │──Simpan Data────►│
       │                   │                   │                   │
       │                   │                   │◄──Data Tersimpan─│
       │                   │                   │                   │
       │                   │◄──Response Sukses│                   │
       │                   │                   │                   │
       │◄──Konfirmasi Sukses│                   │                   │
       │                   │                   │                   │
```

**6. Sequence Diagram Alur Cek Status Pendaftaran (Pengunjung)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  PENGUNJUNG │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Website────►│                   │                   │
       │                   │                   │                   │
       │──Klik Cek Status►│                   │                   │
       │                   │──GET /api/status-check│                   │
       │                   │                   │                   │
       │                   │◄──Form Cek Status│                   │
       │◄──Tampilkan Form──│                   │                   │
       │                   │                   │                   │
       │──Input NIK/Email─►│                   │                   │
       │                   │                   │                   │
       │──Klik Cek Status►│                   │                   │
       │                   │──POST /api/status-check│                   │
       │                   │                   │──Cari Data───────►│
       │                   │                   │                   │
       │                   │                   │◄──Data Ditemukan│
       │                   │                   │                   │
       │                   │◄──Status Pendaftaran│                   │
       │                   │                   │                   │
       │◄──Tampilkan Status│                   │                   │
       │                   │                   │                   │
```

**7. Sequence Diagram Alur Manajemen Galeri (Admin)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    ADMIN    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Dashboard Admin►│                   │                   │
       │                   │                   │                   │
       │──Klik Menu Galeri►│                   │                   │
       │                   │──GET /api/gallery│                   │
       │                   │                   │──Query Galeri────►│
       │                   │                   │                   │
       │                   │                   │◄──Data Galeri────│
       │                   │                   │                   │
       │                   │◄──List Galeri────│                   │
       │                   │                   │                   │
       │◄──Tampilkan Galeri│                   │                   │
       │                   │                   │                   │
       │──Klik Tambah Foto►│                   │                   │
       │                   │──GET /api/gallery/new│                   │
       │                   │                   │                   │
       │                   │◄──Form Upload────│                   │
       │◄──Tampilkan Form──│                   │                   │
       │                   │                   │                   │
       │──Pilih File Gambar►│                   │                   │
       │──Input Judul─────►│                   │                   │
       │                   │                   │                   │
       │──Submit Form─────►│                   │                   │
       │                   │──POST /api/gallery│                   │
       │                   │                   │──Upload Gambar──►│
       │                   │                   │                   │
       │                   │                   │◄──Gambar Tersimpan│
       │                   │                   │                   │
       │                   │                   │──Simpan Data Galeri│
       │                   │                   │                   │
       │                   │                   │◄──Data Tersimpan─│
       │                   │                   │                   │
       │                   │◄──Response Sukses│                   │
       │                   │                   │                   │
       │◄──Konfirmasi Sukses│                   │                   │
       │                   │                   │                   │
```

**8. Sequence Diagram Alur Manajemen Doa-doa (Admin)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    ADMIN    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Dashboard Admin►│                   │                   │
       │                   │                   │                   │
       │──Klik Menu Doa───►│                   │                   │
       │                   │──GET /api/prayers│                   │
       │                   │                   │──Query Doa-doa──►│
       │                   │                   │                   │
       │                   │                   │◄──Data Doa-doa──│
       │                   │                   │                   │
       │                   │◄──List Doa-doa──│                   │
       │                   │                   │                   │
       │◄──Tampilkan Doa-doa│                   │                   │
       │                   │                   │                   │
       │──Klik Tambah Doa─►│                   │                   │
       │                   │──GET /api/prayers/new│                   │
       │                   │                   │                   │
       │                   │◄──Form Doa──────│                   │
       │◄──Tampilkan Form──│                   │                   │
       │                   │                   │                   │
       │──Input Judul Doa──►│                   │                   │
       │──Input Teks Arab─►│                   │                   │
       │──Input Teks Latin►│                   │                   │
       │──Input Terjemahan►│                   │                   │
       │──Pilih Kategori──►│                   │                   │
       │                   │                   │                   │
       │──Submit Form─────►│                   │                   │
       │                   │──POST /api/prayers│                   │
       │                   │                   │──Validasi Data──►│
       │                   │                   │                   │
       │                   │                   │◄──Data Valid─────│
       │                   │                   │                   │
       │                   │                   │──Simpan Doa─────►│
       │                   │                   │                   │
       │                   │                   │◄──Doa Tersimpan─│
       │                   │                   │                   │
       │                   │◄──Response Sukses│                   │
       │                   │                   │                   │
       │◄──Konfirmasi Sukses│                   │                   │
       │                   │                   │                   │
```

**9. Sequence Diagram Alur Manajemen Pendaftaran (Admin)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    ADMIN    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Buka Dashboard Admin►│                   │                   │
       │                   │                   │                   │
       │──Klik Menu Pendaftaran►│                   │                   │
       │                   │──GET /api/registrations│                   │
       │                   │                   │──Query Pendaftaran►│
       │                   │                   │                   │
       │                   │                   │◄──Data Pendaftaran│
       │                   │                   │                   │
       │                   │◄──List Pendaftaran│                   │
       │                   │                   │                   │
       │◄──Tampilkan Pendaftaran│                   │                   │
       │                   │                   │                   │
       │──Pilih Pendaftaran►│                   │                   │
       │                   │──GET /api/registrations/[id]│                   │
       │                   │                   │──Query Detail────►│
       │                   │                   │                   │
       │                   │                   │◄──Detail Data────│
       │                   │                   │                   │
       │                   │◄──Detail Pendaftaran│                   │
       │                   │                   │                   │
       │◄──Tampilkan Detail│                   │                   │
       │                   │                   │                   │
       │──Klik Approve/Reject►│                   │                   │
       │                   │──PUT /api/registrations/[id]│                   │
       │                   │                   │──Update Status──►│
       │                   │                   │                   │
       │                   │                   │◄──Status Updated─│
       │                   │                   │                   │
       │                   │◄──Response Sukses│                   │
       │                   │                   │                   │
       │◄──Konfirmasi Update│                   │                   │
       │                   │                   │                   │
```

**10. Sequence Diagram Alur Logout (User/Admin)**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ USER/ADMIN  │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Klik Menu Logout►│                   │                   │
       │                   │                   │                   │
       │──Konfirmasi Logout►│                   │                   │
       │                   │──POST /auth/logout│                   │
       │                   │                   │──Validasi Token──│
       │                   │                   │                   │
       │                   │                   │◄──Token Valid────│
       │                   │                   │                   │
       │                   │                   │──Hapus Session──►│
       │                   │                   │                   │
       │                   │                   │◄──Session Terhapus│
       │                   │                   │                   │
       │                   │                   │──Invalidate JWT──│
       │                   │                   │                   │
       │                   │                   │◄──JWT Invalidated│
       │                   │                   │                   │
       │                   │◄──Response Sukses│                   │
       │                   │                   │                   │
       │◄──Logout Sukses──│                   │                   │
       │                   │                   │                   │
       │──Redirect ke Home│                   │                   │
       │                   │                   │                   │
```

**11. Sequence Diagram Alur Dashboard Admin**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    ADMIN    │    │  FRONTEND   │    │   BACKEND   │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │──Login ke Sistem──►│                   │                   │
       │                   │                   │                   │
       │──Akses Dashboard──►│                   │                   │
       │                   │──GET /api/admin/dashboard│                   │
       │                   │                   │──Validasi Admin──│
       │                   │                   │                   │
       │                   │                   │◄──Admin Valid────│
       │                   │                   │                   │
       │                   │                   │──Query Statistik►│
       │                   │                   │                   │
       │                   │                   │──Count Users────►│
       │                   │                   │──Count News─────►│
       │                   │                   │──Count Gallery──►│
       │                   │                   │──Count Prayers──►│
       │                   │                   │──Count Registrations►│
       │                   │                   │                   │
       │                   │                   │◄──Data Statistik│
       │                   │                   │                   │
       │                   │◄──Dashboard Data─│                   │
       │                   │                   │                   │
       │◄──Tampilkan Dashboard│                   │                   │
       │                   │                   │                   │
       │──Interaksi Menu──►│                   │                   │
       │                   │                   │                   │
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

| Nama Kolom  | Tipe Data             | Keterangan                |
| ----------- | --------------------- | ------------------------- |
| id          | VARCHAR(255)          | PRIMARY KEY               |
| email       | VARCHAR(255)          | UNIQUE NOT NULL           |
| name        | VARCHAR(255)          |                           |
| password    | VARCHAR(255)          | NOT NULL                  |
| role        | ENUM('USER', 'ADMIN') | DEFAULT 'USER'            |
| isVerified  | BOOLEAN               | DEFAULT false             |
| isActive    | BOOLEAN               | DEFAULT true              |
| lastLoginAt | TIMESTAMP             |                           |
| createdAt   | TIMESTAMP             | DEFAULT CURRENT_TIMESTAMP |
| updatedAt   | TIMESTAMP             | DEFAULT CURRENT_TIMESTAMP |

**2. Tabel Sessions**

| Nama Kolom | Tipe Data    | Keterangan                |
| ---------- | ------------ | ------------------------- |
| id         | VARCHAR(255) | PRIMARY KEY               |
| userId     | VARCHAR(255) | FOREIGN KEY               |
| token      | VARCHAR(255) | UNIQUE NOT NULL           |
| expiresAt  | TIMESTAMP    | NOT NULL                  |
| createdAt  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

**3. Tabel News**

| Nama Kolom  | Tipe Data    | Keterangan                |
| ----------- | ------------ | ------------------------- |
| id          | VARCHAR(255) | PRIMARY KEY               |
| title       | VARCHAR(255) | NOT NULL                  |
| content     | TEXT         | NOT NULL                  |
| imageUrl    | VARCHAR(500) |                           |
| authorId    | VARCHAR(255) | FOREIGN KEY               |
| isPublished | BOOLEAN      | DEFAULT false             |
| publishedAt | TIMESTAMP    |                           |
| createdAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updatedAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

**4. Tabel Gallery**

| Nama Kolom  | Tipe Data    | Keterangan                |
| ----------- | ------------ | ------------------------- |
| id          | VARCHAR(255) | PRIMARY KEY               |
| title       | VARCHAR(255) | NOT NULL                  |
| imageUrl    | VARCHAR(500) | NOT NULL                  |
| authorId    | VARCHAR(255) | FOREIGN KEY               |
| isPublished | BOOLEAN      | DEFAULT false             |
| publishedAt | TIMESTAMP    |                           |
| createdAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updatedAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

**5. Tabel Registrations**

| Nama Kolom  | Tipe Data                               | Keterangan                |
| ----------- | --------------------------------------- | ------------------------- |
| id          | VARCHAR(255)                            | PRIMARY KEY               |
| fullName    | VARCHAR(255)                            | NOT NULL                  |
| nik         | VARCHAR(255)                            | NOT NULL                  |
| birthPlace  | VARCHAR(255)                            | NOT NULL                  |
| birthDate   | DATE                                    | NOT NULL                  |
| gender      | VARCHAR(50)                             | NOT NULL                  |
| address     | TEXT                                    | NOT NULL                  |
| phoneNumber | VARCHAR(255)                            | NOT NULL                  |
| parentName  | VARCHAR(255)                            | NOT NULL                  |
| parentPhone | VARCHAR(255)                            | NOT NULL                  |
| motivation  | TEXT                                    | NOT NULL                  |
| status      | ENUM('PENDING', 'APPROVED', 'REJECTED') | DEFAULT 'PENDING'         |
| notes       | TEXT                                    |                           |
| processedBy | VARCHAR(255)                            | FOREIGN KEY               |
| processedAt | TIMESTAMP                               |                           |
| createdAt   | TIMESTAMP                               | DEFAULT CURRENT_TIMESTAMP |
| updatedAt   | TIMESTAMP                               | DEFAULT CURRENT_TIMESTAMP |

**6. Tabel Prayers**

| Nama Kolom  | Tipe Data    | Keterangan                |
| ----------- | ------------ | ------------------------- |
| id          | VARCHAR(255) | PRIMARY KEY               |
| title       | VARCHAR(255) | NOT NULL                  |
| arabicText  | TEXT         | NOT NULL                  |
| latinText   | TEXT         | NOT NULL                  |
| translation | TEXT         | NOT NULL                  |
| category    | VARCHAR(255) | NOT NULL                  |
| authorId    | VARCHAR(255) | FOREIGN KEY               |
| isPublished | BOOLEAN      | DEFAULT false             |
| publishedAt | TIMESTAMP    |                           |
| createdAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updatedAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

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

| No  | Fitur yang diuji      | Input              | Langkah Uji                | Output yang diharapkan             | Hasil    |
| --- | --------------------- | ------------------ | -------------------------- | ---------------------------------- | -------- |
| 1   | Melihat halaman utama | -                  | Akses halaman utama        | Halaman utama ditampilkan lengkap  | Berhasil |
| 2   | Melihat berita        | Klik menu berita   | Klik menu berita           | Daftar berita ditampilkan          | Berhasil |
| 3   | Melihat galeri        | Klik menu galeri   | Klik menu galeri           | Galeri foto ditampilkan            | Berhasil |
| 4   | Melihat doa-doa       | Klik menu doa      | Klik menu doa              | Daftar doa ditampilkan             | Berhasil |
| 5   | Form Pendaftaran      | Data lengkap       | Isi form dan klik "Daftar" | Data tersimpan & konfirmasi muncul | Berhasil |
| 6   | Validasi form         | Data tidak lengkap | Isi form tidak lengkap     | Pesan error muncul                 | Berhasil |

### b. Pengujian Admin

**Tabel 4.6 Tabel Pengujian Admin**

| No  | Fitur yang diuji          | Input                    | Langkah Uji               | Output yang diharapkan             | Hasil    |
| --- | ------------------------- | ------------------------ | ------------------------- | ---------------------------------- | -------- |
| 1   | Login admin               | Email & password valid   | Isi form login dan submit | Masuk ke dashboard admin           | Berhasil |
| 2   | Akses data pendaftaran    | -                        | Klik menu "Pendaftaran"   | Tabel pendaftaran muncul           | Berhasil |
| 3   | Update status pendaftaran | Klik tombol update       | Klik dropdown "Disetujui" | Status berubah menjadi "Disetujui" | Berhasil |
| 4   | Kelola berita             | Tambah/Edit/Hapus berita | Isi form dan simpan       | Data berita berubah di database    | Berhasil |
| 5   | Kelola galeri             | Upload gambar dan data   | Tambah atau hapus galeri  | Gambar tampil di galeri            | Berhasil |
| 6   | Kelola doa-doa            | Tambah/Edit/Hapus doa    | Isi form dan simpan       | Data doa berubah di database       | Berhasil |

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
