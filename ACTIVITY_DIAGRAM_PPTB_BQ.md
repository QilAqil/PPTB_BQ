# Activity Diagram Sistem PPTB-BQ

## 1. Activity Diagram Alur Utama Sistem (Main Flow)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                    SISTEM PPTB-BQ                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│  PENGUNJUNG │                    │    USER     │                    │    ADMIN    │
└─────────────┘                    └─────────────┘                    └─────────────┘
       │                                 │                                 │
       │                                 │                                 │
       ▼                                 ▼                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                      ALUR PROSES                                                              │
│                                                                                                                               │
│  ◉ Buka Website                    ◉ Login ke Sistem              ◉ Login ke Sistem                                           │
│  ◉ Lihat Berita                    ◉ Akses Dashboard              ◉ Akses Dashboard Admin                                     │
│  ◉ Lihat Galeri                    ◉ Lihat Riwayat                ◉ Kelola Berita                                             │
│  ◉ Lihat Doa-doa                   ◉ Kelola Profil                ◉ Kelola Galeri                                             │
│  ◉ Pendaftaran Santri              ◉ Pendaftaran Tambahan         ◉ Kelola Doa-doa                                             │
│  ◉ Lihat Visi Misi                 ◉ Lihat Konten Terbatas        ◉ Kelola Pendaftaran                                         │
│  ◉ Cek Status Pendaftaran          ◉ Logout                       ◉ Kelola Pengguna                                            │
│  ◉ Kontak Pondok                   ◉ Akses Fitur User             ◉ Lihat Statistik Sistem                                     │
│  ◉ Lihat Statistik Publik          ◉ Update Data Pribadi          ◉ Export Laporan                                              │
│                                                                                                                               │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## 2. Activity Diagram Alur Pendaftaran Santri (Pengunjung)

```
┌─────────────┐                    ┌─────────────────────┐
│  PENGUNJUNG │                    │      SISTEM         │
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

## 3. Activity Diagram Alur Login User (Registered)

```
┌─────────────┐                    ┌─────────────────────┐
│     USER    │                    │      SISTEM         │
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

## 4. Activity Diagram Alur Login Admin

```
┌─────────────┐                    ┌─────────────────────┐
│    ADMIN    │                    │      SISTEM         │
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

## 5. Activity Diagram Alur Manajemen Berita (Admin)

```
┌─────────────┐                    ┌─────────────────────┐
│    ADMIN    │                    │      SISTEM         │
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

## 6. Activity Diagram Alur Pendaftaran Tambahan (User)

```
┌─────────────┐                    ┌─────────────────────┐
│     USER    │                    │      SISTEM         │
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

## 7. Activity Diagram Alur Cek Status Pendaftaran

```
┌─────────────┐                    ┌─────────────────────┐
│  PENGUNJUNG │                    │      SISTEM         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Buka Halaman Cek Status───────►│
       │                                   │
       │                                   │───Tampilkan Form───┐
       │                                   │                    │
       │                                   │◄───Form Cek Status │
       │                                   │                    │
       │───Masukkan Kode Pendaftaran─────►│                    │
       │                                   │                    │
       │                                   │───Cari Data───────►│
       │                                   │                    │
       │                                   │◄───Data Ditemukan?│
       │                                   │                    │
       │                                   │───Tampilkan Status►│
       │                                   │                    │
       │◄───Status Pendaftaran────────────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

## 8. Activity Diagram Alur Manajemen Galeri (Admin)

```
┌─────────────┐                    ┌─────────────────────┐
│    ADMIN    │                    │      SISTEM         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Login sebagai Admin────────────►│
       │                                   │
       │                                   │───Verifikasi Login───┐
       │                                   │                    │
       │                                   │◄───Login Berhasil───│
       │                                   │                    │
       │───Akses Menu Manajemen Galeri────►│                    │
       │                                   │                    │
       │                                   │───Tampilkan Menu───►│
       │                                   │                    │
       │                                   │◄───Menu Galeri─────│
       │                                   │                    │
       │───Pilih Aksi (Tambah/Edit/Hapus)►│                    │
       │                                   │                    │
       │                                   │───Proses Aksi─────►│
       │                                   │                    │
       │                                   │◄───Aksi Diproses──│
       │                                   │                    │
       │───Upload Gambar & Data──────────►│                    │
       │                                   │                    │
       │                                   │───Validasi File───►│
       │                                   │                    │
       │                                   │◄───File Valid?────│
       │                                   │                    │
       │                                   │───Simpan ke DB───►│
       │                                   │                    │
       │                                   │◄───Data Tersimpan─│
       │                                   │                    │
       │◄───Pesan Sukses──────────────────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

## 9. Activity Diagram Alur Manajemen Doa-doa (Admin)

```
┌─────────────┐                    ┌─────────────────────┐
│    ADMIN    │                    │      SISTEM         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Login sebagai Admin────────────►│
       │                                   │
       │                                   │───Verifikasi Login───┐
       │                                   │                    │
       │                                   │◄───Login Berhasil───│
       │                                   │                    │
       │───Akses Menu Manajemen Doa──────►│                    │
       │                                   │                    │
       │                                   │───Tampilkan Menu───►│
       │                                   │                    │
       │                                   │◄───Menu Doa-doa───│
       │                                   │                    │
       │───Pilih Aksi (Tambah/Edit/Hapus)►│                    │
       │                                   │                    │
       │                                   │───Proses Aksi─────►│
       │                                   │                    │
       │                                   │◄───Aksi Diproses──│
       │                                   │                    │
       │───Input Data Doa (Arab/Latin)───►│                    │
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

