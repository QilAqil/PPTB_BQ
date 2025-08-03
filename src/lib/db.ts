import { prisma } from './prisma'

// User operations
export const userOperations = {
  // Get all users
  getAll: async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  // Get user by ID
  getById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  // Get user by email
  getByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  // Create user
  create: async (data: { email: string; name?: string; password: string }) => {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  // Update user
  update: async (id: string, data: { email?: string; name?: string }) => {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  // Delete user
  delete: async (id: string) => {
    return await prisma.user.delete({
      where: { id },
    })
  },

  // Check if user exists
  exists: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    })
    return !!user
  },

  // Check if email exists
  emailExists: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    return !!user
  },
} 