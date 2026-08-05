'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SettingsData } from '@/lib/seedData';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  settings?: SettingsData | null;
}

export const HeroSection: React.FC<HeroProps> = ({ settings }) => {
  // All content comes from Firestore settings document.
  // Brand name "ZYNTHAX" is kept as the absolute minimum identity fallback.
  const prefix      = settings?.heroTitlePrefix    || 'ZYNTHA';
  const highlight   = settings?.heroTitleHighlight || 'X';
  const suffix      = settings?.heroTitleSuffix    || 'Digital Solutions';
  const subtitle    = settings?.heroSubtitle       || '';
  const desc        = settings?.heroDescription    || '';
  const primaryBtn  = settings?.heroPrimaryBtn     || 'View Our Work';
  const secondaryBtn = settings?.heroSecondaryBtn  || 'Start a Project';
  const badge       = settings?.heroBadge          || 'WELCOME TO ZYNTHAX';
  const logoUrl     = settings?.logoUrl            || null;

  /* Stagger variants */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#020617] pt-24 pb-16 lg:pt-32 lg:pb-20">

      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-0 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-0 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[90px] sm:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(rgba(99,102,241,0.35) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* LEFT COLUMN — Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-5"
          >
            {/* Logo Badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-1">
              {logoUrl && (
                <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/30 p-1.5 shadow-lg shadow-cyan-500/10">
                  <Image
                    src={logoUrl}
                    alt={`${prefix}${highlight} Logo`}
                    width={36}
                    height={36}
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                  />
                </div>
              )}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-mono font-semibold tracking-[0.15em] text-cyan-300 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp} className="space-y-1">
              <h1 className="text-3xl sm:text-5xl xl:text-7xl font-extrabold text-white tracking-tight leading-tight font-display">
                {prefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">{highlight}</span>
              </h1>
              <h2 className="text-2xl sm:text-4xl xl:text-6xl font-extrabold text-white tracking-tight leading-tight font-display">
                {suffix}
              </h2>
            </motion.div>

            {/* Subtitle — only render if set */}
            {subtitle && (
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 max-w-xl"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Description — only render if set */}
            {desc && (
              <motion.p variants={fadeUp} className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                {desc}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl
                  bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm sm:text-base
                  shadow-xl shadow-cyan-500/25
                  hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95
                  transition-all duration-300"
              >
                <span>{primaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl
                  bg-slate-900/80 backdrop-blur-md
                  border border-purple-500/40 text-white font-bold text-sm sm:text-base
                  hover:bg-slate-800 hover:border-purple-400
                  shadow-lg shadow-purple-950/30 active:scale-95
                  transition-all duration-300"
              >
                <span>{secondaryBtn}</span>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </Link>
            </motion.div>

            {/* Availability indicator */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-semibold">Available for New Projects</span>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN — Interactive Visual */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
