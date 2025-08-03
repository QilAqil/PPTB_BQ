import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');

    const where: Record<string, unknown> = {};
    
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const take = limit ? parseInt(limit) : 10;
    const skip = page ? (parseInt(page) - 1) * take : 0;

    const registrations = await prisma.registration.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });

    const total = await prisma.registration.count({ where });

    return NextResponse.json({
      data: registrations,
      pagination: {
        total,
        page: page ? parseInt(page) : 1,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
      specialNeeds,
    } = body;

    // Validate required fields
    if (!fullName || !nik || !birthPlace || !birthDate || !gender || !address || !phoneNumber || !parentName || !parentPhone || !parentAddress || !educationLevel || !schoolName || !schoolAddress || !motivation) {
      return NextResponse.json(
        { error: 'All required fields are required' },
        { status: 400 }
      );
    }

    // Check if NIK already exists
    const existingRegistration = await prisma.registration.findFirst({
      where: { nik },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'NIK already registered' },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        fullName,
        nik,
        birthPlace,
        birthDate: new Date(birthDate),
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
        healthCondition,
        specialNeeds,
        status: 'PENDING',
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 