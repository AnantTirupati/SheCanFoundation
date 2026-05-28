'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Heart, ArrowRight, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#0d111d] border-t border-white/5 pt-20 pb-10 overflow-hidden mesh-gradient">
      {/* Background glow overlay */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-royal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 w-[500px] h-[500px] bg-secondary-pink/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand details & Newsletter */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group self-start">
              <img 
                src="/SheCan.png" 
                alt="She Can Foundation Logo" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-wider text-neutral-white font-sora">
                  SHE CAN
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary-peach font-semibold -mt-1">
                  Foundation
                </span>
              </div>
            </Link>
            <p className="text-neutral-slate/80 text-sm leading-relaxed">
              Empowering underprivileged women across India through menstrual hygiene awareness, education, healthcare accessibility, and vocational skills.
            </p>
            <form onSubmit={handleSubscribe} className="mt-2">
              <label className="block text-xs font-semibold text-neutral-white/60 uppercase tracking-wider mb-2">
                Join our movement
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-secondary-pink/60 focus:ring-1 focus:ring-secondary-pink/30 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 rounded-full bg-gradient-to-r from-primary-royal to-secondary-pink text-white hover:scale-105 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-secondary-peach mt-2 animate-pulse">
                  Thank you for subscribing to our updates!
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sora text-sm font-semibold tracking-wider text-neutral-white uppercase border-b border-white/10 pb-2">
              Explore Pages
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-slate/90">
              <li>
                <Link href="/about" className="hover:text-secondary-pink transition-colors">
                  Our Story & Mission
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-secondary-pink transition-colors">
                  Empowerment Programs
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-secondary-pink transition-colors">
                  Join as Volunteer
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-secondary-pink transition-colors">
                  Upcoming Social Drives
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-secondary-pink transition-colors">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-secondary-pink transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Impact Pillars */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sora text-sm font-semibold tracking-wider text-neutral-white uppercase border-b border-white/10 pb-2">
              Our Core Focus
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-slate/90">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-pink" />
                Menstrual Hygiene Education
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-royal" />
                Underprivileged Child Care
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-peach" />
                Rural Healthcare Outreach
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                Vocational Skill Centers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                Gender Equality Campaigns
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Registration details */}
            <div className="flex flex-col gap-4 text-sm text-neutral-slate/90">
              <h4 className="font-sora text-sm font-semibold tracking-wider text-neutral-white uppercase border-b border-white/10 pb-2">
                Get in Touch
              </h4>
              <div className="flex flex-col gap-3.5">
                <p className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-primary-royal" />
                  <span>+91 82838 41830</span>
                </p>
              <p className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-secondary-peach" />
                <span>president@shecanfoundation.org</span>
              </p>
              <div className="p-3.5 rounded-xl glass border border-white/10 flex items-start gap-2.5 mt-2">
                <Award className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-neutral-white font-sora">
                    80G TAX EXEMPTION
                  </span>
                  <span className="block text-[11px] text-neutral-slate/70">
                    Reg No: IV-19030248-A / Section 12A compliant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-slate/60">
          <p>© {new Date().getFullYear()} She Can Foundation. All Rights Reserved. Built with premium social care.</p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary-pink hover:text-white hover:scale-115 transition-all text-neutral-slate/80" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary-royal hover:text-white hover:scale-115 transition-all text-neutral-slate/80" aria-label="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-sky-400 hover:text-white hover:scale-115 transition-all text-neutral-slate/80" aria-label="Twitter">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white hover:scale-115 transition-all text-neutral-slate/80" aria-label="LinkedIn">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
