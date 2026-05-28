import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/db';

// GET: Fetch all volunteers (Admin only review check)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Dashboard review is restricted.' },
        { status: 401 }
      );
    }

    const volunteers = await prisma.volunteer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      volunteers,
    });
  } catch (error: any) {
    console.error('Failed to list volunteers:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST: Public application submission
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, bio, skills, resume } = await req.json();

    if (!name || !email || !phone || !bio) {
      return NextResponse.json(
        { error: 'Missing required field parameters.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid contact number. Must be a valid 10-digit number.' },
        { status: 400 }
      );
    }

    // Check if volunteer email already exists
    const existing = await prisma.volunteer.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An application with this email address has already been submitted.' },
        { status: 400 }
      );
    }

    const newVolunteer = await prisma.volunteer.create({
      data: {
        name,
        email,
        phone,
        bio,
        skills: Array.isArray(skills) ? skills : [],
        resume: resume || null,
        status: 'PENDING',
        tasks: [],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Volunteer application submitted successfully.',
      volunteer: newVolunteer,
    });
  } catch (error: any) {
    console.error('Failed to submit volunteer application:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
