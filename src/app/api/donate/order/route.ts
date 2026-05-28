import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { amount, donorName, donorEmail, donorPhone, campaignId } = await req.json();

    if (!amount || amount <= 0 || !donorName || !donorEmail) {
      return NextResponse.json({ error: 'Missing required donation details' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail.trim())) {
      return NextResponse.json({ error: 'Invalid email address format.' }, { status: 400 });
    }

    // Validate phone number format (if provided, since phone is optional)
    if (donorPhone) {
      const cleanPhone = donorPhone.replace(/[\s\-()]/g, '');
      const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json({ error: 'Invalid contact number. Must be a valid 10-digit number.' }, { status: 400 });
      }
    }

    // Initialize Razorpay SDK
    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholderKeyId123';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'placeholderSecretKey456';

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    // Create Razorpay Order
    // Amount in Razorpay is always in paise (lowest currency unit)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);

    // Save pending transaction record to Prisma database
    // We handle Prisma in a try-catch to ensure that even if the database is not migrated yet,
    // the payment flow doesn't crash completely (graceful fallback)
    let dbDonation = null;
    try {
      dbDonation = await prisma.donation.create({
        data: {
          amount: Number(amount),
          currency: 'INR',
          donorName,
          donorEmail,
          donorPhone,
          orderId: order.id,
          verified: false,
          campaignId: campaignId || null,
        },
      });
    } catch (dbErr) {
      console.warn('Prisma database is not connected/migrated yet. Continuing order without saving pending state.');
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbDonationId: dbDonation ? dbDonation.id : null,
      keyId: key_id,
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
