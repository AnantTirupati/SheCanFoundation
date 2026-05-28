'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, CreditCard, Shield, QrCode, ArrowRight, Award, CheckCircle2, Download, MessageSquare, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

function DonatePageContent() {
  const searchParams = useSearchParams();
  const initialAmount = searchParams.get('amount') ? Number(searchParams.get('amount')) : 1500;
  const initialCampaign = searchParams.get('campaignId') || 'general';

  const [amount, setAmount] = useState<number | string>(initialAmount);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [campaign, setCampaign] = useState(initialCampaign);
  const [donationFrequency, setDonationFrequency] = useState<'one-time' | 'monthly'>('one-time');
  
  // Payment states
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);

  // State for dynamic database campaigns
  const [campaignsList, setCampaignsList] = useState<any[]>([]);
  // Simulated / Dynamic Donor Wall Messages
  const [donorWall, setDonorWall] = useState<any[]>([]);
  const [newWallMessage, setNewWallMessage] = useState('');

  // Fetch campaigns and recent donations on mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        // Load campaigns
        const campRes = await fetch('/api/campaigns');
        const campData = await campRes.json();
        if (campData.success) {
          setCampaignsList(campData.campaigns || []);
        }

        // Load recent verified donations
        const recentRes = await fetch('/api/donate/recent');
        const recentData = await recentRes.json();
        if (recentData.success) {
          setDonorWall(recentData.donations || []);
        }
      } catch (err) {
        console.error('Failed to load initial donate page data:', err);
      }
    }
    loadInitialData();

    // Script loader for Razorpay
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getDonationImpact = (amt: number) => {
    if (amt <= 500) return 'Provides a 3-month supply of organic pads & hygiene counseling for 2 young girls.';
    if (amt <= 1500) return 'Supplies complete school kits (bags, books, sanitizers) & learning guides for 3 rural students.';
    if (amt <= 3000) return 'Funds vocational training resources (sewing kits/supplies) for a woman to gain self-reliance.';
    if (amt <= 5000) return 'Sponsors a complete clinical hygiene and gynecological counseling camp in a tribal hamlet.';
    return 'Supports comprehensive health, education, and nutrition support for 5 underprivileged families for a whole month.';
  };

  const handleOpenQrModal = () => {
    if (!donorName || !donorEmail) {
      alert('Please fill in your Name and Email address first.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail.trim())) {
      alert('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (donorPhone) {
      const cleanPhone = donorPhone.replace(/[\s\-()]/g, '');
      const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 10-digit contact number.');
        return;
      }
    }

    const amtNum = Number(amount);
    if (isNaN(amtNum) || amtNum <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setShowQrModal(true);
  };

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) {
      alert('Please fill in your Name and Email address first.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail.trim())) {
      alert('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    // Validate phone number format (if provided)
    if (donorPhone) {
      const cleanPhone = donorPhone.replace(/[\s\-()]/g, '');
      const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 10-digit contact number (starting with 6, 7, 8, or 9).');
        return;
      }
    }

    const amtNum = Number(amount);
    if (isNaN(amtNum) || amtNum <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/donate/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amtNum,
          donorName,
          donorEmail,
          donorPhone,
          campaignId: campaign,
        }),
      });

      const orderData = await res.json();

      if (orderData.error) {
        throw new Error(orderData.error);
      }

      if (orderData.keyId.includes('placeholder')) {
        setLoading(false);
        setShowQrModal(true);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'She Can Foundation',
        description: `NGO Support Drive: ${campaign}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setLoading(true);
          const verifyRes = await fetch('/api/donate/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          setLoading(false);

          if (verifyData.success) {
            handlePaymentSuccess({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              receiptId: verifyData.receiptId,
              amount: amtNum,
              donorName,
              donorEmail,
            });
          } else {
            alert('Payment verification failed: ' + verifyData.error);
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },
        theme: {
          color: '#7C3AED',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setLoading(false);

    } catch (err: any) {
      setLoading(false);
      setShowQrModal(true);
    }
  };

  const handleSimulatedUpiSuccess = async () => {
    setShowQrModal(false);
    setLoading(true);

    try {
      const res = await fetch('/api/donate/mock-success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          donorName,
          donorEmail,
          donorPhone,
          campaignId: campaign,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        handlePaymentSuccess({
          orderId: data.orderId,
          paymentId: data.paymentId,
          receiptId: data.receiptId,
          amount: data.amount,
          donorName,
          donorEmail,
        });
      } else {
        alert('Mock success record failed: ' + data.error);
      }
    } catch (err: any) {
      setLoading(false);
      alert('Mock donation failed: ' + err.message);
    }
  };

  const handlePaymentSuccess = (details: any) => {
    setReceiptDetails(details);
    setPaymentSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    const newDonor = {
      name: details.donorName,
      amount: details.amount,
      message: newWallMessage || 'Empowered a young girl with sanitation and education! 🌸',
      date: 'Just now',
    };
    setDonorWall((prev) => [newDonor, ...prev]);
  };

  const downloadReceipt = () => {
    if (!receiptDetails) return;

    const printContent = `
      <html>
        <head>
          <title>Tax Exemption Donation Receipt - She Can Foundation</title>
          <style>
            body { font-family: Arial, sans-serif; color: #333; padding: 40px; }
            .header { text-align: center; border-bottom: 2px solid #7c3aed; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #5B21B6; }
            .title { font-size: 18px; margin-top: 10px; font-weight: bold; text-transform: uppercase; }
            .details { margin-top: 30px; line-height: 1.8; }
            .receipt-box { border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .footer { margin-top: 50px; font-size: 11px; color: #666; text-align: center; border-top: 1px solid #ddd; padding-top: 20px; }
            .badge { display: inline-block; background: #7c3aed; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">SHE CAN FOUNDATION</div>
            <div class="title">Official Donation Receipt</div>
            <div class="badge">SEC 80G TAX EXEMPTED</div>
          </div>
          <div class="details">
            <p><strong>Receipt Number:</strong> ${receiptDetails.receiptId}</p>
            <p><strong>Order ID:</strong> ${receiptDetails.orderId}</p>
            <p><strong>Payment Transaction ID:</strong> ${receiptDetails.paymentId}</p>
            <p><strong>Donation Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Donor Name:</strong> ${receiptDetails.donorName}</p>
            <p><strong>Donor Email:</strong> ${receiptDetails.donorEmail}</p>
            <hr />
            <div class="receipt-box">
              <h3 style="margin-top:0; color:#5B21B6;">CONTRIBUTION SUMMARY</h3>
              <p><strong>Amount Contributed:</strong> ₹${receiptDetails.amount.toLocaleString()} INR</p>
              <p><strong>Campaign Supported:</strong> ${campaign.toUpperCase()}</p>
              <p><strong>Tax Deduction benefits:</strong> Eligible for 50% deduction under Section 80G of the I.T. Act, 1961.</p>
            </div>
          </div>
          <div class="footer">
            <p>She Can Foundation Trust • India</p>
            <p>Reg No: IV-19030248-A • NITI Aayog: WB/2023/0384917 • CA verified audit compliance.</p>
            <p>This is a computer-generated document. No physical signature is required.</p>
          </div>
        </body>
      </html>
    `;

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="warm-mesh min-h-screen pt-28 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary-royal/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!paymentSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Emotional Appeal Letter */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left animate-in fade-in duration-500">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/60 shadow-sm flex flex-col gap-6 relative overflow-hidden text-neutral-charcoal">
                {/* Visual accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-royal/5 to-secondary-pink/5 rounded-bl-full pointer-events-none" />
                
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary-pink font-sora">An Appeal for Dignity</span>
                  <h2 className="font-sora text-2xl font-extrabold text-neutral-charcoal leading-snug">Dear Donor,</h2>
                </div>

                <div className="text-neutral-slate text-xs sm:text-[13px] leading-relaxed flex flex-col gap-4">
                  <p>
                    Every month, a 13-year-old girl in a small village is forced to miss five days of school. Not because she doesn’t want to learn. Not because she is lazy. But because she cannot afford something as basic as a sanitary pad.
                  </p>
                  
                  <blockquote className="border-l-4 border-secondary-pink bg-secondary-pink/5 pl-4 py-2 italic text-neutral-charcoal font-medium">
                    "She hides at home in shame. She uses rags, newspapers, even sand — risking her health and her dignity. Slowly, her dreams of education, freedom, and self-respect begin to fade."
                  </blockquote>

                  <p className="font-bold text-neutral-charcoal">
                    What if it was your sister? Your daughter?
                  </p>

                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <h4 className="font-sora font-extrabold text-xs uppercase text-red-500 tracking-wider flex items-center gap-1.5 mb-3">
                      <span>⚠️</span> The Hard Truth
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                        <span><strong>1 in every 5 girls</strong> in India drops out of school because of periods.</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                        <span>Over <strong>12 crore women and girls</strong> in India still lack access to proper menstrual hygiene, resulting in shame, deadly diseases, and lost opportunities.</span>
                      </li>
                    </ul>
                  </div>

                  <p>
                    But, dear donor — you hold the power to change this.
                  </p>

                  <div className="p-5 rounded-2xl bg-neutral-cream border border-gray-200/50 flex flex-col gap-3 my-2">
                    <h4 className="font-sora font-bold text-xs text-neutral-charcoal flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-secondary-pink fill-secondary-pink/20" />
                      How You Can Save Her Dignity
                    </h4>
                    <p className="text-[11px] leading-relaxed">
                      At She Can Foundation (registered under the Indian Societies Registration Act, 1860), we have already helped 1,20,000+ girls across India with free sanitary pads, awareness workshops, and dignity kits.
                    </p>
                    <p className="text-[11px] font-semibold text-neutral-charcoal">
                      But for every 1 girl we reach, 5 more are still waiting. Right now, she waits… for you.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 bg-gray-50/50 p-4 rounded-xl border border-gray-150 text-[11px]">
                    <p className="flex gap-2 items-start">
                      <span className="text-secondary-pink font-bold">➤</span>
                      <span>The next time you spend <strong>₹300 on a coffee</strong>, remember: That same amount can provide 3 girls with sanitary pads kits for an entire month.</span>
                    </p>
                    <p className="flex gap-2 items-start">
                      <span className="text-secondary-pink font-bold">➤</span>
                      <span>The next time you buy a <strong>₹1,000 dinner</strong>, remember: That same amount can keep 10 girls in school, safe, and dignified.</span>
                    </p>
                  </div>

                  <p className="font-medium text-neutral-charcoal border-b border-gray-100 pb-3">
                    Your gift today is not charity. It is the difference between a girl living in shame or living with dignity.
                  </p>

                  <div className="flex flex-col gap-3 mt-2">
                    <h4 className="font-sora font-bold text-xs text-neutral-charcoal">One Small Gift = A Lifetime of Dignity</h4>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div className="p-3 rounded-xl border border-gray-200 bg-white text-center">
                        <span className="block font-bold text-primary-royal text-xs">₹500</span>
                        <span className="text-neutral-slate">5 girls receive pads for 1 month</span>
                      </div>
                      <div className="p-3 rounded-xl border border-gray-200 bg-white text-center">
                        <span className="block font-bold text-primary-royal text-xs">₹1,500</span>
                        <span className="text-neutral-slate">15 girls for 3 months</span>
                      </div>
                      <div className="p-3 rounded-xl border border-gray-200 bg-white text-center">
                        <span className="block font-bold text-primary-royal text-xs">₹5,000</span>
                        <span className="text-neutral-slate">25 girls continue school</span>
                      </div>
                      <div className="p-3 rounded-xl border border-gray-200 bg-white text-center">
                        <span className="block font-bold text-primary-royal text-xs">₹10,000</span>
                        <span className="text-neutral-slate">Classroom free from shame</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4 text-center">
                    <p className="font-sora font-extrabold text-xs text-neutral-charcoal">
                      Without you, she waits. With you, she rises.
                    </p>
                    <p className="text-[10px] text-neutral-slate italic">
                      The choice is yours — and her future depends on it.
                    </p>
                    <p className="font-sora font-bold text-[11px] text-secondary-pink mt-2">
                      ✦ Be the reason she dreams again. Donate today.
                    </p>
                    <p className="text-[10px] text-neutral-slate/75 mt-3 font-semibold">
                      With hope,<br />
                      <strong>She Can Foundation</strong>
                    </p>
                    <p className="text-[9px] text-neutral-slate/50 italic mt-2">
                      ✦ Don’t let her story end in silence. Be the reason she stands tall.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Donation Form & Wall */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left animate-in fade-in duration-500">
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-secondary-pink font-bold font-sora">Secure Gateway</span>
                <h1 className="font-sora text-3xl sm:text-4xl font-extrabold text-neutral-charcoal">Join the Movement</h1>
                <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">Select your contribution structure. 92% of all resources are funneled directly into on-ground distribution camps.</p>
              </div>

              {/* Form container */}
              <form onSubmit={handleRazorpayPayment} className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/50 shadow-sm flex flex-col gap-6 text-left">
                {/* One time vs Monthly */}
                <div className="flex gap-4 p-1 bg-[#faf7f2] border border-gray-200/50 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setDonationFrequency('one-time')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      donationFrequency === 'one-time'
                        ? 'bg-gradient-to-r from-primary-royal to-secondary-pink text-white shadow-xs'
                        : 'text-neutral-slate hover:text-neutral-charcoal'
                    }`}
                  >
                    One-time Donation
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationFrequency('monthly')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      donationFrequency === 'monthly'
                        ? 'bg-gradient-to-r from-primary-royal to-secondary-pink text-white shadow-xs'
                        : 'text-neutral-slate hover:text-neutral-charcoal'
                    }`}
                  >
                    Monthly Supporting Aid
                  </button>
                </div>

                {/* Amount selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-neutral-slate uppercase">Select Donation Amount (INR)</label>
                  <div className="grid grid-cols-4 gap-3">
                    {[500, 1500, 3000, 5000].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-3.5 text-xs font-bold border rounded-xl transition-all cursor-pointer ${
                          Number(amount) === val
                            ? 'bg-white border-secondary-pink text-secondary-pink'
                            : 'bg-white border-gray-200 text-neutral-slate hover:border-gray-300 hover:text-neutral-charcoal'
                        }`}
                      >
                        ₹{val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    required
                    placeholder="Or enter custom amount in ₹"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink focus:ring-1 focus:ring-secondary-pink transition-colors"
                  />
                </div>

                {/* Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adarsh Roy"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. adarsh@gmail.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Link to Specific Program</label>
                    <select
                      value={campaign}
                      onChange={(e) => setCampaign(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
                    >
                      <option value="general">General NGO Operations Trust</option>
                      {campaignsList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Donor Wall note */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-slate uppercase">Encouraging Donor Message</label>
                  <textarea
                    placeholder="Leave a sweet message for the young rural students..."
                    value={newWallMessage}
                    onChange={(e) => setNewWallMessage(e.target.value)}
                    rows={2}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors resize-none"
                  />
                </div>

                {/* Amount Impact Calculator Text Box */}
                <div className="p-4 rounded-xl bg-[#fff9f5] border border-pink-100/50 flex gap-2.5 text-left">
                  <Sparkles className="w-5 h-5 text-secondary-peach flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] font-bold text-secondary-pink uppercase tracking-wider mb-0.5">Tangible Impact Summary</span>
                    <p className="text-xs text-neutral-charcoal font-medium leading-relaxed">
                      {getDonationImpact(Number(amount) || 0)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 text-center rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-semibold text-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sora font-bold"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Pay with Razorpay
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenQrModal}
                    className="flex-1 py-4 text-center rounded-xl bg-white border border-gray-250 hover:border-secondary-pink hover:bg-secondary-pink/5 text-neutral-charcoal font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sora font-bold"
                  >
                    <QrCode className="w-4 h-4 text-secondary-pink animate-pulse" />
                    Donate via UPI QR
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[9px] text-neutral-slate font-bold border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-green-500" /> SSL SECURED GATEWAY</span>
                  <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-secondary-pink" /> 80G COMPLIANT RECEIPT</span>
                </div>
              </form>

              {/* Live Donor Wall inside right column */}
              <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6">
                <h3 className="font-sora font-extrabold text-base text-neutral-charcoal flex items-center gap-2 border-b border-gray-100 pb-3">
                  <MessageSquare className="w-5 h-5 text-secondary-pink" />
                  Live Donor Wall
                </h3>
                <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                  {donorWall.length > 0 ? (
                    donorWall.map((don, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1.5 relative shadow-xs">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-neutral-charcoal">{don.name}</span>
                          <span className="font-extrabold text-secondary-pink">₹{don.amount.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-neutral-slate italic leading-relaxed">
                          "{don.message}"
                        </p>
                        <span className="text-[9px] text-neutral-slate/50 font-semibold self-end">{don.date}</span>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 px-4 text-center text-xs text-neutral-slate/70 italic border border-dashed border-gray-200 rounded-2xl">
                      No verified donations logged yet. Be the first social champion to support our drives! 🌸
                    </div>
                  )}
                </div>
              </div>

              {/* Tax exemption details inside right column */}
              <div className="p-6 rounded-3xl bg-neutral-cream border border-gray-200/50 flex flex-col gap-3.5 text-xs text-neutral-slate shadow-sm">
                <span className="text-[10px] font-bold text-secondary-pink uppercase tracking-widest flex items-center gap-1.5 font-sora">
                  <Award className="w-4 h-4" /> Tax Exemption Policy Info
                </span>
                <p className="leading-relaxed">
                  Donations to the <strong>She Can Foundation</strong> are eligible for 50% tax deduction benefits under <strong>Section 80G</strong> of the Income Tax Act, 1961. 
                </p>
                <p className="text-[11px] text-neutral-slate/75 leading-relaxed">
                  Immediately upon a successful payment verification, a tax-compliance receipt is generated dynamically with registration credentials, downloadable as a PDF.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Success */
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-gray-200 shadow-sm text-center flex flex-col gap-6 items-center animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
            
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-secondary-pink font-bold font-sora">Successful Transaction</span>
              <h2 className="font-sora text-3xl font-extrabold text-neutral-charcoal">Thank You for Empowering Her!</h2>
              <p className="text-neutral-slate text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Your payment of <strong>₹{receiptDetails?.amount.toLocaleString()}</strong> has been verified. 92% of this contribution goes directly onto local village sanitation and educational setups.
              </p>
            </div>

            <div className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-150 text-left grid grid-cols-2 gap-4 text-xs leading-relaxed text-neutral-slate">
              <div>
                <span className="block text-neutral-slate/50 font-bold uppercase tracking-wider">Transaction ID</span>
                <span className="font-semibold text-neutral-charcoal">{receiptDetails?.paymentId}</span>
              </div>
              <div>
                <span className="block text-neutral-slate/50 font-bold uppercase tracking-wider">Receipt Number</span>
                <span className="font-semibold text-neutral-charcoal">{receiptDetails?.receiptId}</span>
              </div>
              <div className="col-span-2 border-t border-gray-200/50 pt-2 mt-2">
                <span className="block text-neutral-slate/50 font-bold uppercase tracking-wider">Donor Details</span>
                <span className="font-semibold text-neutral-charcoal">{receiptDetails?.donorName} ({receiptDetails?.donorEmail})</span>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <button
                onClick={downloadReceipt}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-bold text-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Tax Exemption PDF
              </button>
              <button
                onClick={() => setPaymentSuccess(false)}
                className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-neutral-charcoal font-bold text-xs hover:bg-gray-50 transition-all cursor-pointer"
              >
                Support another Drive
              </button>
            </div>
          </div>
        )}
      </div>

      {/* UPI QR Scanner Sandbox Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-gray-200 p-6 text-center flex flex-col gap-5 relative animate-in zoom-in duration-300 shadow-2xl">
            <h3 className="font-sora font-extrabold text-base text-neutral-charcoal flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-secondary-pink" />
              Scan UPI QR Gateway
            </h3>
            <p className="text-[11px] text-neutral-slate leading-relaxed">
              Placeholders detected in `.env`. Scanning sandbox QR processes a mock payment so you can safely test the automated receipts and DB logs!
            </p>

            <div className="w-48 h-48 rounded-2xl bg-white p-2 mx-auto flex items-center justify-center shadow-sm border border-gray-100 relative group overflow-hidden">
              <img 
                src="/donate.png" 
                alt="UPI QR Code for Donation" 
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-neutral-slate">
              <span className="block text-[9px] font-bold text-secondary-pink uppercase">UPI Transaction Value</span>
              <strong className="text-base text-neutral-charcoal">₹{(Number(amount) || 0).toLocaleString()}</strong>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSimulatedUpiSuccess}
                className="flex-1 py-2.5 rounded-xl bg-green-500 text-white font-bold text-xs hover:bg-green-600 transition-all cursor-pointer"
              >
                Confirm Mock Success
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white border border-gray-200 text-neutral-charcoal font-bold text-xs hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center bg-neutral-cream text-neutral-slate">
        <span className="w-8 h-8 border-4 border-primary-royal/30 border-t-primary-royal rounded-full animate-spin mb-3" />
        <span className="text-xs font-bold uppercase tracking-wider font-sora">Initializing Secure Portal...</span>
      </div>
    }>
      <DonatePageContent />
    </Suspense>
  );
}
