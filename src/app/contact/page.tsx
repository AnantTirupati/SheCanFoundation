'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [msg, setMsg] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the tax exemption benefit for Indian donors?",
      a: "Every donation to the She Can Foundation Trust qualifies for a 50% tax deduction under Section 80G of the Income Tax Act, 1961. Immediately upon a successful payment verification, a tax-compliance receipt is generated dynamically with registration credentials, downloadable as a PDF.",
    },
    {
      q: "Can corporate entities support under CSR frameworks?",
      a: "Yes, absolutely! We are registered under Ministry of Corporate Affairs CSR Form CSR-1 (Unique CSR Reg No: CSR00039481). We provide comprehensive compliance documentation, on-ground impact audits, and quarterly utilization summaries for corporate social responsibility funds.",
    },
    {
      q: "Are there opportunities for remote/online volunteering?",
      a: "Yes! Remote volunteers can support our digital literacy campaigns, prepare wellness brochures, coordinate corporate outreach databases, write success stories, or manage social handles. Apply via our Volunteer page and select 'Vocational Skill Mentor'.",
    },
    {
      q: "How are the sanitary pads manufactured?",
      a: "Our pads are sourced from rural women self-help cooperatives. They are made from organic banana fiber, cotton, and bamboo charcoal, making them 100% skin-safe, breathable, and fully bio-degradable within 6 months of disposal.",
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      alert('Please fill out Name, Email, and Message first.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 40,
        origin: { y: 0.65 },
      });
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMsg('');
      }, 5000);
    }, 1200);
  };

  return (
    <div className="warm-mesh min-h-screen pt-28 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary-royal/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary-pink font-extrabold font-sora">Get In Touch</span>
          <h1 className="font-sora text-4xl sm:text-5xl font-extrabold text-neutral-charcoal leading-tight">
            We Would Love to Hear From You
          </h1>
          <p className="text-neutral-slate text-sm sm:text-base leading-relaxed">
            Have questions about volunteering, CSR corporate collaborations, tax receipt generation, or menstrual hygiene camps? Send us a ticket or check our FAQs below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <form onSubmit={handleContactSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col gap-5 text-left relative">
              <h3 className="font-sora font-bold text-lg text-neutral-charcoal border-b border-gray-100 pb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-secondary-pink" />
                Submit support ticket
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-slate uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Joy Roy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-slate uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. joy@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-neutral-slate uppercase">Subject Pillar</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
                >
                  <option value="general">General NGO Operations / Inquiry</option>
                  <option value="csr">Corporate CSR Partnership</option>
                  <option value="donor">Donations & 80G Receipt Support</option>
                  <option value="volunteer">Volunteer applications</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-neutral-slate uppercase">Message</label>
                <textarea
                  required
                  placeholder="Explain your inquiry in detail..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={4}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-semibold text-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {submitted && (
                <div className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col gap-3 items-center justify-center text-center p-6 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <h4 className="font-sora font-extrabold text-neutral-charcoal text-base">Message Sent Successfully!</h4>
                  <p className="text-[11px] text-neutral-slate max-w-xs leading-relaxed">
                    Thank you for contacting She Can Support. We have logged ticket reference <strong>#TKT-{Math.floor(Math.random()*10000)}</strong>. A support coordinator will email you within 24 hours.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right: FAQ Accordions */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col gap-4">
              <h3 className="font-sora font-extrabold text-base text-neutral-charcoal border-b border-gray-100 pb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-secondary-peach" />
                Common Inquiries
              </h3>
              
              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => {
                  const isActive = activeFaq === idx;
                  return (
                    <div key={idx} className="border-b border-gray-100 pb-3">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isActive ? null : idx)}
                        className="w-full flex items-center justify-between text-xs font-bold text-neutral-charcoal hover:text-primary-royal transition-colors text-left focus:outline-none cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isActive ? <ChevronDown className="w-4 h-4 text-primary-royal rotate-180 transition-transform" /> : <ChevronDown className="w-4 h-4 text-neutral-slate/40 transition-transform" />}
                      </button>
                      
                      {isActive && (
                        <p className="text-[11px] text-neutral-slate leading-relaxed mt-2.5 animate-in slide-in-from-top-2 duration-300">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Office coordinates box */}
            <div className="p-6 rounded-3xl bg-neutral-cream border border-gray-200/50 shadow-sm flex flex-col gap-3.5 text-xs text-neutral-slate">
              <span className="text-[10px] font-bold text-secondary-pink uppercase tracking-widest font-sora">Contact Details</span>
              <p className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-primary-royal" />
                <span>+91 82838 41830</span>
              </p>
              <p className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-secondary-pink" />
                <span>president@shecanfoundation.org</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
