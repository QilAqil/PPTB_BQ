# Prisma Setup dan Migration untuk Model User

## Overview
Dokumen ini menjelaskan setup Prisma dan migration untuk model User dalam aplikasi Next.js.

## Struktur File

```
prisma/
├── schema.prisma          # Schema database
├── migrations/            # File migration
│   └── 20250727023854_init/
│       └── migration.sql
└── migration_lock.toml    # Lock file untuk migration

src/
├── lib/
│   ├── prisma.ts         # Prisma Client instance
│   └── db.ts            # Utility functions untuk database
├── app/
│   ├── api/users/       # API routes untuk users
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── users/           # Halaman users
│       └── page.tsx
└── components/
    └── users/           # Komponen React untuk users
        ├── user-list.tsx
        └── user-form.tsx
```

## Model User

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Setup Database

1. **Konfigurasi Environment**
   Buat file `.env` dengan konfigurasi database:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/pptb_bq?schema=public"
   ```

2. **Migration Database**
   ```bash
   # Buat migration baru
   npx prisma migrate dev --name init
   
   # Generate Prisma Client
   npx prisma generate
   ```

3. **Reset Database (jika diperlukan)**
   ```bash
   npx prisma migrate reset
   ```

## API Endpoints

### Users
- `GET /api/users` - Mendapatkan semua users
- `POST /api/users` - Membuat user baru
- `GET /api/users/[id]` - Mendapatkan user berdasarkan ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Hapus user

### Contoh Request

**Create User:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "John Doe"}'
```

**Get All Users:**
```bash
curl http://localhost:3000/api/users
```

**Update User:**
```bash
curl -X PUT http://localhost:3000/api/users/[id] \
  -H "Content-Type: application/json" \
  -d '{"email": "newemail@example.com", "name": "Jane Doe"}'
```

**Delete User:**
```bash
curl -X DELETE http://localhost:3000/api/users/[id]
```

## Penggunaan di Komponen React

### Menggunakan Prisma Client
```typescript
import { prisma } from '@/lib/prisma'

// Get all users
const users = await prisma.user.findMany()

// Create user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe'
  }
})
```

### Menggunakan Utility Functions
```typescript
import { userOperations } from '@/lib/db'

// Get all users
const users = await userOperations.getAll()

// Create user
const user = await userOperations.create({
  email: 'user@example.com',
  name: 'John Doe'
})
```

## Halaman Users

Akses halaman user management di: `http://localhost:3000/users`

Fitur yang tersedia:
- Melihat daftar semua users
- Menambah user baru
- Menghapus user
- Refresh data

## Development Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name [migration_name]

# Apply migrations to production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database
npx prisma migrate reset

# Push schema changes without migration
npx prisma db push
```

## Troubleshooting

### Error: "Database connection failed"
- Pastikan database PostgreSQL berjalan
- Periksa konfigurasi DATABASE_URL di file .env
- Pastikan database dan user memiliki permission yang tepat

### Error: "Prisma Client not generated"
```bash
npx prisma generate
```

### Error: "Migration failed"
```bash
# Reset database dan migration
npx prisma migrate reset
```

## Next Steps

1. **Authentication**: Tambahkan NextAuth.js untuk autentikasi
2. **Validation**: Tambahkan Zod untuk validasi data
3. **Error Handling**: Implementasi error handling yang lebih robust
4. **Pagination**: Tambahkan pagination untuk list users
5. **Search & Filter**: Tambahkan fitur pencarian dan filter
6. **Testing**: Tambahkan unit tests dan integration tests 