'use client';

import React from 'react';
import { Award, Compass, ShieldCheck, Heart, Flag, Users, FileText } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Reeta Mishra',
      role: 'Founder & President',
      bio: 'Public Health Advocate & Women Welfare leader, registered under the Indian Society Act, 1860.',
    },
    {
      name: 'Priya Mukherjee',
      role: 'Director of Programs',
      bio: 'Social Activist focused on rural girl child advocacy and policy development at UN bodies.',
    },
    {
      name: 'Amitabh Sharma',
      role: 'Trustee & Finance Head',
      bio: 'Chartered Accountant specializing in NGO audit compliance, tax structures, and transparency.',
    },
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Our Inception',
      desc: 'She Can Foundation was registered with 5 volunteers and held its first menstrual hygiene distribution drive in 2 rural school classrooms.',
    },
    {
      year: '2023',
      title: 'Rural Sanitation Camps',
      desc: 'Expanded drives to 4 districts in West Bengal, distributing 45,000+ hygiene kits and certifying 100+ local village ambassadors.',
    },
    {
      year: '2024',
      title: 'Skill Development Launch',
      desc: 'Inaugurated our first physical vocational training centers for local tailoring, crafts, and computing classes in Purulia.',
    },
    {
      year: '2025',
      title: 'NITI Aayog Partnerships',
      desc: 'Recognized for social impact, helping over 40,000 girls stay in school and securing corporate CSR support from top Indian brands.',
    },
    {
      year: '2026',
      title: 'Global Outreach & Expansion',
      desc: 'Reaching 120,000+ girls directly across multiple Indian states (West Bengal, Bihar, Jharkhand) with automated supply networks.',
    },
  ];

  return (
    <div className="warm-mesh min-h-screen pt-28 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary-royal/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary-pink font-extrabold font-sora">Who We Are</span>
          <h1 className="font-sora text-4xl sm:text-5xl font-extrabold text-neutral-charcoal leading-tight">
            Uplifting the Girl Child,<br />
            <span className="bg-gradient-to-r from-primary-royal to-secondary-pink bg-clip-text text-transparent">
              Empowering India
            </span>
          </h1>
          <p className="text-neutral-slate text-sm sm:text-base leading-relaxed">
            She Can Foundation is a registered national non-governmental organization committed to ending period poverty, facilitating girl-child education, and building female self-reliance since 2022.
          </p>
        </div>

        {/* Mission & Vision grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 text-left">
          <div className="p-8 rounded-3xl bg-white border border-gray-200/50 shadow-sm flex gap-5 hover:scale-101 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center flex-shrink-0 text-secondary-pink">
              <Flag className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-sora font-bold text-lg text-neutral-charcoal">Our Mission</h3>
              <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
                To break deep-rooted menstrual taboos, distribute eco-friendly biodegradable sanitary pads, supply premium learning resources, and establish vocational avenues to help local rural women achieve complete social and financial independence.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200/50 shadow-sm flex gap-5 hover:scale-101 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-primary-royal">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-sora font-bold text-lg text-neutral-charcoal">Our Vision</h3>
              <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
                A clean, equal, and progressive India where no young girl is forced to drop out of school due to lack of basic bodily sanitation, and every rural woman has the skills, health support, and agency to dictate her own future.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Milestones Section */}
        <div className="mb-24">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-secondary-pink font-bold font-sora">Our Journey Timeline</span>
            <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-neutral-charcoal">Milestones of Hope & Progress</h2>
          </div>

          <div className="relative border-l border-gray-200 max-w-3xl mx-auto pl-8 space-y-12 text-left">
            {milestones.map((mil, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-secondary-pink flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-secondary-pink animate-pulse" />
                </div>
                <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white border border-gray-150 shadow-sm group-hover:border-gray-200 transition-all">
                  <span className="font-sora font-extrabold text-xs text-secondary-pink">{mil.year}</span>
                  <h4 className="font-sora font-bold text-base text-neutral-charcoal">{mil.title}</h4>
                  <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">{mil.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Governance Section commented out per user request
        <div className="mb-24">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-secondary-pink font-bold font-sora">Our Governance</span>
            <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-neutral-charcoal">Trustees & Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-gray-200/50 shadow-sm flex flex-col gap-4 text-center hover:scale-102 transition-transform">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-royal to-secondary-pink p-0.5 mx-auto overflow-hidden">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-primary-royal/20 to-secondary-pink/10 flex items-center justify-center text-xl font-bold text-primary-royal">
                      {member.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-sora font-bold text-base text-neutral-charcoal">{member.name}</h4>
                  <span className="text-xs font-semibold text-secondary-pink uppercase">{member.role}</span>
                </div>
                <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
        */}

        {/* NGO Compliance Details */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-neutral-cream border border-gray-200/50 shadow-sm text-left flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-gray-200/50 pb-4">
            <ShieldCheck className="w-7 h-7 text-secondary-pink" />
            <div>
              <h3 className="font-sora font-bold text-lg text-neutral-charcoal">NGO Legal Registry Compliance</h3>
              <p className="text-xs text-neutral-slate">Governed and audit-compliant according to government statutes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-slate">
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-slate/60 font-bold uppercase tracking-wider">Registration Identification</span>
              <p className="font-semibold text-neutral-charcoal">She Can Foundation Trust, West Bengal Government Registry.<br />Reg No: IV-19030248-A / 2022</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-slate/60 font-bold uppercase tracking-wider">Income Tax Exemption</span>
              <p className="font-semibold text-neutral-charcoal">Fully registered under Section 12A & Section 80G of the I.T. Act.<br />80G Unique approval ID: AAETS9482EF20234</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-slate/60 font-bold uppercase tracking-wider">NITI Aayog Darpan ID</span>
              <p className="font-semibold text-neutral-charcoal">Verified NGO partner portal registered under Unique ID:<br />WB/2023/0384917</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-slate/60 font-bold uppercase tracking-wider">Audit Compliance Policy</span>
              <p className="font-semibold text-neutral-charcoal">Audited annually by M/s Sharma & Associates Co. CA. Balance sheets and fund distribution logs published openly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
