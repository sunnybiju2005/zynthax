'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Users, ArrowRight } from 'lucide-react';
import { getTeamMembers } from '@/lib/db';
import { TeamMember } from '@/lib/seedData';
import { TeamCard } from '@/components/TeamCard';
import { EmptyState } from '@/components/SkeletonLoader';

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getTeamMembers();
        console.log(`[TeamPage] Loaded ${data.length} team members from Firestore:`, data);
        setMembers(data);
      } catch (err) {
        console.error('[TeamPage Error] Failed to load team members:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MEET OUR LEADERSHIP &amp; ENGINEERS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          The Minds Behind <span className="text-gradient">ZYNTHAX</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Architecting high-performance websites, cross-platform mobile apps, enterprise software, and cinematic motion design for global leaders.
        </p>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-slate-400">Loading team directory from Firestore...</p>
        </div>
      ) : members.length === 0 ? (
        <EmptyState
          title="No team members found"
          message="Team members will appear here once added from the Admin App."
        />
      ) : (
        /* Team Members Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {members.map((member, index) => (
            <TeamCard key={member.id || index} member={member} index={index} />
          ))}
        </div>
      )}

      {/* CTA Box */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Want to Collaborate With Our Team?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          We bring senior technical direction, product design, and continuous engineering support to your digital roadmap.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
