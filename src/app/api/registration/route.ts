import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      nik,
      birthPlace,
      birthDate,
      gender,
      address,
      phoneNumber,
      parentName,
      parentPhone,
      parentAddress,
      educationLevel,
      schoolName,
      schoolAddress,
      graduationYear,
      motivation,
      healthCondition,
      specialNeeds
    } = body;

    // Validasi data wajib
    if (!fullName || !nik || !birthPlace || !birthDate || !gender || 
        !address || !phoneNumber || !parentName || !parentPhone || 
        !parentAddress || !educationLevel || !schoolName || !schoolAddress || !motivation) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi kecuali tahun lulus, kondisi kesehatan, dan kebutuhan khusus' },
        { status: 400 }
      );
    }

    // Validasi format tanggal
    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json(
        { error: 'Format tanggal lahir tidak valid' },
        { status: 400 }
      );
    }

    // Validasi NIK (16 digit angka)
    const nikRegex = /^\d{16}$/;
    if (!nikRegex.test(nik)) {
      return NextResponse.json(
        { error: 'NIK harus berupa 16 digit angka' },
        { status: 400 }
      );
    }

    // Validasi nomor telepon
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Format nomor telepon tidak valid' },
        { status: 400 }
      );
    }

    if (!phoneRegex.test(parentPhone)) {
      return NextResponse.json(
        { error: 'Format nomor telepon orang tua tidak valid' },
        { status: 400 }
      );
    }

    // Buat pendaftaran baru
    const registration = await prisma.registration.create({
      data: {
        fullName,
        nik,
        birthPlace,
        birthDate: parsedBirthDate,
        gender,
        address,
        phoneNumber,
        parentName,
        parentPhone,
        parentAddress,
        educationLevel,
        schoolName,
        schoolAddress,
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        motivation,
        healthCondition: healthCondition || null,
        specialNeeds: specialNeeds || null,
        status: 'PENDING',
        processedBy: null,
        processedAt: null
      }
    });

    return NextResponse.json({
      message: 'Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.',
      registrationId: registration.id
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses pendaftaran' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { nik: { contains: search, mode: 'insensitive' } },
        { parentName: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Get registrations with pagination
    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        include: {
          processedByUser: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.registration.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      registrations,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Get registrations error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pendaftaran' },
      { status: 500 }
    );
  }
} 