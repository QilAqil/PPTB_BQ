import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    console.log("Gallery API called with params:", { limit, page });

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log("DATABASE_URL not configured");
      return NextResponse.json({
        data: [],
        pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
      }); // Return empty data instead of error
    }

    const where: Record<string, unknown> = {};

    console.log("Query where clause:", where);

    // Also check total gallery count (including unpublished)
    const totalGallery = await prisma.gallery.count();
    console.log(`Total gallery in database: ${totalGallery}`);

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
        createdAt: "desc",
      },
      take,
      skip,
    });

    const total = await prisma.gallery.count({ where });

    console.log(`Found ${gallery.length} gallery items, total: ${total}`);
    console.log(
      "Gallery items:",
      gallery.map((g) => ({
        id: g.id,
        title: g.title,
        isPublished: g.isPublished,
      }))
    );

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
    console.error("Error fetching gallery:", error);
    // Return empty data instead of error response
    return NextResponse.json({
      data: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, imageUrl } = body;

    // Validate required fields
    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Title and imageUrl are required" },
        { status: 400 }
      );
    }

    // Determine author: prefer logged-in user; fallback to first user
    let authorId: string | null = null;
    const authToken = request.cookies.get("auth-token")?.value;
    if (authToken) {
      const payload = verifyToken(authToken);
      if (payload) {
        authorId = payload.userId;
      }
    }
    if (!authorId) {
      const firstUser = await prisma.user.findFirst({ select: { id: true } });
      authorId = firstUser?.id || null;
    }
    if (!authorId) {
      return NextResponse.json(
        { error: "No user available to assign as author" },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        authorId,
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
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
