'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Eye, 
  Compass, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight,
  Database,
  Layers,
  Zap
} from 'lucide-react';
import { getAbout } from '@/lib/db';
import { AboutData } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';
import { SectionHeader } from '@/components/SectionHeader';
import { GlassCard } from '@/components/GlassCard';

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (err) {
        console.error("Error loading about page data:", err);
      }
    }
    loadAbout();
  }, []);

  if (!about) {
    return (
      <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="h-8 bg-slate-800/60 rounded-full w-48 mx-auto animate-pulse" />
        <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 mx-auto animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-64 bg-slate-800/60 rounded-2xl animate-pulse" />
          <div className="h-64 bg-slate-800/60 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const title = about.title || 'About ZYNTHAX';
  const subtitle = about.subtitle || '';
  const description = about.description || '';
  const mission = about.mission || '';
  const vision = about.vision || '';
  const approach = Array.isArray(about.approach) ? about.approach : [];
  const whyChooseUs = Array.isArray(about.whyChooseUs) ? about.whyChooseUs : [];
  const companyImages = Array.isArray(about.companyImages) ? about.companyImages : [];
  const founderName = about.founderName || '';
  const founderRole = about.founderRole || '';
  const founderBio = about.founderBio || '';
  const founderImage = about.founderImage || null;

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT ZYNTHAX DIGITAL SOLUTIONS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* What is ZYNTHAX & Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Company Overview
          </span>
          <h2 className="text-3xl font-bold text-white font-display">
            What is ZYNTHAX?
          </h2>
          {description && (
            <p className="text-slate-300 text-base leading-relaxed">
              {description}
            </p>
          )}

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-3">
            <Database className="w-5 h-5 shrink-0 text-cyan-400" />
            <span>
              All content on this page is dynamic and managed via Firebase Firestore cloud database.
            </span>
          </div>
        </motion.div>

        {/* Company Image Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          {companyImages.length > 0 ? (
            companyImages.map((img, i) => (
              <div
                key={i}
                className={`relative h-64 rounded-2xl overflow-hidden border border-white/10 ${
                  i === 0 ? 'mt-0' : 'mt-6'
                }`}
              >
                <Image
                  src={img || PLACEHOLDER_PROJECT_IMAGE}
                  alt={`Company culture ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 h-64 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center text-slate-500 text-sm font-mono">
              Company images coming soon
            </div>
          )}
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mission && (
          <GlassCard hoverGlow="cyan" className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{mission}</p>
          </GlassCard>
        )}
        {vision && (
          <GlassCard hoverGlow="purple" className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{vision}</p>
          </GlassCard>
        )}
      </section>

      {/* 4-Step Approach Timeline */}
      {approach.length > 0 && (
        <section className="space-y-12">
          <SectionHeader
            badge="THE ZYNTHAX METHOD"
            title="Our Strategic"
            gradientText="Product Approach"
            description="How we convert business concepts into market-leading digital software and creative assets."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((step, i) => (
              <GlassCard key={i} hoverGlow="cyan" className="relative p-6">
                <span className="text-4xl font-extrabold font-mono text-cyan-400/40 block mb-4">
                  {step?.number || `0${i + 1}`}
                </span>
                <h4 className="text-lg font-bold text-white font-display mb-2">{step?.title || 'Step'}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{step?.desc || ''}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      {whyChooseUs.length > 0 && (
        <section className="space-y-12">
          <SectionHeader
            badge="OUR ADVANTAGE"
            title="Why Choose"
            gradientText="ZYNTHAX?"
            description="We deliver international agency standard engineering with full cloud-managed independence."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-6 border border-white/10 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display mb-1">{item?.title || 'Advantage'}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item?.desc || ''}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Founder Details Section */}
      {(founderName || founderBio) && (
        <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {founderImage ? (
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-cyan-500/30">
                <Image src={founderImage} alt={founderName || 'Founder'} fill className="object-cover" />
              </div>
            ) : null}

          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              LEADERSHIP & VISION
            </span>
            <h3 className="text-3xl font-extrabold text-white font-display">
              {founderName}
            </h3>
            <p className="text-sm font-mono text-purple-400">{founderRole}</p>
            <p className="text-slate-300 text-base leading-relaxed pt-2">
              &quot;{founderBio}&quot;
            </p>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25"
              >
                Connect With Leadership
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        </section>
      )}

    </div>
  );
}
