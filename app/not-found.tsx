'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
        <Sparkles className="w-3.5 h-3.5" />
        <span>ERROR 404</span>
      </div>

      <h1 className="text-6xl sm:text-8xl font-extrabold text-white font-display tracking-tight text-gradient">
        404
      </h1>

      <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
        Lost in Digital Space?
      </h2>

      <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
        The requested page or route does not exist on the ZYNTHAX network. Return to the core dashboard below.
      </p>

      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return Home
        </Link>
        <Link
          href="/services"
          className="px-6 py-3 rounded-full bg-slate-900 border border-white/10 text-slate-300 font-semibold text-sm hover:text-white"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}
