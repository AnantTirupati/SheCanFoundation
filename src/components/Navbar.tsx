'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'Empowerment Programs', path: '/programs' },
    { name: 'Become a Volunteer', path: '/volunteer' },
    { name: 'Events', path: '/events' },
    { name: 'Impact Stories', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3 shadow-sm shadow-gray-200/50 border-b border-gray-200/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/SheCan.png" 
              alt="She Can Foundation Logo" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg tracking-wider text-neutral-charcoal group-hover:text-primary-royal transition-colors duration-300 font-sora">
                SHE CAN
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-primary-royal font-bold -mt-1.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-xs font-semibold tracking-wide transition-all duration-300 hover:text-primary-royal relative py-1 ${
                    isActive ? 'text-primary-royal font-bold' : 'text-neutral-slate/90'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary-royal to-secondary-pink" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="hidden xl:block">
            <Link
              href="/donate"
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full overflow-hidden font-semibold text-xs text-white shadow-sm shadow-purple-500/10 hover:shadow-md hover:scale-102 transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-royal to-secondary-pink" />
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-pink to-primary-royal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-white/10" />
                Donate Now
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-neutral-charcoal hover:bg-gray-100/50 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden fixed inset-x-0 top-[76px] glass border-b border-gray-200/30 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100 h-auto' : 'opacity-0 scale-y-0 h-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1.5 text-left">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-royal/10 to-secondary-pink/5 text-primary-royal border-l-4 border-primary-royal'
                    : 'text-neutral-charcoal/80 hover:bg-gray-100/40 hover:text-neutral-charcoal'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 px-4">
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full bg-gradient-to-r from-primary-royal to-secondary-pink font-bold text-white text-xs text-center shadow-md hover:shadow-lg transition-all"
            >
              <Heart className="w-4 h-4 fill-white/10" />
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
