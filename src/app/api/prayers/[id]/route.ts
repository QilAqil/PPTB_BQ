import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET /api/prayers/[id] - Get specific prayer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get auth token from cookie
    const authToken = request.cookies.get("auth-token")?.value;
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

    const { id } = await params;

    const prayer = await prisma.prayer.findUnique({
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
    });

    if (!prayer) {
      return NextResponse.json({ error: "Prayer not found" }, { status: 404 });
    }

    // No publication filter anymore

    return NextResponse.json(prayer);
  } catch (error) {
    console.error("Error fetching prayer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/prayers/[id] - Update prayer (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get auth token from cookie
    const authToken = request.cookies.get("auth-token")?.value;

    if (!authToken) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify JWT token
    const payload = verifyToken(authToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
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
        { error: "User not found or inactive" },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, arabicText, latinText, translation, category } = body;

    // Check if prayer exists
    const existingPrayer = await prisma.prayer.findUnique({
      where: { id },
    });

    if (!existingPrayer) {
      return NextResponse.json({ error: "Prayer not found" }, { status: 404 });
    }

    // Validate required fields
    if (!title || !arabicText || !category) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, arabicText, and category are required",
        },
        { status: 400 }
      );
    }

    const updatedPrayer = await prisma.prayer.update({
      where: { id },
      data: {
        title,
        arabicText,
        latinText,
        translation,
        category,
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

    return NextResponse.json(updatedPrayer);
  } catch (error) {
    console.error("Error updating prayer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/prayers/[id] - Delete prayer (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get auth token from cookie
    const authToken = request.cookies.get("auth-token")?.value;

    if (!authToken) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify JWT token
    const payload = verifyToken(authToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
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
        { error: "User not found or inactive" },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Check if prayer exists
    const existingPrayer = await prisma.prayer.findUnique({
      where: { id },
    });

    if (!existingPrayer) {
      return NextResponse.json({ error: "Prayer not found" }, { status: 404 });
    }

    await prisma.prayer.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Prayer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting prayer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