## 10. Activity Diagram Alur Manajemen Pendaftaran (Admin)

```
┌─────────────┐                    ┌─────────────────────┐
│    ADMIN    │                    │      SISTEM         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Login sebagai Admin────────────►│
       │                                   │
       │                                   │───Verifikasi Login───┐
       │                                   │                    │
       │                                   │◄───Login Berhasil───│
       │                                   │                    │
       │───Akses Menu Manajemen Pendaftaran►│                    │
       │                                   │                    │
       │                                   │───Tampilkan Menu───►│
       │                                   │                    │
       │                                   │◄───Menu Pendaftaran│
       │                                   │                    │
       │───Lihat Daftar Pendaftaran──────►│                    │
       │                                   │                    │
       │                                   │───Tampilkan Data──►│
       │                                   │                    │
       │                                   │◄───Data Pendaftaran│
       │                                   │                    │
       │───Pilih Pendaftaran untuk Review►│                    │
       │                                   │                    │
       │                                   │───Tampilkan Detail►│
       │                                   │                    │
       │                                   │◄───Detail Lengkap─│
       │                                   │                    │
       │───Update Status (Approve/Reject)►│                    │
       │                                   │                    │
       │                                   │───Simpan Status───►│
       │                                   │                    │
       │                                   │◄───Status Tersimpan│
       │                                   │                    │
       │◄───Pesan Sukses──────────────────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

## 11. Activity Diagram Alur Logout

```
┌─────────────┐                    ┌─────────────────────┐
│   USER/ADMIN│                    │      SISTEM         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Klik Tombol Logout────────────►│
       │                                   │
       │                                   │───Konfirmasi Logout─┐
       │                                   │                    │
       │                                   │◄───Dialog Konfirmasi│
       │                                   │                    │
       │───Konfirmasi Ya─────────────────►│                    │
       │                                   │                    │
       │                                   │───Hapus Session───►│
       │                                   │                    │
       │                                   │───Hapus JWT Token─►│
       │                                   │                    │
       │                                   │───Redirect ke Login│
       │                                   │                    │
       │◄───Halaman Login─────────────────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

## 12. Activity Diagram Alur Dashboard Admin

```
┌─────────────┐                    ┌─────────────────────┐
│    ADMIN    │                    │      SISTEM         │
└─────────────┘                    └─────────────────────┘
       │                                   │
       │───Login sebagai Admin────────────►│
       │                                   │
       │                                   │───Verifikasi Login───┐
       │                                   │                    │
       │                                   │◄───Login Berhasil───│
       │                                   │                    │
       │───Akses Dashboard Admin──────────►│                    │
       │                                   │                    │
       │                                   │───Ambil Statistik──►│
       │                                   │                    │
       │                                   │───Query Database───►│
       │                                   │                    │
       │                                   │◄───Data Statistik──│
       │                                   │                    │
       │                                   │───Render Dashboard─►│
       │                                   │                    │
       │                                   │◄───Dashboard Siap──│
       │                                   │                    │
       │◄───Dashboard dengan Statistik────│                    │
       │                                   │                    │
       │                                   │◄───Selesai────────│
```

## Penjelasan Activity Diagram

Activity Diagram di atas menggambarkan alur proses utama dalam sistem PPTB-BQ:

### **Aktor Utama:**

1. **PENGUNJUNG** - Pengguna yang belum terdaftar
2. **USER** - Pengguna yang sudah terdaftar dan login
3. **ADMIN** - Administrator sistem

### **Alur Proses Utama:**

1. **Pendaftaran Santri** - Alur untuk pengunjung mendaftar
2. **Login User/Admin** - Proses autentikasi
3. **Manajemen Konten** - Admin mengelola berita, galeri, doa-doa
4. **Manajemen Pendaftaran** - Admin review dan approve pendaftaran
5. **Dashboard** - Tampilan statistik dan informasi sistem
6. **Logout** - Proses keluar dari sistem

### **Fitur Keamanan:**

- Validasi data input
- Verifikasi kredensial
- Role-based access control
- JWT token management
- Session management

### **Database Operations:**

- Create, Read, Update, Delete (CRUD)
- Data validation
- Status tracking
- Audit trail

Activity Diagram ini menunjukkan bagaimana sistem PPTB-BQ mengelola alur kerja dari berbagai aktor dengan fitur keamanan dan validasi yang komprehensif.
