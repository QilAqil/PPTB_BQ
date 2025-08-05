# Setup PostgreSQL dengan Neon Tech untuk PPTB BQ

## 📋 Daftar Isi
- [Prerequisites](#prerequisites)
- [Langkah-langkah Setup](#langkah-langkah-setup)
- [Troubleshooting](#troubleshooting)
- [Keuntungan Neon Tech](#keuntungan-neon-tech)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

### Software yang Diperlukan
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Git
- Browser web

### Akun yang Diperlukan
- Akun Neon Tech (gratis)
- Email untuk verifikasi

## Langkah-langkah Setup

### 1. Buat Akun Neon Tech

1. **Kunjungi Website Neon Tech**
   ```
   https://console.neon.tech
   ```

2. **Sign Up**
   - Klik tombol "Sign Up"
   - Isi form registrasi dengan email dan password
   - Verifikasi email Anda

3. **Login ke Console**
   - Masuk ke Neon Tech Console
   - Dashboard akan muncul setelah login

### 2. Buat Project Baru

1. **Create Project**
   - Klik tombol "Create Project"
   - Pilih region terdekat (disarankan: Singapore)
   - Beri nama project: `pptb-bq`
   - Klik "Create Project"

2. **Tunggu Setup**
   - Neon Tech akan membuat project baru
   - Proses ini memakan waktu 1-2 menit

### 3. Dapatkan Connection String

1. **Dashboard Project**
   - Setelah project dibuat, Anda akan diarahkan ke dashboard
   - Di bagian "Connection Details", Anda akan melihat connection string

2. **Copy Connection String**
   - Format connection string:
   ```
   postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require
   ```
   - Klik tombol "Copy" untuk menyalin connection string

### 4. Setup Environment Variables

1. **Buat File .env**
   - Di root project, buat file `.env`
   - Jika sudah ada, edit file tersebut

2. **Update DATABASE_URL**
   ```env
   # PostgreSQL Neon Tech Configuration
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require"
   
   # NextAuth Configuration
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

3. **Generate Secret Key**
   - Untuk NEXTAUTH_SECRET, gunakan command:
   ```bash
   openssl rand -base64 32
   ```
   - Atau gunakan string random yang aman

### 5. Install Dependencies

```bash
npm install
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Reset Database (Jika Perlu)

Jika ada masalah dengan migration history:

```bash
npx prisma migrate reset --force
```

### 8. Jalankan Migrations

```bash
npx prisma migrate dev --name init
```

### 9. Buat Admin User

```bash
node scripts/create-admin.js
```

### 10. Seed Sample Data (Optional)

```bash
node scripts/seed-data.js
```

### 11. Jalankan Development Server

```bash
npm run dev
```

## Troubleshooting

### Error: Can't reach database server

**Penyebab:**
- Connection string salah
- Project Neon Tech tidak aktif
- IP restrictions

**Solusi:**
1. Periksa connection string di file `.env`
2. Pastikan project Neon Tech masih aktif
3. Cek IP restrictions di Neon Tech console

### Error: Authentication failed

**Penyebab:**
- Username/password salah
- Database tidak ada

**Solusi:**
1. Generate password baru di Neon Tech console
2. Update connection string dengan password baru
3. Database akan dibuat otomatis saat migration

### Error: SSL connection required

**Penyebab:**
- Parameter SSL tidak ada di connection string

**Solusi:**
- Pastikan `?sslmode=require` ada di connection string

### Error: Drift detected

**Penyebab:**
- Schema database tidak sinkron dengan migration history

**Solusi:**
```bash
npx prisma migrate reset --force
npx prisma migrate dev --name init
```

### Error: Migration failed

**Penyebab:**
- Database connection bermasalah
- Schema tidak valid

**Solusi:**
1. Test connection: `npx prisma db pull`
2. Generate client: `npx prisma generate`
3. Reset dan migrate ulang

## Keuntungan Neon Tech

### 🚀 Performance
- **Serverless**: Tidak perlu mengelola server
- **Auto-scaling**: Otomatis menyesuaikan dengan beban
- **Global CDN**: Akses cepat dari seluruh dunia

### 💰 Cost Effective
- **Free Tier**: 3 project gratis
- **0.5GB Storage**: Cukup untuk development
- **Pay-as-you-go**: Hanya bayar yang digunakan

### 🔒 Security
- **SSL/TLS**: Enkripsi otomatis
- **IP Restrictions**: Kontrol akses (optional)
- **Password Authentication**: Keamanan standar
- **Connection Pooling**: Optimasi koneksi

### 🛠️ Developer Experience
- **Branching**: Database branching untuk development
- **Point-in-time Recovery**: Restore ke waktu tertentu
- **Auto-backup**: Backup otomatis setiap hari
- **SQL Editor**: Query langsung di console

## Monitoring & Maintenance

### Dashboard Monitoring

1. **Kunjungi Console**
   ```
   https://console.neon.tech
   ```

2. **Pilih Project**
   - Klik project `pptb-bq`

3. **Monitor Metrics**
   - Connection count
   - Query performance
   - Storage usage
   - Error logs

### Backup & Restore

1. **Automatic Backup**
   - Neon Tech backup otomatis setiap hari
   - Backup disimpan selama 7 hari (free tier)

2. **Manual Backup**
   - Export data via SQL
   - Download backup file
   - Restore ke point-in-time tertentu

### Scaling

1. **Storage Scaling**
   - Upgrade storage saat diperlukan
   - Monitor usage di dashboard

2. **Performance Scaling**
   - Neon Tech auto-scale berdasarkan beban
   - Tidak perlu konfigurasi manual

## Best Practices

### 🔐 Security
- Gunakan password yang kuat
- Aktifkan IP restrictions jika diperlukan
- Update NEXTAUTH_SECRET secara berkala
- Monitor access logs

### 📊 Performance
- Gunakan connection pooling
- Optimasi query database
- Monitor slow queries
- Index tabel yang sering di-query

### 💾 Data Management
- Backup data penting secara manual
- Monitor storage usage
- Archive data lama jika diperlukan
- Gunakan database branching untuk testing

## Support

### Neon Tech Support
- **Documentation**: https://neon.tech/docs
- **Community**: https://community.neon.tech
- **Discord**: https://discord.gg/neondatabase

### Project Support
- **Issues**: Buat issue di repository GitHub
- **Documentation**: Lihat README.md project
- **Scripts**: Gunakan script di folder `scripts/`

## Migration dari SQLite

Jika sebelumnya menggunakan SQLite dan ingin migrate ke PostgreSQL:

1. **Backup Data SQLite**
   ```bash
   sqlite3 dev.db .dump > backup.sql
   ```

2. **Setup PostgreSQL**
   - Ikuti langkah-langkah di atas

3. **Import Data**
   ```bash
   psql "postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database" < backup.sql
   ```

4. **Update Schema**
   ```bash
   npx prisma db pull
   npx prisma generate
   ```

## Cost Optimization

### Free Tier Limits
- 3 projects
- 0.5GB storage per project
- 10GB transfer per month
- Auto-suspend setelah 5 menit idle

### Upgrade Tips
- Monitor usage di dashboard
- Upgrade hanya saat diperlukan
- Archive data lama untuk menghemat storage
- Gunakan connection pooling untuk menghemat koneksi

---

**🎉 Selamat! PostgreSQL Neon Tech setup selesai dan siap digunakan untuk project PPTB BQ!** 