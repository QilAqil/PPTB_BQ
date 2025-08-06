"use client"

import { usePathname } from 'next/navigation'

interface NavbarWrapperProps {
  children: React.ReactNode
}

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const pathname = usePathname()
  
  // Add padding only for pages that show navbar
  const isDashboardPage = pathname?.startsWith('/admin') || 
                         pathname?.startsWith('/dashboard') || 
                         pathname?.startsWith('/user')
  
  return (
    <div className={isDashboardPage ? '' : 'pt-16'}>
      {children}
    </div>
  )
}
