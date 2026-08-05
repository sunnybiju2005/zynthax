'use client';

import React, { useState } from 'react';
import { Database, CheckCircle2, AlertCircle, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { seedFirestoreCollections } from '@/lib/db';

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; details?: string[] } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await seedFirestoreCollections();
      setResult(res);
    } catch (err: any) {
      setResult({ success: false, details: [err?.message || 'Seeding failed'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>FIRESTORE DATABASE SEEDER UTILITY</span>
        </div>
        <h1 className="text-3xl font-bold text-white font-display">
          Populate ZYNTHAX Firestore Collections
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Use this admin tool to push initial collections (`settings`, `about`, `services`, `projects`, `gallery`, `technologies`, `testimonials`, `statistics`) directly into your configured Firebase project.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-6 text-center shadow-2xl">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20 text-xs font-mono text-left space-y-2 text-slate-300">
          <p className="text-cyan-400 font-bold">Collections to be created/updated:</p>
          <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
            <li>• <strong className="text-white">services</strong> (10 core services)</li>
            <li>• <strong className="text-white">projects</strong> (6 featured projects)</li>
            <li>• <strong className="text-white">gallery</strong> (6 media items)</li>
            <li>• <strong className="text-white">technologies</strong> (14 tech items)</li>
            <li>• <strong className="text-white">testimonials</strong> (3 reviews)</li>
            <li>• <strong className="text-white">statistics</strong> (4 metrics)</li>
            <li>• <strong className="text-white">teamMembers</strong> (dynamic team profiles)</li>
            <li>• <strong className="text-white">hero</strong> (homepage hero config)</li>
            <li>• <strong className="text-white">contact</strong> (company contact details)</li>
            <li>• <strong className="text-white">socialLinks</strong> (4 active channels)</li>
            <li>• <strong className="text-white">blogs</strong> (3 articles)</li>
            <li>• <strong className="text-white">faq</strong> (8 Q&A items)</li>
            <li>• <strong className="text-white">seo</strong> (global SEO config)</li>
            <li>• <strong className="text-white">about</strong> (company info)</li>
            <li>• <strong className="text-white">settings</strong> (general config)</li>
            <li>• <strong className="text-white">enquiries</strong> (form submissions target)</li>
          </ul>
        </div>

        <button
          onClick={handleSeed}
          disabled={loading}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Seeding Firebase Firestore Collections...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              Execute 1-Click Firestore Seed
            </>
          )}
        </button>

        {result && (
          <div className={`p-6 rounded-2xl border text-left text-xs font-mono space-y-2 ${
            result.success ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-red-950/40 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {result.success ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Firestore Seeding Successful!
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-400" /> Firestore Seeding Encountered Errors
                </>
              )}
            </div>
            {result.details && (
              <ul className="space-y-1 pt-2 border-t border-white/10 text-[11px]">
                {result.details.map((d, i) => (
                  <li key={i}>✓ {d}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
