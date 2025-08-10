# Visualisasi ERD Sistem PPTB-BQ

## Diagram Entitas-Relasi (ERD) Visual

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              SISTEM PPTB-BQ ERD                                    │
└─────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Users    │         │  Sessions   │         │    News     │
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

## Hubungan Antar Entitas

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

- **PK** = Primary Key (Kunci Utama)
- **FK** = Foreign Key (Kunci Asing)
- **1:N** = Relasi Satu ke Banyak
- **◄────────** = Relasi dengan foreign key
- **│** = Garis penghubung antar entitas
