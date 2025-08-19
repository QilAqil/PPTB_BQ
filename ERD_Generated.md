### Entity Relationship Diagram (Generated) — Sumber: `prisma/schema.prisma`

#### Diagram (Mermaid)

```mermaid
erDiagram
  User ||--o{ Session : has
  User ||--o{ News : authors
  User ||--o{ Gallery : authors
  User ||--o{ Prayer : authors
  User ||--o{ Registration : processes

  User {
    string id PK
    string email UNIQUE
    string name
    string password
    UserRole role
    boolean isVerified
    boolean isActive
    datetime lastLoginAt
    datetime createdAt
    datetime updatedAt
  }

  Session {
    string id PK
    string userId FK
    string token UNIQUE
    datetime expiresAt
    datetime createdAt
  }

  News {
    string id PK
    string title
    string content
    string imageUrl
    string authorId FK
    boolean isPublished
    datetime publishedAt
    datetime createdAt
    datetime updatedAt
  }

  Gallery {
    string id PK
    string title
    string imageUrl
    string authorId FK
    boolean isPublished
    datetime publishedAt
    datetime createdAt
    datetime updatedAt
  }

  Prayer {
    string id PK
    string title
    string arabicText
    string latinText
    string translation
    string category
    string authorId FK
    boolean isPublished
    datetime publishedAt
    datetime createdAt
    datetime updatedAt
  }

  Registration {
    string id PK
    string fullName
    string nik
    string birthPlace
    datetime birthDate
    string gender
    string address
    string phoneNumber
    string parentName
    string parentPhone
    string motivation
    RegistrationStatus status
    string notes
    string processedBy FK NULL
    datetime processedAt
    datetime createdAt
    datetime updatedAt
  }
```

#### Keterangan

- **Entitas**: `User`, `Session`, `News`, `Gallery`, `Prayer`, `Registration`.
- **Enumerasi (di tingkat aplikasi/DB enum)**: `UserRole` (USER, ADMIN) dan `RegistrationStatus` (PENDING, APPROVED, REJECTED).
- **Relasi**:
  - `User` 1..\* `Session` via `Session.userId` (onDelete: Cascade di schema).
  - `User` 1..\* `News` via `News.authorId` (onDelete: Cascade).
  - `User` 1..\* `Gallery` via `Gallery.authorId` (onDelete: Cascade).
  - `User` 1..\* `Prayer` via `Prayer.authorId` (onDelete: Cascade).
  - `User` 1..\* `Registration` via `Registration.processedBy` (nullable; merekam admin pemroses).
- **Kunci & Constraint penting**:
  - `User.email` UNIQUE, `Session.token` UNIQUE.
  - Semua `id` adalah `String` (Prisma `cuid()`), timestamp menggunakan `DateTime`.

Dokumen ini dihasilkan otomatis agar ERD selalu konsisten dengan skema Prisma terbaru.
