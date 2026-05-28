'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Activity, Award, BookOpen, ArrowRight } from 'lucide-react';

export default function ProgramsPage() {
  const campaigns = [
    {
      id: 'hygiene-outreach',
      title: 'Rural Menstrual Hygiene Outreach',
      desc: 'Supplying organic, skin-safe, biodegradable sanitary pads and hosting sanitary education camps in school segments across Bihar and West Bengal villages.',
      tag: 'Menstrual Health',
      raised: 0,
      target: 500000,
      icon: <Activity className="w-5 h-5 text-secondary-pink" />,
      color: 'border-pink-100 hover:border-pink-200',
    },
    {
      id: 'tailoring-literacy',
      title: 'Tailoring & Craft Vocational Centers',
      desc: 'Equipping rural widows and young mothers with heavy-duty sewing machine set-ups, stitching raw materials, and merchant connection portals.',
      tag: 'Skill Uplift',
      raised: 0,
      target: 350000,
      icon: <Award className="w-5 h-5 text-secondary-peach" />,
      color: 'border-amber-100 hover:border-amber-200',
    },
    {
      id: 'rural-computing',
      title: 'Rural Computing & Digital Literacy',
      desc: 'Setting up computer training booths equipped with internet access, basic office software courses, and job application guidance.',
      tag: 'IT Education',
      raised: 0,
      target: 600000,
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-100 hover:border-purple-200',
    },
    {
      id: 'child-nutrition',
      title: 'School Nutrition & Healthcare Drives',
      desc: 'Providing organic protein supplements, healthy daily meals, and clinical pediatric camps led by pediatricians to fight malnourishment.',
      tag: 'Nutrition Support',
      raised: 0,
      target: 400000,
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-100 hover:border-rose-200',
    },
  ];

  return (
    <div className="warm-mesh min-h-screen pt-28 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary-royal/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary-pink font-extrabold font-sora">Active Foundations</span>
          <h1 className="font-sora text-4xl sm:text-5xl font-extrabold text-neutral-charcoal leading-tight">
            Our Core Social Impact Programs
          </h1>
          <p className="text-neutral-slate text-sm sm:text-base leading-relaxed">
            Every program is designed to deliver sustained, structural change. Explore our active campaigns and help fund these initiatives directly.
          </p>
        </div>

        {/* Campaign Cards Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {campaigns.map((camp) => {
            const percentage = Math.min(Math.round((camp.raised / camp.target) * 100), 100);
            return (
              <div
                key={camp.id}
                className={`rounded-3xl bg-white border ${camp.color} p-8 flex flex-col justify-between gap-6 text-left group hover:scale-101 transition-all duration-300 shadow-sm`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-150 text-[10px] font-bold text-neutral-slate uppercase tracking-wider">
                      {camp.icon}
                      {camp.tag}
                    </span>
                    <span className="text-xs font-semibold text-neutral-slate/50">Active Camp</span>
                  </div>
                  <h3 className="font-sora font-extrabold text-xl text-neutral-charcoal group-hover:text-primary-royal transition-colors">
                    {camp.title}
                  </h3>
                  <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
                    {camp.desc}
                  </p>
                </div>

                {/* Raised progress */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-neutral-slate font-semibold">
                    <span>Fund raised: <strong className="text-neutral-charcoal">₹{camp.raised.toLocaleString()}</strong></span>
                    <span>Target: <strong className="text-neutral-charcoal">₹{camp.target.toLocaleString()}</strong></span>
                  </div>
                  <div className="relative w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-royal to-secondary-pink rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-secondary-pink">{percentage}% Completed</span>
                    <Link
                      href={`/donate?campaignId=${camp.id}&amount=1500`}
                      className="inline-flex items-center gap-1.5 text-primary-royal font-bold hover:text-secondary-pink transition-colors group/link"
                    >
                      Fund this Program
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Impact Trust Grid */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-neutral-cream border border-gray-200/50 text-center flex flex-col gap-8 shadow-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold text-secondary-pink uppercase tracking-widest font-sora">Financial Ethics</span>
            <h3 className="font-sora font-bold text-2xl text-neutral-charcoal">How Your Funds Are Allocated</h3>
            <p className="text-xs text-neutral-slate max-w-xl mx-auto">We are governed under strict government social trust compliance audits. Here is where every single rupee you contribute is utilized.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/50 flex flex-col gap-1.5 shadow-xs">
              <span className="text-3xl font-extrabold font-sora text-green-600">92%</span>
              <span className="text-xs font-bold text-neutral-charcoal">Direct Beneficiary Aid</span>
              <p className="text-[10px] text-neutral-slate/75 leading-relaxed">Pads manufacturing, kit supplies, school fee payments, clinic tools.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/50 flex flex-col gap-1.5 shadow-xs">
              <span className="text-3xl font-extrabold font-sora text-primary-royal">5%</span>
              <span className="text-xs font-bold text-neutral-charcoal">Volunteer & Staff Support</span>
              <p className="text-[10px] text-neutral-slate/75 leading-relaxed">On-ground transport, local community teacher stipends, safety gear.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/50 flex flex-col gap-1.5 shadow-xs">
              <span className="text-3xl font-extrabold font-sora text-secondary-pink">3%</span>
              <span className="text-xs font-bold text-neutral-charcoal">Admin & Secure Tech</span>
              <p className="text-[10px] text-neutral-slate/75 leading-relaxed">Payment gateway, hosting, legal audit compliance filings, trust tax fees.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
