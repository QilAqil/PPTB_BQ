import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateSession } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('PATCH request for registration ID:', id);
    
    // Check authentication
    const authToken = request.cookies.get('auth-token')?.value;
    if (!authToken) {
      console.log('No auth token found');
      return NextResponse.json(
        { error: 'Unauthorized - No authentication token' },
        { status: 401 }
      );
    }

    const user = await validateSession(authToken);
    if (!user) {
      console.log('Invalid auth token');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid authentication token' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      console.log('User is not admin:', user.role);
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    console.log('Authenticated user:', user.name, 'Role:', user.role);
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { status, notes } = body;

    // Validasi status
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      console.log('Invalid status:', status);
      return NextResponse.json(
        { error: 'Status tidak valid' },
        { status: 400 }
      );
    }

    // Check if registration exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { id }
    });

    if (!existingRegistration) {
      console.log('Registration not found:', id);
      return NextResponse.json(
        { error: 'Pendaftaran tidak ditemukan' },
        { status: 404 }
      );
    }

    console.log('Existing registration:', existingRegistration);

    // Update registration
    const updatedRegistration = await prisma.registration.update({
      where: { id },
      data: {
        status,
        notes: notes || null,
        processedAt: new Date(),
        processedBy: user.id // Use authenticated user ID
      },
      include: {
        processedByUser: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    console.log('Updated registration:', updatedRegistration);

    return NextResponse.json({
      message: `Pendaftaran berhasil ${status === 'APPROVED' ? 'disetujui' : 'ditolak'}`,
      registration: updatedRegistration
    });

  } catch (error) {
    console.error('Update registration error:', error);
    
    // Handle specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Pendaftaran tidak ditemukan' },
        { status: 404 }
      );
    }
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Data duplikat ditemukan' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: `Terjadi kesalahan saat mengupdate pendaftaran: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const registration = await prisma.registration.findUnique({
      where: { id },
      include: {
        processedByUser: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Pendaftaran tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ registration });

  } catch (error) {
    console.error('Get registration error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pendaftaran' },
      { status: 500 }
    );
  }
} 