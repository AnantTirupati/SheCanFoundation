import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { amount, donorName, donorEmail, donorPhone, campaignId } = await req.json();

    if (!amount || amount <= 0 || !donorName || !donorEmail) {
      return NextResponse.json(
        { error: 'Missing required donation parameters.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail.trim())) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // Validate phone number format (if provided, since phone is optional)
    if (donorPhone) {
      const cleanPhone = donorPhone.replace(/[\s\-()]/g, '');
      const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { error: 'Invalid contact number. Must be a valid 10-digit number.' },
          { status: 400 }
        );
      }
    }

    const amtNum = parseFloat(amount);

    // Generate mock order and payment IDs
    const mockPaymentId = 'pay_MOCK' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const mockOrderId = 'order_MOCK' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const receiptId = `REC-${mockPaymentId.slice(-6).toUpperCase()}`;

    // 1. Create a verified donation in the database
    const donation = await prisma.donation.create({
      data: {
        amount: amtNum,
        currency: 'INR',
        donorName,
        donorEmail,
        donorPhone: donorPhone || null,
        orderId: mockOrderId,
        paymentId: mockPaymentId,
        signature: 'mock_signature_bypass_verified',
        verified: true,
        campaignId: campaignId && campaignId !== 'general' ? campaignId : null,
        taxReceiptUrl: `/receipts/receipt_${mockPaymentId}.pdf`,
      },
    });

    // 2. If campaign is selected, increment campaign raised amount in the database
    if (donation.campaignId) {
      await prisma.campaign.update({
        where: { id: donation.campaignId },
        data: {
          raisedAmount: {
            increment: amtNum,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Mock payment verified successfully and saved to database.',
      receiptId,
      orderId: mockOrderId,
      paymentId: mockPaymentId,
      amount: amtNum,
    });
  } catch (error: any) {
    console.error('Failed to register mock transaction:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
