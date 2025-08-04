import { Metadata } from "next"
import { UserList } from "../../components/users/user-list"

export const metadata: Metadata = {
  title: "Manajemen Pengguna - PPTB BAROKATUL QUR'AN",
  description: "Kelola pengguna dan akses sistem PPTB BAROKATUL QUR'AN",
}

export default function UsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manajemen Pengguna</h1>
        <p className="text-muted-foreground">
          Kelola pengguna, peran, dan akses ke sistem
        </p>
      </div>
      
      <UserList />
    </div>
  )
} 