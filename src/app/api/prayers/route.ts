import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/prayers - Get all prayers (published only for non-admin users)
export async function GET(request: NextRequest) {
  try {
    // Get auth token from cookie
    const authToken = request.cookies.get('auth-token')?.value;
    let user = null;
    
    if (authToken) {
      // Verify JWT token
      const payload = verifyToken(authToken);
      if (payload) {
        // Get user from database
        user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
          },
        });
      }
    }
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};
    
    // If user is not admin, only show published prayers
    if (!user || user.role !== 'ADMIN') {
      where.isPublished = true;
    }
    
    // Filter by category if provided
    if (category) {
      where.category = category;
    }

    const [prayers, total] = await Promise.all([
      prisma.prayer.findMany({
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
        skip,
        take: limit,
      }),
      prisma.prayer.count({ where }),
    ]);

    return NextResponse.json({
      prayers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching prayers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/prayers - Create new prayer (admin only)
export async function POST(request: NextRequest) {
  try {
    // Get auth token from cookie
    const authToken = request.cookies.get('auth-token')?.value;
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const payload = verifyToken(authToken);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
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
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      );
    }
    
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, arabicText, latinText, translation, category, isPublished } = body;

    // Validate required fields
    if (!title || !arabicText || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, arabicText, and category are required' },
        { status: 400 }
      );
    }

    const prayer = await prisma.prayer.create({
      data: {
        title,
        arabicText,
        latinText,
        translation,
        category,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
        authorId: user.id,
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
    });

    return NextResponse.json(prayer, { status: 201 });
  } catch (error) {
    console.error('Error creating prayer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 