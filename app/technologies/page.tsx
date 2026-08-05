'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Code2, PenTool, Video, Server, ShieldCheck } from 'lucide-react';
import { getTechnologies } from '@/lib/db';
import { TechItem } from '@/lib/seedData';
import { SectionHeader } from '@/components/SectionHeader';
import { GlassCard } from '@/components/GlassCard';
import { GridSkeleton, EmptyState } from '@/components/SkeletonLoader';


export default function TechnologiesPage() {
  const [techs, setTechs] = useState<TechItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'development' | 'design' | 'video'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getTechnologies();
      setTechs(data);
      setLoading(false);
    }
    load();
  }, []);


  const filtered = activeTab === 'all'
    ? techs
    : techs.filter(t => t.category === activeTab);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'development': return Code2;
      case 'design': return PenTool;
      case 'video': return Video;
      default: return Server;
    }
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENTERPRISE TECH STACK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Technologies & Tools
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          State-of-the-art frameworks, design software, and video post-production tools powering ZYNTHAX products.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap bg-slate-900/60 p-1.5 sm:p-2 rounded-2xl border border-white/10 max-w-2xl mx-auto backdrop-blur-md">
        {[
          { key: 'all', label: 'All Technologies' },
          { key: 'development', label: 'Development' },
          { key: 'design', label: 'UI/UX & Design' },
          { key: 'video', label: 'Video & Motion' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-mono font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Technology Grid */}
      {loading ? (
        <GridSkeleton count={12} cols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" type="card" />
      ) : filtered.length === 0 ? (
        <EmptyState title="No technologies found" message="Technology stack data will appear here." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filtered.map((tech) => {
            const CatIcon = getCategoryIcon(tech.category);
            return (
              <GlassCard key={tech.id} hoverGlow="cyan" className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono text-sm sm:text-base">
                    {tech.name.slice(0, 2)}
                  </div>
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase bg-slate-950 text-purple-300 border border-white/10 flex items-center gap-1">
                    <CatIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" /> {tech.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-xl font-bold text-white font-display mb-0.5 sm:mb-1 truncate">{tech.name}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono line-clamp-2">{tech.description}</p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> Production Verified
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

    </div>
  );
}

