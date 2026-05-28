'use client';

import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Menstrual Health', 'Skill Center', 'Education', 'Health Camp'];

  const posts = [
    {
      id: 1,
      title: "Priya's Journey back to School",
      desc: "How distributing organic, bio-degradable sanitation pads and safe health guides helped Priya secure 92% attendance and pass her exams.",
      category: "Menstrual Health",
      author: "Priya Mukherjee",
      date: "May 24, 2026",
      readTime: "4 mins read",
      color: "border-pink-100 hover:border-pink-200",
    },
    {
      id: 2,
      title: "Sarita's Boutique Business Launch",
      desc: "Empowering a rural mother with standard heavy-duty sewing machine equipment and micro-business guidance, sparking local self-reliance.",
      category: "Skill Center",
      author: "Reeta Mishra",
      date: "May 18, 2026",
      readTime: "5 mins read",
      color: "border-amber-100 hover:border-amber-200",
    },
    {
      id: 3,
      title: "Teaching Code in Rural Bengal Booths",
      desc: "Setting up rural digital booths to teach young daughters basic office tools, digital marketing, and introductory software code skills.",
      category: "Education",
      author: "Rohan Sen",
      date: "May 10, 2026",
      readTime: "6 mins read",
      color: "border-purple-100 hover:border-purple-200",
    },
    {
      id: 4,
      title: "Weekend Gynecological Health Outreach",
      desc: "Highlights from our tribal clinical health camp where certified doctors provided free micro-nutrient tablets and female health counseling.",
      category: "Health Camp",
      author: "Reeta Mishra",
      date: "May 02, 2026",
      readTime: "4 mins read",
      color: "border-rose-100 hover:border-rose-200",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="warm-mesh min-h-screen pt-28 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary-royal/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary-pink font-extrabold font-sora">Our Impact Chronicles</span>
          <h1 className="font-sora text-4xl sm:text-5xl font-extrabold text-neutral-charcoal leading-tight">
            Stories of Dignity & Transformation
          </h1>
          <p className="text-neutral-slate text-sm sm:text-base leading-relaxed">
            Read true accounts from the ground. Learn how monthly kits and skills workshops break deep period taboos and establish local financial freedom.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between mb-12 p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none max-w-full pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1.5 px-4 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary-royal to-secondary-pink text-white border-transparent shadow-xs'
                    : 'bg-white border-gray-200 text-neutral-slate hover:text-neutral-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-neutral-slate/40" />
            <input
              type="text"
              placeholder="Search impact stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
            />
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`rounded-3xl bg-white border ${post.color} p-6 sm:p-8 flex flex-col justify-between gap-6 text-left hover:scale-101 transition-all duration-300 shadow-sm group`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-secondary-pink uppercase tracking-widest">{post.category}</span>
                    <span className="text-neutral-slate/50 font-medium">{post.readTime}</span>
                  </div>
                  <h3 className="font-sora font-extrabold text-xl text-neutral-charcoal group-hover:text-primary-royal transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-slate text-xs sm:text-sm leading-relaxed">
                    {post.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-xs text-neutral-slate font-semibold">
                  <div className="flex gap-4 items-center">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary-royal" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary-pink" /> {post.date}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-primary-royal hover:text-secondary-pink transition-colors cursor-pointer">
                    Read Story
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-neutral-slate text-xs">
              No impact stories found matching your filter requirements.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
