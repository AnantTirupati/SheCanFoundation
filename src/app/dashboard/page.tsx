'use client';

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Heart, Sparkles, PlusCircle, CheckCircle2, XCircle, BarChart3, Download, FileText, Activity } from 'lucide-react';
import { signOut } from 'next-auth/react';
import confetti from 'canvas-confetti';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'volunteers' | 'cms'>('overview');

  // Dashboard Stats States
  const [totalDonations, setTotalDonations] = useState(0);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [pendingVolunteers, setPendingVolunteers] = useState<any[]>([]);
  const [verifiedVolunteersCount, setVerifiedVolunteersCount] = useState(0);

  // Campaign States
  const [campaignList, setCampaignList] = useState<any[]>([]);

  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignTarget, setNewCampaignTarget] = useState('');
  const [newCampaignCategory, setNewCampaignCategory] = useState('Menstrual Health');

  // AI features states
  const [aiReport, setAiReport] = useState('');
  const [generatingReport, setGeneratingReport] = useState(false);
  const [aiBlogIdeas, setAiBlogIdeas] = useState<string[]>([]);
  const [generatingBlogIdeas, setGeneratingBlogIdeas] = useState(false);

  // Load live data from REST APIs
  async function loadDashboardData() {
    try {
      // 1. Fetch dynamic stats
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setTotalDonations(statsData.totalDonations);
        setActiveCampaigns(statsData.activeCampaignsCount);
        setVerifiedVolunteersCount(statsData.volunteersCount);
      }

      // 2. Fetch volunteers
      const volRes = await fetch('/api/volunteers');
      const volData = await volRes.json();
      if (volData.success) {
        // Filter for PENDING volunteers
        const pending = volData.volunteers.filter((v: any) => v.status === 'PENDING');
        setPendingVolunteers(pending);
      }

      // 3. Fetch campaigns
      const campRes = await fetch('/api/campaigns');
      const campData = await campRes.json();
      if (campData.success) {
        const mapped = campData.campaigns.map((c: any) => ({
          id: c.id,
          title: c.title,
          raised: c.raisedAmount,
          target: c.targetAmount,
          category: c.category,
        }));
        setCampaignList(mapped);
      }
    } catch (err) {
      console.error('Failed to load dynamic dashboard data:', err);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Volunteer approval handlers
  const handleApproveVolunteer = async (id: string, name: string) => {
    try {
      const res = await fetch('/api/volunteers/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          action: 'approve',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPendingVolunteers((prev) => prev.filter((v) => v.id !== id));
        setVerifiedVolunteersCount((prev) => prev + 1);
        confetti({
          particleCount: 50,
          spread: 40,
          origin: { y: 0.8 },
        });
        alert(`Volunteer application approved for ${name}! Database status updated in real-time.`);
      } else {
        alert(data.error || 'Failed to approve volunteer.');
      }
    } catch (err: any) {
      alert('Error approving volunteer: ' + err.message);
    }
  };

  const handleRejectVolunteer = async (id: string, name: string) => {
    try {
      const res = await fetch('/api/volunteers/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          action: 'reject',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPendingVolunteers((prev) => prev.filter((v) => v.id !== id));
        alert(`Volunteer application rejected for ${name}. Database status updated.`);
      } else {
        alert(data.error || 'Failed to reject volunteer.');
      }
    } catch (err: any) {
      alert('Error rejecting volunteer: ' + err.message);
    }
  };

  // Campaign create handler
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignTitle || !newCampaignTarget) {
      alert('Please fill out the Campaign Title and Target Amount.');
      return;
    }
    
    try {
      const res = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newCampaignTitle,
          targetAmount: Number(newCampaignTarget),
          category: newCampaignCategory,
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        const newCamp = {
          id: data.campaign.id,
          title: data.campaign.title,
          raised: data.campaign.raisedAmount,
          target: data.campaign.targetAmount,
          category: data.campaign.category,
        };
        setCampaignList((prev) => [newCamp, ...prev]);
        setActiveCampaigns((prev) => prev + 1);
        setNewCampaignTitle('');
        setNewCampaignTarget('');
        alert('New social campaign successfully created and saved in Supabase!');
      } else {
        alert(data.error || 'Failed to create campaign.');
      }
    } catch (err: any) {
      alert('Error creating campaign: ' + err.message);
    }
  };

  // AI Report Generator Simulation
  const handleGenerateAiReport = () => {
    setGeneratingReport(true);
    setAiReport('');
    setTimeout(() => {
      setGeneratingReport(false);
      setAiReport(`
=========================================
      SHE CAN SOCIAL IMPACT SUMMARY      
=========================================
GENERATED ON: ${new Date().toLocaleDateString()}
DB TARGET ENGINE: SUPABASE-POSTGRES

1. FINANCIAL OUTLOOK:
  - Total donations processed: ₹${totalDonations.toLocaleString()} INR.
  - Active campaigns managed: ${activeCampaigns} drives.
  - Average transaction amount: ₹2,150.

2. VOLUNTEER PARTICIPATION INDEX:
  - Verified active members: ${verifiedVolunteersCount} profiles.
  - Retention rate: 94.2% month-on-month.

3. STRATEGIC INSIGHTS & SUGGESTIONS:
  - Recommendation A: Allocate 15% more budget towards Rural Menstrual Hygiene drives in Purulia where school dropout ratios dropped by 34% this quarter.
  - Recommendation B: Expand vocational tailoring center merchant connections to nearby urban markets to boost self-reliance income outputs.
      `);
    }, 1800);
  };

  // AI Blog Ideas Brainstormer Simulation
  const handleBrainstormBlogIdeas = () => {
    setGeneratingBlogIdeas(true);
    setAiBlogIdeas([]);
    setTimeout(() => {
      setGeneratingBlogIdeas(false);
      setAiBlogIdeas([
        "How Biodegradable Bamboo Charcoal Pads End Period Poverty Securely",
        "Breaking Rural Silence: The Journey of a Purulia Health Ambassador",
        "CA Certified Transparency: Why Financial Ethics is the NGO Cornerstone",
        "Tailoring Hope: A Single Mother's Rise in Block C community center",
      ]);
    }, 1200);
  };

  const printAiReport = () => {
    if (!aiReport) return;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>AI Impact Report - She Can Foundation</title>
            <style>
              body { font-family: monospace; white-space: pre-wrap; font-size: 14px; line-height: 1.6; padding: 40px; color: #222; }
            </style>
          </head>
          <body>${aiReport}</body>
        </html>
      `);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-[#fff9f5] flex relative overflow-hidden warm-mesh text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200/60 bg-[#faf7f2]/90 backdrop-blur-xl hidden lg:flex flex-col justify-between py-8 px-4 relative z-10 flex-shrink-0">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="px-4 flex flex-col gap-1 text-left">
            <h2 className="font-sora font-extrabold text-lg text-neutral-charcoal flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-secondary-pink" />
              SaaS Admin
            </h2>
            <span className="text-[10px] text-neutral-slate/60 font-bold uppercase tracking-wider">She Can Workspace</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'overview', name: 'Analytics Overview', icon: <Activity className="w-4 h-4" /> },
              { id: 'campaigns', name: 'Campaign Managers', icon: <PlusCircle className="w-4 h-4" /> },
              { id: 'volunteers', name: 'Volunteers Panel', icon: <Users className="w-4 h-4" /> },
              { id: 'cms', name: 'AI CMS Brainstorms', icon: <Sparkles className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all text-left focus:outline-none cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-royal to-secondary-pink text-white shadow-xs'
                      : 'text-neutral-slate hover:bg-gray-100 hover:text-neutral-charcoal'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Legal credentials & Log Out */}
        <div className="px-4 flex flex-col gap-3.5 border-t border-gray-200/50 pt-4 text-left">
          <button
            onClick={() => signOut({ callbackUrl: '/dashboard/login' })}
            className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs text-center transition-colors cursor-pointer"
          >
            Log Out Workspace
          </button>
          <div className="text-[9px] text-neutral-slate/50 font-bold flex flex-col gap-0.5">
            <span>Supabase DB connected</span>
            <span>Razorpay gateway: ACTIVE</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto relative z-10 max-w-full">
        {/* Mobile top toggler */}
        <div className="lg:hidden flex gap-2 overflow-x-auto whitespace-nowrap mb-6 border-b border-gray-200/50 pb-3">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'campaigns', name: 'Campaigns' },
            { id: 'volunteers', name: 'Volunteers' },
            { id: 'cms', name: 'AI CMS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-royal to-secondary-pink text-white'
                  : 'bg-white border border-gray-200 text-neutral-slate'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Active Panel View */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left border-b border-gray-200/50 pb-6">
              <div>
                <h1 className="font-sora font-extrabold text-2xl text-neutral-charcoal">System Analytics</h1>
                <p className="text-xs text-neutral-slate">Live metrics extracted directly from verified transactional databases.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-[10px] font-bold text-green-600">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> Live feeds active
                </span>
              </div>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Funds Raised', val: `₹${totalDonations.toLocaleString()}`, label: '+12.4% this month', icon: <Heart className="w-5 h-5 text-secondary-pink" /> },
                { title: 'Verified Champions', val: verifiedVolunteersCount.toLocaleString(), label: '+4 pending reviews', icon: <Users className="w-5 h-5 text-primary-royal" /> },
                { title: 'Active Campaigns', val: activeCampaigns, label: '1 completed this week', icon: <PlusCircle className="w-5 h-5 text-secondary-peach" /> },
                { title: 'Cities Impacted', val: '45+', label: 'Across 3 Indian States', icon: <Sparkles className="w-5 h-5 text-accent-gold" /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex justify-between items-start text-left relative overflow-hidden">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-extrabold text-neutral-slate/60 uppercase tracking-wider font-sora">{c.title}</span>
                    <strong className="font-sora font-extrabold text-xl text-neutral-charcoal">{c.val}</strong>
                    <span className="text-[10px] text-neutral-slate/75 font-semibold">{c.label}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/50">
                    {c.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Analytics Chart */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm text-left">
              <h3 className="font-sora font-bold text-sm sm:text-base text-neutral-charcoal mb-6 flex justify-between items-center">
                Donation Accumulations (2026 Monthly Trend)
                <span className="text-[10px] text-neutral-slate font-bold uppercase tracking-wider flex items-center gap-1"><BarChart3 className="w-4 h-4 text-secondary-pink" /> Database metrics</span>
              </h3>
              
              {/* Custom SVG Line Chart with premium clean styling */}
              <div className="w-full h-56 bg-gray-50 rounded-2xl border border-gray-150 relative flex items-end p-4 shadow-inner">
                <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 500 200">
                  <path
                    d="M 0 160 Q 100 120 200 110 T 300 70 T 400 40 T 500 20"
                    fill="none"
                    stroke="url(#neon-grad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="neon-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* X Axis indicators */}
                <div className="w-full flex justify-between text-[9px] text-neutral-slate font-bold uppercase pt-2 relative z-10">
                  <span>Jan (₹2.4L)</span>
                  <span>Feb (₹4.1L)</span>
                  <span>Mar (₹5.5L)</span>
                  <span>Apr (₹8.2L)</span>
                  <span>May (₹12.5L)</span>
                </div>
              </div>
            </div>

            {/* AI Report Generator Box */}
            <div className="p-6 rounded-3xl bg-neutral-cream border border-gray-200/50 shadow-sm text-left flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-secondary-pink animate-pulse" />
                <div>
                  <h3 className="font-sora font-extrabold text-base text-neutral-charcoal">AI Impact Report Generator</h3>
                  <p className="text-[11px] text-neutral-slate leading-relaxed">Aggregates all transaction logs & volunteer profiles to compile downloadable briefs.</p>
                </div>
              </div>

              {!aiReport ? (
                <button
                  onClick={handleGenerateAiReport}
                  disabled={generatingReport}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-semibold text-xs self-start flex items-center gap-1.5 hover:shadow-md cursor-pointer"
                >
                  {generatingReport ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Aggregating logs...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Generate AI Report Summary
                    </>
                  )}
                </button>
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                  <pre className="bg-white border border-gray-200 p-5 rounded-2xl text-[11px] text-neutral-charcoal font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-w-full shadow-inner">
                    {aiReport}
                  </pre>
                  <div className="flex gap-3">
                    <button
                      onClick={printAiReport}
                      className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-bold text-xs flex items-center gap-1.5 hover:shadow-md cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Print / Export Report
                    </button>
                    <button
                      onClick={() => setAiReport('')}
                      className="py-2.5 px-5 rounded-lg bg-white border border-gray-250 text-neutral-charcoal font-semibold text-xs hover:bg-gray-50 cursor-pointer"
                    >
                      Reset summary
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="text-left border-b border-gray-200/50 pb-6">
              <h1 className="font-sora font-extrabold text-2xl text-neutral-charcoal">Campaign Management</h1>
              <p className="text-xs text-neutral-slate">Create and oversee fundraising thresholds and allocation parameters.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* List of campaigns */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="font-sora font-bold text-base text-neutral-charcoal text-left mb-2">Active Campaign Thresholds</h3>
                {campaignList.map((c) => {
                  const percent = Math.min(Math.round((c.raised / c.target) * 100), 100);
                  return (
                    <div key={c.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-left flex flex-col gap-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-neutral-charcoal">{c.title}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-[9px] font-bold text-secondary-pink uppercase">{c.category}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-neutral-slate">
                        <span>Raised: <strong>₹{c.raised.toLocaleString()}</strong></span>
                        <span>Goal: <strong>₹{c.target.toLocaleString()}</strong></span>
                      </div>
                      <div className="relative w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-royal to-secondary-pink rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Form creation */}
              <div className="lg:col-span-5">
                <form onSubmit={handleCreateCampaign} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col gap-4 text-left">
                  <h3 className="font-sora font-bold text-base text-neutral-charcoal border-b border-gray-100 pb-2">Launch New Drive</h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Campaign Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jharkhand School Hygiene Drive"
                      value={newCampaignTitle}
                      onChange={(e) => setNewCampaignTitle(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Target Amount (INR)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 500000"
                      value={newCampaignTarget}
                      onChange={(e) => setNewCampaignTarget(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal placeholder-gray-400 focus:outline-none focus:border-secondary-pink transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-slate uppercase">Theme Category</label>
                    <select
                      value={newCampaignCategory}
                      onChange={(e) => setNewCampaignCategory(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
                    >
                      <option value="Menstrual Health">Menstrual Health</option>
                      <option value="Skill Uplift">Skill Uplift</option>
                      <option value="Education">Education & School Kits</option>
                      <option value="Nutrition Support">Nutrition Support</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-semibold text-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    Launch Social Campaign
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="text-left border-b border-gray-200/50 pb-6">
              <h1 className="font-sora font-extrabold text-2xl text-neutral-charcoal">Volunteer Review Panel</h1>
              <p className="text-xs text-neutral-slate">Approve pending applications and assign safety briefing sheets.</p>
            </div>

            {/* Pending Applicants cards */}
            <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
              <h3 className="font-sora font-bold text-base text-neutral-charcoal text-left mb-2">Pending Social Applicants</h3>
              
              {pendingVolunteers.length > 0 ? (
                pendingVolunteers.map((v) => (
                  <div key={v.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-300 transition-all">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="flex justify-between items-center text-xs">
                        <strong className="text-neutral-charcoal">{v.name} ({v.email})</strong>
                        <span className="text-[10px] text-secondary-pink font-bold uppercase tracking-wider">{v.skills}</span>
                      </div>
                      <p className="text-[11px] text-neutral-slate italic leading-relaxed">
                        "{v.bio}"
                      </p>
                      
                      {/* Premium Resume View Trigger */}
                      {v.resume ? (
                        <div className="mt-2.5 flex items-center gap-2">
                          <span className="text-[10px] text-neutral-slate font-bold uppercase">Resume:</span>
                          <a
                            href={v.resume}
                            download={`${v.name.replace(/\s+/g, '_')}_Resume`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-royal/5 border border-primary-royal/10 text-primary-royal text-[10px] font-bold hover:bg-primary-royal hover:text-white hover:border-primary-royal transition-all duration-300 shadow-2xs"
                          >
                            <FileText className="w-3.5 h-3.5 animate-pulse" />
                            Download & View Resume
                          </a>
                        </div>
                      ) : (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                          <span>No resume uploaded</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2.5 sm:border-l border-gray-150 sm:pl-5">
                      <button
                        onClick={() => handleApproveVolunteer(v.id, v.name)}
                        className="p-2 rounded-xl bg-green-50 border border-green-200 text-green-600 hover:bg-green-600 hover:text-white transition-all cursor-pointer"
                        title="Approve"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRejectVolunteer(v.id, v.name)}
                        className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center rounded-2xl border border-dashed border-gray-200 text-neutral-slate text-xs">
                  All volunteer applications have been successfully reviewed and processed!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="text-left border-b border-gray-200/50 pb-6">
              <h1 className="font-sora font-extrabold text-2xl text-neutral-charcoal">AI Content Management System</h1>
              <p className="text-xs text-neutral-slate">Brainstorm storytelling blogs and micro-updates powered by custom local AI engines.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Suggestions results */}
              <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                <h3 className="font-sora font-bold text-base text-neutral-charcoal">Creative Story Titles & Outlines</h3>
                
                {aiBlogIdeas.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {aiBlogIdeas.map((idea, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex gap-3 text-xs leading-relaxed text-neutral-slate">
                        <Sparkles className="w-4.5 h-4.5 text-secondary-pink flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-charcoal text-xs block mb-1">Option {idx + 1}: {idea}</strong>
                          <span className="text-[10px] text-neutral-slate/70">Core Pillar Focus: Educational awareness, structural support.</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-gray-200 text-neutral-slate text-xs">
                    No active creative title brainstorms. Trigger the brainstorming engine on the right!
                  </div>
                )}
              </div>

              {/* Suggestions Trigger */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary-pink animate-pulse" />
                    <h3 className="font-sora font-bold text-base text-neutral-charcoal">Brainstorm Story Ideas</h3>
                  </div>
                  <p className="text-xs text-neutral-slate leading-relaxed">
                    Instantly brainstorm title suggestions and writing layouts optimized for high digital trust metrics and volunteer inspiration.
                  </p>
                  
                  <button
                    onClick={handleBrainstormBlogIdeas}
                    disabled={generatingBlogIdeas}
                    className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {generatingBlogIdeas ? (
                      <>
                        <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Brainstorming...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Brainstorm with AI
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
