import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    console.log("Debug endpoint called");

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        error: "DATABASE_URL not configured",
        news: [],
        gallery: [],
      });
    }

    // Get all news (including unpublished)
    const allNews = await prisma.news.findMany({
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
    });

    // Get all gallery (including unpublished)
    const allGallery = await prisma.gallery.findMany({
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
    });

    // Get counts
    const newsCount = await prisma.news.count();
    const galleryCount = await prisma.gallery.count();

    console.log("Debug data:", {
      newsCount,
      galleryCount,
      news: allNews.map((n) => ({ id: n.id, title: n.title })),
      gallery: allGallery.map((g) => ({ id: g.id, title: g.title })),
    });

    return NextResponse.json({
      summary: {
        news: {
          total: newsCount,
        },
        gallery: {
          total: galleryCount,
        },
      },
      news: allNews,
      gallery: allGallery,
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json({
      error: "Database error",
      details: error instanceof Error ? error.message : "Unknown error",
      news: [],
      gallery: [],
    });
  }
}
