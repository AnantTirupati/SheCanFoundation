import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Only administrators can perform this action.' },
        { status: 401 }
      );
    }

    const { title, targetAmount, category, description, coverImage } = await req.json();

    if (!title || !targetAmount || !category) {
      return NextResponse.json(
        { error: 'Missing required campaign fields (title, targetAmount, category).' },
        { status: 400 }
      );
    }

    const targetAmtFloat = parseFloat(targetAmount);
    if (isNaN(targetAmtFloat) || targetAmtFloat <= 0) {
      return NextResponse.json(
        { error: 'Target amount must be a positive number.' },
        { status: 400 }
      );
    }

    // Generate unique ID based on title
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newCampaign = await prisma.campaign.create({
      data: {
        id,
        title,
        description: description || `Outreach campaign focusing on ${category}.`,
        category,
        targetAmount: targetAmtFloat,
        raisedAmount: 0,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d2d?auto=format&fit=crop&q=80&w=600',
        active: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Campaign created successfully in Supabase.',
      campaign: newCampaign,
    });
  } catch (error: any) {
    console.error('Failed to create campaign:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
