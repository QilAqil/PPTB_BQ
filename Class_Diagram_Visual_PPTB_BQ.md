# Visualisasi Class Diagram Sistem PPTB-BQ

## Diagram Kelas (Class Diagram) Visual

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              SISTEM PPTB-BQ CLASS DIAGRAM                          │
└─────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Users    │         │  Sessions   │         │    News     │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id: int     │◄────────│ id: int     │         │ id: int     │
│ email: string│         │ userId: int │         │ title: string│
│ name: string│         │ token: string│         │ content: text│
│ password: string│      │ expiresAt: timestamp│ │ imageUrl: string│
│ role: enum  │         │ createdAt: timestamp│ │ authorId: int   │
│ isVerified: boolean│  └─────────────┘         │ isPublished: boolean│
│ isActive: boolean│                             │ publishedAt: timestamp│
│ lastLoginAt: timestamp│                        │ createdAt: timestamp│
│ createdAt: timestamp│                          │ updatedAt: timestamp│
│ updatedAt: timestamp│                          └─────────────┘
└─────────────┘                                         │
       │                                                 │
       │                                                 │
       │         ┌─────────────┐         ┌─────────────┐│
       │         │  Gallery    │         │   Prayers   ││
       │         ├─────────────┤         ├─────────────┤│
       │         │ id: int     │         │ id: int     ││
       │         │ title: string│        │ title: string││
       │         │ imageUrl: string│     │ arabicText: text││
       │         │ authorId: int│        │ latinText: text││
       │         │ isPublished: boolean│ │ translation: text││
       │         │ publishedAt: timestamp│ │ category: string││
       │         │ createdAt: timestamp│ │ authorId: int   ││
       │         │ updatedAt: timestamp│ │ isPublished: boolean││
       │         └─────────────┘         │ publishedAt: timestamp││
       │                                 │ createdAt: timestamp││
       │                                 │ updatedAt: timestamp││
       │                                 └─────────────┘│
       │                                                 │
       │         ┌─────────────┐                        │
       │         │Registration │                        │
       │         ├─────────────┤                        │
       │         │ id: int     │                        │
       │         │ fullName: string│                    │
       │         │ nik: string │                        │
       │         │ birthPlace: string│                  │
       │         │ birthDate: date│                     │
       │         │ gender: string│                      │
       │         │ address: text│                       │
       │         │ phoneNumber: string│                 │
       │         │ parentName: string│                  │
       │         │ parentPhone: string│                 │
       │         │ motivation: text│                    │
       │         │ status: enum │                       │
       │         │ notes: text  │                       │
       │         │ processedBy: int│                    │
       │         │ processedAt: timestamp│              │
       │         │ createdAt: timestamp│                │
       │         │ updatedAt: timestamp│                │
       │         └─────────────┘                        │
       │                                                 │
       └─────────────────────────────────────────────────┘
```

## Metode (Methods) untuk Setiap Kelas

### 1. **Kelas `Users`**

- `+login(email: string, password: string): boolean`
- `+logout(): void`
- `+updateProfile(data: object): boolean`
- `+changePassword(oldPassword: string, newPassword: string): boolean`

### 2. **Kelas `Sessions`**

- `+createSession(userId: int): Session`
- `+validateToken(token: string): boolean`
- `+expireSession(): void`

### 3. **Kelas `News`**

- `+createNews(data: object): News`
- `+updateNews(id: int, data: object): boolean`
- `+deleteNews(id: int): boolean`
- `+publishNews(id: int): boolean`
- `+getPublishedNews(): News[]`

### 4. **Kelas `Gallery`**

- `+uploadImage(file: File): Gallery`
- `+updateGallery(id: int, data: object): boolean`
- `+deleteGallery(id: int): boolean`
- `+publishGallery(id: int): boolean`
- `+getPublishedGallery(): Gallery[]`

### 5. **Kelas `Prayers`**

- `+addPrayer(data: object): Prayer`
- `+updatePrayer(id: int, data: object): boolean`
- `+deletePrayer(id: int): boolean`
- `+publishPrayer(id: int): boolean`
- `+getPrayersByCategory(category: string): Prayer[]`

### 6. **Kelas `Registrations`**

- `+submitRegistration(data: object): Registration`
- `+updateStatus(id: int, status: string, notes: string): boolean`
- `+getRegistrationsByStatus(status: string): Registration[]`
- `+processRegistration(id: int, adminId: int): boolean`

## Hubungan Antar Kelas

### 1. **Users → Sessions** (1:N)

- Satu user dapat memiliki banyak session
- Relasi: `Users` **Memiliki** `Sessions`

### 2. **Users → News** (1:N)

- Satu admin dapat membuat banyak berita
- Relasi: `Users` **Mengelola** `News`

### 3. **Users → Gallery** (1:N)

- Satu admin dapat upload banyak foto
- Relasi: `Users` **Mengelola** `Gallery`

### 4. **Users → Prayers** (1:N)

- Satu admin dapat menambah banyak doa
- Relasi: `Users` **Mengelola** `Prayers`

### 5. **Users → Registrations** (1:N)

- Satu admin dapat memproses banyak pendaftaran
- Relasi: `Users` **Mengelola** `Registrations`

## Keterangan Simbol

- **+** = Public method (Metode publik)
- **-** = Private attribute (Atribut privat)
- **◄────────** = Relasi dengan foreign key
- **│** = Garis penghubung antar kelas
- **1:N** = Relasi Satu ke Banyak
- **PK** = Primary Key (Kunci Utama)
- **FK** = Foreign Key (Kunci Asing)
