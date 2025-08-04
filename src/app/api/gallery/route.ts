import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');

    const where: Record<string, unknown> = {};
    
    if (published === 'true') {
      where.isPublished = true;
    }

    const take = limit ? parseInt(limit) : 10;
    const skip = page ? (parseInt(page) - 1) * take : 0;

    const gallery = await prisma.gallery.findMany({
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
      take,
      skip,
    });

    const total = await prisma.gallery.count({ where });

    return NextResponse.json({
      data: gallery,
      pagination: {
        total,
        page: page ? parseInt(page) : 1,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, imageUrl, isPublished = false } = body;

    // Validate required fields
    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      );
    }

    // For now, we'll use a default author ID
    // In a real app, you'd get this from the authenticated user
    const defaultAuthorId = 'cmdl3mnyy0000iqa099b2ahsc'; // Admin user ID

    const gallery = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
        authorId: defaultAuthorId,
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

    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 