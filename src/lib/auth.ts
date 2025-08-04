import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = '7d'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Compare password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify JWT token
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

// Create session
export const createSession = async (userId: string): Promise<string> => {
  // Get user data for JWT payload
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Generate JWT token with user data
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  // Create session in database
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  return token
}

// Validate session
export const validateSession = async (token: string) => {
  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
        },
      },
    },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

// Delete session
export const deleteSession = async (token: string) => {
  try {
    // Check if session exists before deleting
    const session = await prisma.session.findUnique({
      where: { token },
    })

    if (session) {
      await prisma.session.delete({
        where: { token },
      })
    }
    // If session doesn't exist, just return without error
  } catch (error) {
    // Log error but don't throw - session might already be deleted
    console.warn('Session deletion warning:', error)
  }
}

// Clean expired sessions
export const cleanExpiredSessions = async () => {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  })
}

export async function signIn(email: string, password: string) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Login gagal')
    }

    const data = await response.json()
    return { success: true, data }
  } catch {
    return { success: false, message: 'Email atau password salah' }
  }
}

export async function signUp(email: string, password: string, name: string) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })

    if (!response.ok) {
      throw new Error('Registrasi gagal')
    }

    const data = await response.json()
    return { success: true, data }
  } catch {
    return { success: false, message: 'Gagal membuat akun' }
  }
} 