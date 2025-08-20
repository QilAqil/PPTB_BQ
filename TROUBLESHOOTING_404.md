# Troubleshooting 404 Error pada Halaman Berita

## 🔍 **Masalah yang Ditemukan**

Error: `Error mengambil detail berita: null` yang menyebabkan halaman berita detail menampilkan 404.

## 🛠️ **Solusi yang Sudah Diterapkan**

### 1. **Perbaikan Fetch URL**

- Mengubah dari hardcoded `http://localhost:3000` ke dynamic URL
- Menggunakan `process.env.NODE_ENV` untuk membedakan development dan production
- Menambahkan logging yang lebih detail untuk debugging

### 2. **Enhanced Error Handling**

- Menambahkan logging untuk response status, headers, dan body
- Validasi data yang diterima dari API
- Error handling yang lebih informatif

### 3. **Konfigurasi Next.js**

- Menambahkan `output: 'standalone'` untuk optimasi production
- Konfigurasi `serverComponentsExternalPackages` untuk Prisma

## 📋 **Langkah-langkah Troubleshooting**

### **Step 1: Periksa Environment Variables**

```bash
# Development (.env.local)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production (Vercel/Netlify)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### **Step 2: Test API Endpoint**

```bash
# Test di local
curl http://localhost:3000/api/news

# Test di production
curl https://your-domain.vercel.app/api/news
```

### **Step 3: Periksa Console Logs**

Buka browser developer tools dan lihat console untuk:

- API URL yang digunakan
- Response status dan headers
- Error messages yang detail

### **Step 4: Verifikasi Database Connection**

Pastikan database bisa diakses dari environment production.

## 🔧 **Debugging Commands**

### **Test News API**

```bash
node scripts/test-news-api.js
```

### **Check Environment**

```bash
node scripts/check-server-env.js
```

### **Build dan Test**

```bash
npm run build
npm run start
```

## 🚨 **Common Issues dan Solutions**

### **Issue 1: Environment Variable Not Set**

**Solution**: Set `NEXT_PUBLIC_APP_URL` di platform deploy

### **Issue 2: Database Connection Failed**

**Solution**: Periksa `DATABASE_URL` dan pastikan database accessible

### **Issue 3: API Route Not Found**

**Solution**: Pastikan build berhasil dan API routes ter-generate

### **Issue 4: CORS Issues**

**Solution**: Periksa konfigurasi CORS di Next.js

## 📱 **Testing Checklist**

- [ ] Environment variables sudah diset dengan benar
- [ ] Database connection berfungsi
- [ ] API endpoint `/api/news` bisa diakses
- [ ] API endpoint `/api/news/[id]` bisa diakses
- [ ] Console logs menunjukkan informasi yang detail
- [ ] Build production berhasil tanpa error

## 🆘 **Jika Masih Error**

1. **Periksa Vercel/Netlify logs** untuk error server-side
2. **Test API endpoint** secara manual dengan curl/Postman
3. **Verifikasi database** bisa diakses dari production
4. **Check build output** untuk memastikan semua routes ter-generate

## 📞 **Support**

Jika masalah masih berlanjut, periksa:

- Vercel/Netlify deployment logs
- Database connection logs
- Browser console errors
- Network tab untuk failed requests
