import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admins only.' },
        { status: 401 }
      );
    }

    const { id, action } = await req.json();

    if (!id || !action) {
      return NextResponse.json(
        { error: 'Missing required volunteer id or action parameters.' },
        { status: 400 }
      );
    }

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json(
        { error: "Invalid action. Supported values are 'approve' or 'reject'." },
        { status: 400 }
      );
    }

    const newStatus = action === 'approve' ? 'APPROVED' : 'REJECTED';
    const defaultTask = action === 'approve' ? ['Introductory safety training'] : [];

    const updated = await prisma.volunteer.update({
      where: { id },
      data: {
        status: newStatus,
        tasks: defaultTask,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Volunteer application successfully ${newStatus.toLowerCase()}d.`,
      volunteer: updated,
    });
  } catch (error: any) {
    console.error('Failed to update volunteer application status:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
