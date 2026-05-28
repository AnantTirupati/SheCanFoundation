'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shield, Award, Users, BookOpen, MapPin, Smile, ArrowRight, Star, ChevronLeft, ChevronRight, Activity, Globe, Compass, FileText } from 'lucide-react';

export default function HomePage() {
  const [donateAmount, setDonateAmount] = useState(1500);
  const [activeStoryTab, setActiveStoryTab] = useState<'before' | 'after'>('before');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Animated counters state
  const [girlsHelped, setGirlsHelped] = useState(0);
  const [padsDistributed, setPadsDistributed] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.success) {
          const targetGirls = data.girlsHelped || 1000;
          const targetPads = data.padsDistributed || 10000;
          const targetVolunteers = data.volunteersCount || 2000;

          const duration = 1200;
          const steps = 30;
          const stepTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            setGirlsHelped(Math.floor((targetGirls / steps) * step));
            setPadsDistributed(Math.floor((targetPads / steps) * step));
            setVolunteersCount(Math.floor((targetVolunteers / steps) * step));

            if (step >= steps) {
              setGirlsHelped(targetGirls);
              setPadsDistributed(targetPads);
              setVolunteersCount(targetVolunteers);
              clearInterval(timer);
            }
          }, stepTime);
        }
      } catch (err) {
        console.error('Failed to fetch real-time stats:', err);
      }
    }
    fetchStats();
  }, []);

  const programs = [
    {
      title: 'Menstrual Hygiene Awareness',
      desc: 'Breaking absolute silence. Supplying biodegradable pads, conducting village schools sanitization workshops, and debunking deep rural period myths.',
      icon: <Activity className="w-5.5 h-5.5 text-primary-royal" />,
      tag: 'Medical Hygiene',
      bg: 'bg-white border-gray-100',
    },
    {
      title: 'Vocational Skill Center Workshops',
      desc: 'Enabling sustainable income. Supplying heavy tailoring set-ups and design mentors so village mothers gain absolute financial autonomy.',
      icon: <Award className="w-5.5 h-5.5 text-secondary-pink" />,
      tag: 'Self-Reliance',
      bg: 'bg-white border-gray-100',
    },
    {
      title: 'Dignified School Scholarships',
      desc: 'Combating school dropouts. Supplying complete study packs, uniforms, and monthly academic stipends for daughters of single parent households.',
      icon: <BookOpen className="w-5.5 h-5.5 text-accent-gold" />,
      tag: 'Education Aid',
      bg: 'bg-white border-gray-100',
    },
    {
      title: 'Rural Wellness & Pediatric Camps',
      desc: 'Providing baseline clinical consultations. Certified doctors providing free checkups, prenatal support, and health supplements.',
      icon: <Heart className="w-5.5 h-5.5 text-red-500" />,
      tag: 'Community Care',
      bg: 'bg-white border-gray-100',
    },
  ];

  const testimonials = [
    {
      quote: "Before She Can Foundation arrived, I used to miss school 5 days every single month. Today, not only am I attending class regularly, but I also coordinate hygiene education for 30 other girls in my village.",
      author: "Priya Murmu",
      role: "Class 10 Student, Purulia (West Bengal)",
      rating: 5,
    },
    {
      quote: "The tailoring center saved my family. Lacking resources as a single mother, I had no stable income. Today, my shop caters to three villages, and my daughters go to school with full study kits.",
      author: "Sarita Devi",
      role: "Boutique Proprietor & Skill Graduate, Bihar",
      rating: 5,
    },
    {
      quote: "Organizing kit distribution drives in remote schools has redefined my social purpose. Watching a young girl receive her hygiene set with a big smile is a feeling that cannot be explained.",
      author: "Rohan Sen",
      role: "Lead Field Volunteer, Kolkata",
      rating: 5,
    },
  ];

  const getDonationImpact = (amount: number) => {
    if (amount <= 500) return 'Supplies organic, skin-safe pads & personal counseling sessions to 2 young girls for 3 full months.';
    if (amount <= 1500) return 'Provides standard school bags, notebooks, sanitizers, and daily meals for 3 rural students.';
    if (amount <= 3000) return 'Provides structural sewing raw materials and machine training setups for a village mother to gain self-reliance.';
    if (amount <= 5000) return 'Sponsors a complete clinical camp, pediatrician consultations, and dietary support in a tribal hamlet.';
    return 'Ensures holistic monthly pediatric checkups, sanitization packs, and school guides for 6 underprivileged families.';
  };

  return (
    <div className="warm-mesh min-h-screen relative overflow-hidden text-neutral-charcoal">
      {/* Subtle watercolor backgrounds */}
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />

      {/* 1. HERO SECTION (Split 55/45 Layout, Light warm visual design) */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Copy, CTAs, and trust badges */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf4ff] border border-pink-100 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-secondary-pink" />
                <span className="text-[10px] font-bold tracking-widest text-secondary-pink uppercase font-sora">
                  A Humanitarian Cause, Not Just a Website
                </span>
              </div>
              
              <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-neutral-charcoal">
                Empower Her.<br />
                <span className="bg-gradient-to-r from-primary-royal to-secondary-pink bg-clip-text text-transparent">
                  Educate India.
                </span><br />
                Uplift Communities.
              </h1>
              
              {/* Documentary storytelling subtext */}
              <div className="flex flex-col gap-2 max-w-xl">
                <p className="text-neutral-slate text-sm sm:text-base leading-relaxed">
                  In rural Indian villages, a young girl misses school every month due to period poverty, isolation, and lack of clean sanitation. 
                </p>
                <p className="text-primary-deep font-semibold text-xs sm:text-sm tracking-wide">
                  — <span className="handwritten text-base text-secondary-pink">We changed that for 120,000+ girls.</span> And we are just getting started.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-2">
                <Link
                  href="/donate"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-bold text-xs hover:shadow-md hover:scale-102 transition-all flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-white/10" />
                  Donate Now
                </Link>
                <Link
                  href="/volunteer"
                  className="px-8 py-3.5 rounded-full bg-white border border-gray-200 text-neutral-charcoal font-bold text-xs hover:bg-gray-50 hover:scale-102 transition-all flex items-center gap-1.5"
                >
                  Become a Volunteer
                  <ArrowRight className="w-4 h-4 text-secondary-pink" />
                </Link>
              </div>

              {/* Minimal Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-200/50 text-[11px] text-neutral-slate font-semibold">
                <span className="flex items-center gap-1.5">
                  <Smile className="w-4.5 h-4.5 text-secondary-pink" />
                  120,000+ Girls Helped
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-primary-royal" />
                  PAN India Impact
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4.5 h-4.5 text-accent-gold" />
                  NITI Aayog Affiliated
                </span>
              </div>
            </div>

            {/* Right: High-trust organic documentary collage (Replaces SaaS panels) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] h-[480px]">
                {/* Collage Image 1: Main Rural Outreach */}
                <div className="absolute top-0 left-0 w-[78%] h-[68%] rounded-3xl overflow-hidden shadow-md border-4 border-white z-20 group">
                  <img
                    src="/volunteers_distributing.png"
                    alt="Volunteers in action distributing sanitation kits to smiling girls"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-bold text-white tracking-widest uppercase">Purulia Awareness Drive</span>
                </div>

                {/* Collage Image 2: Skill Workshops */}
                <div className="absolute bottom-2 right-0 w-[62%] h-[52%] rounded-3xl overflow-hidden shadow-md border-4 border-white z-30 group">
                  <img
                    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600"
                    alt="Women learning sewing skills in vocational classroom"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-bold text-white tracking-widest uppercase">Stitching Self-Reliance</span>
                </div>

                {/* Collage Image 3: Education/Rural School Kids */}
                <div className="absolute top-1/4 right-0 w-[42%] h-[38%] rounded-2xl overflow-hidden shadow-sm border-4 border-white z-10 grayscale group-hover:grayscale-0 transition-all group">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400"
                    alt="Rural Indian students learning"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Soft, non-neon overlay trust cards */}
                <div className="absolute -bottom-2 -left-4 p-4 rounded-2xl glass shadow-md border border-gray-100 z-40 text-left flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-slate font-bold">Scope of Support</span>
                  <span className="font-sora font-extrabold text-base text-primary-royal">345+ Villages</span>
                  <span className="text-[8px] text-neutral-slate/70 font-semibold">12 States Reached</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. DOCUMENTARY NARRATIVE STATS BOARD (Cream-Mesh Background) */}
      <section className="relative py-20 bg-neutral-cream border-y border-gray-100 cream-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-pink font-bold font-sora">A Movement of Grace</span>
            <h2 className="font-sora font-bold text-2xl sm:text-3xl text-neutral-charcoal mt-1">Our Verified Milestones of Hope</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-left flex flex-col gap-2 relative">
              <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-secondary-pink mb-2">
                <Smile className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-sora font-extrabold text-3xl text-neutral-charcoal">
                {girlsHelped.toLocaleString()}+
              </h3>
              <span className="text-xs font-bold text-neutral-slate">Underprivileged Girls Mentored</span>
              <p className="text-[11px] text-neutral-slate/70 leading-relaxed">Regular kits delivery keeping young students active and in school.</p>
            </div>

            {/* Stat 2 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-left flex flex-col gap-2 relative">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-primary-royal mb-2">
                <Activity className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-sora font-extrabold text-3xl text-neutral-charcoal">
                {padsDistributed.toLocaleString()}+
              </h3>
              <span className="text-xs font-bold text-neutral-slate">Organic Pads Distributed</span>
              <p className="text-[11px] text-neutral-slate/70 leading-relaxed">Sourced from self-help cooperatives, ensuring skin-safety and hygiene.</p>
            </div>

            {/* Stat 3 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-left flex flex-col gap-2 relative">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-accent-gold mb-2">
                <Users className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-sora font-extrabold text-3xl text-neutral-charcoal">
                {volunteersCount.toLocaleString()}+
              </h3>
              <span className="text-xs font-bold text-neutral-slate">Registered Champions</span>
              <p className="text-[11px] text-neutral-slate/70 leading-relaxed">Certified students, gynecologists, CA specialists, and field trainers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EMOTIONAL DOCUMENTARY STORYTELLING (Priya's Transformation) */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[480px] h-[360px] rounded-3xl overflow-hidden shadow-md border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
                  alt="Rural smiling beneficiary student"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 text-left flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary-peach" />
                  <span className="text-xs font-bold text-white tracking-wider">Purulia School Campaign</span>
                </div>
              </div>
            </div>

            {/* Narrative copy */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-pink font-bold font-sora">A True Story of Change</span>
                <h2 className="font-sora text-3xl font-extrabold text-neutral-charcoal leading-snug">
                  "I was forced to miss classes."
                </h2>
                <p className="text-neutral-slate text-sm sm:text-base leading-relaxed">
                  Priya Murmu is 14. When her cycle started, period taboos and lack of running water forced her to sit at home 5 days every single month. Old cloths caused chronic health hazards, destroying her confidence.
                </p>
                <p className="text-neutral-charcoal text-xs sm:text-sm font-semibold italic border-l-4 border-secondary-pink pl-4 my-2 leading-relaxed">
                  "Our volunteers held an outreach camp at her school. Today, Priya is fully sanitized with organic sets, enjoys 92% attendance, and tutors other girls."
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/about"
                  className="py-3 px-6 rounded-full border border-gray-200 text-neutral-charcoal font-bold text-xs hover:bg-gray-50 transition-colors"
                >
                  Read Priya's Full Profile
                </Link>
                <Link
                  href="/donate?campaignId=hygiene-outreach"
                  className="py-3 px-6 rounded-full bg-primary-royal text-white font-bold text-xs hover:shadow-md transition-all"
                >
                  Sponsor a Girl like Priya
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. CORE IMPACT PROGRAMS (Alternate Light-Cream Section) */}
      <section className="relative py-24 bg-neutral-cream border-t border-gray-100 cream-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-pink font-bold font-sora">Strategic Actions</span>
            <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-neutral-charcoal">Our Focus Fields & Actions</h2>
            <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
              We resolve systemic barriers directly through long-term educational and medical integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-left flex gap-5 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#faf7f2] border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:scale-103 transition-transform">
                  {prog.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-extrabold text-primary-royal uppercase tracking-widest">{prog.tag}</span>
                    <span className="text-neutral-slate/50 font-bold uppercase tracking-wider">Active Pillar</span>
                  </div>
                  <h3 className="font-sora font-extrabold text-base sm:text-lg text-neutral-charcoal">{prog.title}</h3>
                  <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE DONATION IMPACT CALCULATOR (Cream-Mesh Background Card) */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-warm border border-gray-200/50 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden text-left flex flex-col gap-8">
            <div className="absolute top-0 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-secondary-peach/5 rounded-full blur-[80px]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Info */}
              <div className="lg:col-span-6 flex flex-col gap-5 text-left">
                <span className="text-[10px] uppercase tracking-widest text-secondary-pink font-bold font-sora">Empower Through Support</span>
                <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-neutral-charcoal">Measure Your Contribution</h2>
                <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
                  We publish comprehensive balance sheets annually. Adjust the amount below to see exactly what products and counselor coordinates your donation guarantees on the ground.
                </p>

                {/* presets */}
                <div className="flex flex-wrap gap-2.5">
                  {[500, 1500, 3000, 5000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDonateAmount(amt)}
                      className={`py-2 px-4 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        donateAmount === amt
                          ? 'bg-gradient-to-r from-primary-royal to-secondary-pink text-white border-transparent shadow-sm'
                          : 'bg-white border-gray-200 text-neutral-slate hover:border-gray-300'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Calculator Card */}
              <div className="lg:col-span-6">
                <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col gap-5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-slate uppercase">Donation Amount</span>
                    <strong className="font-sora font-extrabold text-2xl text-primary-royal">₹{donateAmount.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={donateAmount}
                    onChange={(e) => setDonateAmount(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-gray-100 appearance-none cursor-pointer accent-secondary-pink focus:outline-none"
                  />

                  {/* Impact block */}
                  <div className="p-4 rounded-xl bg-[#fff9f5] border border-pink-100/50 flex gap-2.5 text-left">
                    <Sparkles className="w-5 h-5 text-secondary-peach flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[9px] font-bold text-secondary-pink uppercase tracking-wider mb-0.5">Verified Camp Impact</span>
                      <p className="text-[11px] text-neutral-charcoal/90 leading-relaxed font-medium">
                        {getDonationImpact(donateAmount)}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/donate?amount=${donateAmount}`}
                    className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-bold text-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    Proceed to Safe Donation Portal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY TESTIMONIALS (Cream-Mesh Background) */}
      <section className="relative py-20 bg-neutral-cream border-t border-gray-100 cream-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-pink font-bold font-sora">Stories of Action</span>
            <h2 className="font-sora font-bold text-2xl sm:text-3xl text-neutral-charcoal mt-1">Real Voices, Real Dignity</h2>
          </div>

          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white border border-gray-100 shadow-sm relative flex flex-col gap-5">
            <div className="flex justify-center gap-0.5">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent-gold fill-accent-gold" />
              ))}
            </div>

            <p className="font-sora text-sm sm:text-base italic text-neutral-charcoal leading-relaxed px-4">
              "{testimonials[currentTestimonial].quote}"
            </p>

            <div className="flex flex-col">
              <span className="font-bold text-xs text-primary-royal font-sora">{testimonials[currentTestimonial].author}</span>
              <span className="text-[9px] text-neutral-slate font-medium">{testimonials[currentTestimonial].role}</span>
            </div>

            {/* Navigators */}
            <div className="flex justify-center gap-3 mt-1">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-1.5 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 text-neutral-slate transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-1.5 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 text-neutral-slate transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VOLUNTEER MOVEMENT CALL TO ACTION (Elegant Premium Dark contrast element) */}
      <section className="relative py-24 bg-[#111827] text-white">
        <div className="absolute inset-0 watercolor-overlay opacity-20 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#1f2937] to-[#111827] border border-white/5 flex flex-col gap-6 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-white">
              Be Part of Priya's Future
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Every on-ground campaign depends on our voluntary networks. Spend 4 hours a week mentoring mothers, distributing eco-friendly sanitary kits, or organizing clinics. We provide experience credentials upon completion.
            </p>
            <div className="flex justify-center gap-3.5 mt-2">
              <Link
                href="/volunteer"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-secondary-pink to-secondary-peach text-neutral-charcoal font-bold text-xs hover:shadow-md hover:scale-102 transition-all"
              >
                Become a Volunteer
              </Link>
              <Link
                href="/about"
                className="px-7 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all"
              >
                Our Vision Parameters
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
