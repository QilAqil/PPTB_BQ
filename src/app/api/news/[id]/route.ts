import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { verifyToken } from '../../../../lib/auth'

// GET /api/news/[id] - Get single news
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!news) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

// PUT /api/news/[id] - Update news (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Get auth token from cookie
    const authToken = request.cookies.get('auth-token')?.value
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify JWT token
    const payload = verifyToken(authToken)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    })

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content, imageUrl, isPublished } = body

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id },
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    // Update news
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
        isPublished,
        publishedAt: isPublished && !existingNews.isPublished ? new Date() : existingNews.publishedAt,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error('Error updating news:', error)
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    )
  }
}

// DELETE /api/news/[id] - Delete news (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get auth token from cookie
    const authToken = request.cookies.get('auth-token')?.value
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify JWT token
    const payload = verifyToken(authToken)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    })

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { id } = await params
    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id },
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    // Delete news
    await prisma.news.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'News deleted successfully' })
  } catch (error) {
    console.error('Error deleting news:', error)
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    )
  }
} 