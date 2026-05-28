import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    // 1. Calculate sum of verified donations
    const donationsSum = await prisma.donation.aggregate({
      where: {
        verified: true,
      },
      _sum: {
        amount: true,
      },
    });

    const totalDonations = donationsSum._sum.amount || 0;

    // 2. Compute dynamic metrics based on verified donations
    // ₹250 distributes pads & counsels 1 girl
    // ₹10 delivers 1 biodegradable pad
    // Adding cumulative baseline metrics: 1000+ mentored girls, 10000+ organic pads distributed
    const girlsHelped = 1000 + Math.floor(totalDonations / 250);
    const padsDistributed = 10000 + Math.floor(totalDonations / 10);

    // 3. Count approved volunteers
    // Adding baseline metric offset of 2000 registered champions
    const approvedCount = await prisma.volunteer.count({
      where: {
        status: 'APPROVED',
      },
    });
    const volunteersCount = 2000 + approvedCount;

    // 4. Count pending volunteers
    const pendingVolunteersCount = await prisma.volunteer.count({
      where: {
        status: 'PENDING',
      },
    });

    // 5. Count active campaigns
    const activeCampaignsCount = await prisma.campaign.count({
      where: {
        active: true,
      },
    });

    return NextResponse.json({
      success: true,
      totalDonations,
      girlsHelped,
      padsDistributed,
      volunteersCount,
      pendingVolunteersCount,
      activeCampaignsCount,
    });
  } catch (error: any) {
    console.error('Failed to fetch real-time stats:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
