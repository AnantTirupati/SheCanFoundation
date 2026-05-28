'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Heart, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false, // Handle redirect manually to show loading state nicely
      });

      setLoading(false);

      if (res?.error) {
        setErrorMsg('Invalid administrative credentials. Please try again.');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('A system error occurred. Please verify environment setup.');
    }
  };

  return (
    <div className="warm-mesh min-h-screen flex items-center justify-center pt-24 pb-20 relative overflow-hidden text-neutral-charcoal">
      <div className="absolute inset-0 watercolor-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[300px] h-[300px] bg-primary-royal/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md px-6 relative z-10">
        <form
          onSubmit={handleLoginSubmit}
          className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6 text-left"
        >
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-3 border-b border-gray-100 pb-5">
            <img 
              src="/SheCan.png" 
              alt="She Can Foundation Logo" 
              className="w-11 h-11 object-contain mb-1 animate-pulse"
            />
            <div>
              <h2 className="font-sora font-extrabold text-lg text-neutral-charcoal">Admin Secure Portal</h2>
              <span className="text-[10px] text-neutral-slate font-bold uppercase tracking-wider">She Can Foundation</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 flex gap-2 items-start animate-in fade-in">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-neutral-slate uppercase">Administrative Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-neutral-slate/40" />
              <input
                type="email"
                required
                placeholder="admin@shecanfoundation.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-neutral-slate uppercase">Administrative Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-neutral-slate/40" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs text-neutral-charcoal focus:outline-none focus:border-secondary-pink transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-royal to-secondary-pink text-white font-semibold text-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Access Admin Workspace
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <span className="text-[9px] text-neutral-slate/60 text-center leading-relaxed">
            Unauthorized access attempts are logged and protected via secure JWT token encryptions.
          </span>
        </form>
      </div>
    </div>
  );
}
