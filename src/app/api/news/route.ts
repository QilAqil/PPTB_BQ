import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../../lib/auth'

// GET /api/news - Get all news (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const limit = searchParams.get('limit')
    
    console.log('News API called with params:', { published, limit })
    
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not configured')
      return NextResponse.json([]) // Return empty array instead of error
    }
    
    const where = published === 'true' ? { isPublished: true } : {}
    console.log('Query where clause:', where)
    
    // Also check total news count (including unpublished)
    const totalNews = await prisma.news.count()
    const publishedNews = await prisma.news.count({ where: { isPublished: true } })
    console.log(`Total news in database: ${totalNews}, Published: ${publishedNews}`)
    
    const news = await prisma.news.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...(limit && { take: parseInt(limit) }),
    })

    console.log(`Found ${news.length} news items`)
    console.log('News items:', news.map(n => ({ id: n.id, title: n.title, isPublished: n.isPublished })))
    
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    // Return empty array instead of error response
    return NextResponse.json([])
  }
}

// POST /api/news - Create new news (Admin only)
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { title, content, imageUrl, isPublished } = body

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Create news
    const news = await prisma.news.create({
      data: {
        title,
        content,
        imageUrl,
        authorId: user.id,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
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

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
} 