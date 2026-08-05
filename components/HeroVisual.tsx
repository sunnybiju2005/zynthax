'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Sparkles, CheckCircle2, Cpu, Database, Zap } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-full sm:max-w-xl lg:max-w-2xl mx-auto py-4 sm:py-8 overflow-hidden sm:overflow-visible">
      {/* Background Neon Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-4 w-48 sm:w-80 h-48 sm:h-80 bg-purple-600/15 rounded-full blur-[70px] sm:blur-[90px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* LAPTOP MOCKUP CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full rounded-2xl p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950 border border-slate-700/50 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl"
        >
          {/* Laptop Top Bar / Camera */}
          <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 bg-[#0a0f1d] rounded-t-xl border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-cyan-400/90 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>zynthax-agency.cloud</span>
            </div>
            <div className="w-8" />
          </div>

          {/* Screen Content */}
          <div className="relative bg-[#030712] rounded-b-xl overflow-hidden min-h-[260px] sm:min-h-[340px] p-4 sm:p-6 flex flex-col justify-between border border-white/5">
            {/* Top Dashboard Grid Mock */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-display">ZYNTHAX Engine v3.0</h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono">Firebase Firestore Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    99.9%
                  </span>
                </div>
              </div>

              {/* Code & Analytics Split Screen Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Code Window snippet */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-white/10 font-mono text-[11px] text-slate-300 leading-relaxed overflow-hidden">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1.5 border-b border-white/5 pb-1">
                    <span>app.tsx</span>
                    <span className="text-cyan-400">TypeScript</span>
                  </div>
                  <div className="space-y-1 text-[10px] sm:text-[11px]">
                    <p className="text-purple-400">import <span className="text-white">&#123; Core &#125;</span> from <span className="text-emerald-400">&apos;@zynthax&apos;</span>;</p>
                    <p className="text-blue-400">const <span className="text-cyan-300">System</span> = &#123;</p>
                    <p className="pl-2 text-slate-400">tech: <span className="text-amber-300">&quot;Next + Flutter&quot;</span>,</p>
                    <p className="pl-2 text-slate-400">status: <span className="text-emerald-400">&quot;Dynamic&quot;</span></p>
                    <p className="text-blue-400">&#125;;</p>
                  </div>
                </div>

                {/* UI Analytics Mock Card */}
                <div className="bg-slate-900/60 rounded-xl p-3 border border-cyan-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Live Traffic</span>
                    <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  </div>
                  <div className="my-2 space-y-1.5">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Performance</span>
                      <span className="text-cyan-400 font-bold">100/100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-full rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Web Apps
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Mobile Apps
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Bar inside Screen */}
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-cyan-400" /> Admin Engine Active
              </span>
              <span className="text-purple-400 font-semibold">Cloudinary Host</span>
            </div>
          </div>
        </motion.div>

        {/* FLOATING MOBILE WIDGET */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-3 z-20 w-full sm:w-52 bg-slate-900/90 rounded-2xl p-3 border border-cyan-500/40 shadow-xl shadow-cyan-950/40 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Mobile Apps & Web Solutions</p>
              <p className="text-[10px] text-cyan-300 font-mono">iOS & Android Dedicated</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
