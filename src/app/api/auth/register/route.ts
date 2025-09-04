import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { hashPassword } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER', // Default role
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      {
        message: 'Registrasi berhasil',
        user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Gagal registrasi:', error)
    return NextResponse.json(
      { error: 'Gagal registrasi' },
      { status: 500 }
    )
  }
} 