# Sistem Autentikasi Custom dengan Role Management

## Overview
Sistem autentikasi custom yang menggunakan database Neon dengan role management (USER dan ADMIN) tanpa bergantung pada Clerk.

## Fitur Utama

### 🔐 Autentikasi
- Register user baru
- Login dengan email dan password
- Logout dengan session management
- Password hashing dengan bcrypt
- JWT token untuk session

### 👥 Role Management
- **USER**: Akses terbatas ke dashboard
- **ADMIN**: Akses penuh ke admin panel dan user management

### 🛡️ Keamanan
- Password hashing dengan bcrypt (12 rounds)
- JWT token dengan expiration
- Session management dengan database
- Role-based access control (RBAC)

## Struktur Database

### Model User
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  role          UserRole  @default(USER)
  isVerified    Boolean   @default(false)
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  sessions      Session[]
}

enum UserRole {
  USER
  ADMIN
}
```

### Model Session
```prisma
model Session {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Setup dan Instalasi

### 1. Environment Variables
Buat file `.env` dengan konfigurasi berikut:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pptb_bq?schema=public"

# JWT Secret (generate dengan: openssl rand -base64 32)
JWT_SECRET="your-super-secret-jwt-key-here"

# Environment
NODE_ENV="development"
```

### 2. Install Dependencies
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### 3. Database Migration
```bash
# Apply migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### 4. Create Admin User
```bash
# Buat admin pertama
node scripts/create-admin.js admin@example.com password123 "Admin Name"
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user data

### User Management (Admin Only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

## Halaman Aplikasi

### Public Pages
- `/` - Home page
- `/sign-in` - Login page
- `/sign-up` - Register page

### Protected Pages
- `/dashboard` - User dashboard (USER & ADMIN)
- `/admin` - Admin panel (ADMIN only)
- `/users` - User management (ADMIN only)

## Penggunaan

### 1. Register User Baru
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 3. Get Current User
```bash
curl http://localhost:3000/api/auth/me \
  -H "Cookie: auth-token=your-jwt-token"
```

### 4. Create User (Admin Only)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=admin-jwt-token" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "New User",
    "role": "USER"
  }'
```

## Middleware dan Authorization

### Authentication Middleware
```typescript
import { authenticate, requireAuth, requireAdmin } from '@/lib/middleware'

// Check if user is authenticated
const authError = requireAuth(request)
if (authError) return authError

// Check if user is admin
const adminError = requireAdmin(request)
if (adminError) return adminError
```

### Role-based Access Control
```typescript
// Check user role
const isAdmin = user.role === 'ADMIN'
const isOwnData = user.id === targetUserId

if (!isAdmin && !isOwnData) {
  return NextResponse.json({ error: 'Access denied' }, { status: 403 })
}
```

## Security Features

### Password Security
- Password hashing dengan bcrypt (12 salt rounds)
- Minimum password length: 6 characters
- Password validation pada register dan update

### Session Security
- JWT token dengan expiration (7 days)
- HttpOnly cookies untuk token storage
- Session cleanup untuk expired tokens
- Secure cookies di production

### Access Control
- Role-based authorization
- User can only access their own data
- Admin can access all data
- Protected routes with middleware

## Development Commands

```bash
# Start development server
npm run dev

# Database commands
npx prisma studio          # Open database GUI
npx prisma migrate dev     # Create and apply migration
npx prisma generate        # Generate Prisma Client
npx prisma db push         # Push schema changes

# Create admin user
node scripts/create-admin.js admin@example.com password123 "Admin Name"

# Clean expired sessions
npx prisma studio          # Manual cleanup via GUI
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Periksa DATABASE_URL di .env
   - Pastikan database Neon aktif
   - Cek network connectivity

2. **JWT Token Invalid**
   - Periksa JWT_SECRET di .env
   - Regenerate JWT_SECRET jika diperlukan
   - Clear browser cookies

3. **User Not Found**
   - Periksa email spelling
   - Pastikan user sudah register
   - Cek database connection

4. **Access Denied**
   - Periksa user role (USER vs ADMIN)
   - Pastikan user sudah login
   - Cek session expiration

### Debug Commands

```bash
# Check database connection
npx prisma db pull

# View database schema
npx prisma studio

# Check migration status
npx prisma migrate status

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Next Steps

1. **Email Verification**: Implementasi email verification untuk user registration
2. **Password Reset**: Tambahkan fitur forgot password dan reset
3. **Two-Factor Authentication**: Implementasi 2FA untuk keamanan tambahan
4. **Rate Limiting**: Tambahkan rate limiting untuk API endpoints
5. **Audit Logs**: Implementasi audit logs untuk admin actions
6. **User Permissions**: Granular permissions system
7. **API Documentation**: Swagger/OpenAPI documentation
8. **Testing**: Unit tests dan integration tests 