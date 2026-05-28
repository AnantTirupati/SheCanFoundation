'use client';

import React, { useState } from 'react';
import { Users, Award, FileSpreadsheet, Send, CheckCircle2, Download, Upload, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VolunteerPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [selectedRole, setSelectedRole] = useState('hygiene-trainer');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Resume file size should be less than 2MB.');
      return;
    }

    setResumeName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setResume(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearFile = () => {
    setResume(null);
    setResumeName('');
  };

  const roles = [
    {
      id: 'hygiene-trainer',
      title: 'Menstrual Hygiene Camp Trainer',
      desc: 'Conduct health workshops in rural classrooms, teaching young girls about safe sanitation habits and distributing eco-pads.',
      hours: '6 hours / week',
    },
    {
      id: 'skill-mentor',
      title: 'Vocational Skill Mentor',
      desc: 'Guide local village mothers in basic bookkeeping, tailoring designs, digital marketing, or basic computer operation.',
      hours: '4 hours / week',
    },
    {
      id: 'outreach-coordinator',
      title: 'Rural Logistics Coordinator',
      desc: 'Help manage kit inventories, coordinate local transport drives, and support doctors during weekend clinical camps.',
      hours: '8 hours / week',
    },
  ];

  const skillOptions = [
    'Public Health Advocacy',
    'Language Translation (Bengali/Hindi)',
    'Logistics Management',
    'Stitching/Design Skills',
    'Basic Computer Skills',
    'Event Management',
  ];

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !bio) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    // Contact number validation (allows 10-digit Indian number, with optional +91 or 0 prefix)
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      alert('Please enter a valid 10-digit contact number (starting with 6, 7, 8, or 9).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          bio,
          skills,
          resume,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSubmitted(true);
        confetti({
          particleCount: 120,
          spread: 60,
          origin: { y: 0.65 },
        });
      } else {
        alert(data.error || 'Failed to submit application.');
      }
    } catch (err: any) {
      setLoading(false);
      alert('Network error submitting volunteer registration: ' + err.message);
    }
  };

  // Removed downloadCertificate logic to simplify registration flow

  return (
    <div className="warm-mesh min-h-screen pt-28 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary-royal/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Volunteer opportunities info */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-secondary-pink font-bold font-sora">Be a Social Leader</span>
                <h1 className="font-sora text-3xl sm:text-4xl font-extrabold text-neutral-charcoal">Join Our Volunteer Network</h1>
                <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
                  Our movement thrives on volunteer commitment. By lending a few hours a week, you can teach young daughters, organize camp logistics, or coordinate skill workshops. Join 2,400+ champions today!
                </p>
              </div>

              {/* Roles cards */}
              <div className="flex flex-col gap-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-5 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      selectedRole === role.id
                        ? 'bg-gradient-to-br from-primary-royal/10 to-secondary-pink/5 border-secondary-pink shadow-xs'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <h4 className="font-sora font-extrabold text-neutral-charcoal">{role.title}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-[9px] font-bold text-secondary-pink">
                        {role.hours}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-slate leading-relaxed">{role.desc}</p>
                  </div>
                ))}
              </div>

              {/* Verified Certificate Trust banner */}
              <div className="p-5 rounded-2xl bg-neutral-cream border border-gray-200/50 flex gap-4 text-xs shadow-sm">
                <Award className="w-8 h-8 text-secondary-pink flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-sora font-bold text-neutral-charcoal">Verified Experience Certificate</span>
                  <p className="text-[11px] text-neutral-slate leading-relaxed">
                    Every volunteer who completes 40 hours of on-ground camp participation receives a verified certificate from the She Can Foundation Trust, recognized by academic and government bodies.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div className="lg:col-span-6">
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6 text-left">
                <h3 className="font-sora font-bold text-lg text-neutral-charcoal border-b border-gray-100 pb-3 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-secondary-pink" />
                  Application Form
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-slate uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sreya Dutta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sreya@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors"
                    />
                  </div>
                </div>

                {/* Skill selectors */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-slate uppercase mb-1">Select your skills / strengths</label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => {
                      const isSelected = skills.includes(skill);
                      return (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`py-1.5 px-3 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-secondary-pink/15 border-secondary-pink text-secondary-pink'
                              : 'bg-white border-gray-200 text-neutral-slate hover:border-gray-300 hover:text-neutral-charcoal'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-slate uppercase">Tell us why you want to join</label>
                  <textarea
                    required
                    placeholder="Briefly state your commitment..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors resize-none"
                  />
                </div>

                {/* Optional Resume Upload field with highly aesthetic modern design */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Upload Resume</label>
                    <span className="text-[9px] font-bold text-secondary-pink bg-secondary-pink/5 px-2 py-0.5 rounded-full border border-secondary-pink/10 font-sora">Recommended</span>
                  </div>
                  
                  {!resume ? (
                    <label className="border-2 border-dashed border-gray-200 hover:border-secondary-pink rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-secondary-pink/5 group">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-secondary-pink group-hover:scale-110 transition-all duration-300 animate-pulse" />
                      <span className="text-[11px] font-bold text-neutral-slate group-hover:text-neutral-charcoal transition-colors">
                        Click to upload resume (.pdf, .doc, .docx)
                      </span>
                      <span className="text-[9px] text-gray-400">
                        Max file size: 2MB
                      </span>
                    </label>
                  ) : (
                    <div className="border border-green-200 bg-green-50/50 rounded-xl p-3.5 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="p-1.5 bg-green-100 rounded-lg text-green-600 flex-shrink-0">
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                          <span className="text-[11px] font-bold text-neutral-charcoal truncate">{resumeName}</span>
                          <span className="text-[9px] text-green-600 font-bold">Ready to submit</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearFile}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-all flex-shrink-0 cursor-pointer"
                        title="Remove file"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
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
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Application success state */
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-gray-200 shadow-sm text-center flex flex-col gap-6 items-center animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-secondary-pink font-bold font-sora">Registration Accepted</span>
              <h2 className="font-sora text-3xl font-extrabold text-neutral-charcoal">Welcome to the Family, {name.split(' ')[0]}!</h2>
              <p className="text-neutral-slate text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you for applying for the <strong>{selectedRole.replace('-', ' ').toUpperCase()}</strong> role. Our camp team will review your skills matrix and contact you via email shortly!
              </p>
            </div>

            {/* Certificate download widget has been removed as per user request */}

            <button
              onClick={() => setSubmitted(false)}
              className="py-2.5 px-5 rounded-xl bg-white border border-gray-250 text-neutral-charcoal font-semibold text-xs hover:bg-gray-50 cursor-pointer"
            >
              Register another candidate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
