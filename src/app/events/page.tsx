'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EventsPage() {
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 24, seconds: 58 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingEvents = [
    {
      id: 'purulia-drive',
      title: 'Purulia Rural Hygiene Kit Drive',
      desc: 'Join us as we distribute 1,200 biodegradable pads, handbooks, and clinical support gear to 3 primary schools in purulia villages.',
      date: 'June 03, 2026',
      time: '09:00 AM - 04:00 PM',
      location: 'Purulia High School Ground, WB',
      slots: '12 open slots',
      badge: 'Immediate Priority',
    },
    {
      id: 'sewing-center',
      title: 'Sewing Machine Skill Center Inauguration',
      desc: 'Opening our 4th vocational stitching center. Training local single mothers on high-efficiency sewing designs.',
      date: 'June 12, 2026',
      time: '11:00 AM - 02:00 PM',
      location: 'Block C Community Hall, Purulia',
      slots: '8 open slots',
      badge: 'Skill Center',
    },
    {
      id: 'gynecologist-camp',
      title: 'Rural Women Health & Gynecology Camp',
      desc: 'Free healthcare camp with certified gynecologists and pediatric clinicians supplying counseling and micro-nutrition tools.',
      date: 'June 24, 2026',
      time: '08:00 AM - 05:00 PM',
      location: 'Sub-Divisional Medical Booth, Purulia',
      slots: '15 open slots',
      badge: 'Clinical Outreach',
    },
  ];

  const handleRsvp = (title: string) => {
    setSelectedEventTitle(title);
    setRsvpSuccess(true);
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.7 },
    });
    setTimeout(() => {
      setRsvpSuccess(false);
    }, 4500);
  };

  return (
    <div className="warm-mesh min-h-screen pt-28 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary-royal/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary-pink font-extrabold font-sora">Active Schedules</span>
          <h1 className="font-sora text-4xl sm:text-5xl font-extrabold text-neutral-charcoal leading-tight">
            Upcoming Action Campaigns & Drives
          </h1>
          <p className="text-neutral-slate text-sm sm:text-base leading-relaxed">
            Be on the ground where it matters. RSVP for our upcoming weekend awareness drives, wellness camps, and vocational workshops.
          </p>
        </div>

        {/* Featured countdown timer */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm mb-16 text-center flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-secondary-pink/5 rounded-full blur-[60px]" />
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary-pink" />
            <span className="text-xs font-bold text-secondary-pink uppercase tracking-widest font-sora">Next Major Drive Countdown</span>
          </div>
          <h3 className="font-sora font-extrabold text-xl text-neutral-charcoal">Purulia Rural Hygiene Kit Distribution</h3>

          {/* Clock timer UI */}
          <div className="flex gap-4 sm:gap-6 justify-center">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hrs', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-1 w-16 sm:w-20 p-3.5 rounded-2xl bg-[#faf7f2] border border-gray-150 shadow-inner">
                <span className="font-sora font-extrabold text-2xl sm:text-3xl text-secondary-pink">{t.val.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-neutral-slate font-bold uppercase">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* List of campaigns */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto mb-16">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-6 text-left hover:scale-101 transition-all duration-300 relative group"
            >
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-150 text-[9px] font-bold text-neutral-slate uppercase tracking-wider">
                    {evt.badge}
                  </span>
                  <span className="text-[10px] text-red-500 font-bold tracking-wider animate-pulse flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {evt.slots}
                  </span>
                </div>
                <h3 className="font-sora font-extrabold text-xl text-neutral-charcoal group-hover:text-primary-royal transition-colors">
                  {evt.title}
                </h3>
                <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">{evt.desc}</p>
                
                {/* Meta details list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-slate font-semibold border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-secondary-pink" /> {evt.date} • {evt.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary-royal" /> {evt.location}</span>
                </div>
              </div>

              {/* Action column */}
              <div className="flex items-center justify-start md:justify-center md:border-l border-gray-100 md:pl-8">
                <button
                  onClick={() => handleRsvp(evt.title)}
                  className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-bold text-xs flex items-center gap-1.5 hover:shadow-md transition-all cursor-pointer"
                >
                  RSVP for Camp
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {rsvpSuccess && (
          <div className="fixed bottom-10 left-10 z-50 p-4 rounded-2xl glass border border-gray-200 bg-[#f6ffed] max-w-sm flex items-start gap-3 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-bold text-neutral-charcoal font-sora">RSVP Confirmed!</span>
              <p className="text-[10px] text-neutral-slate leading-relaxed mt-1">
                You have successfully secured a slot for <strong>{selectedEventTitle}</strong>. A safety training PDF guide has been sent to your email.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
