'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { getFaq } from '@/lib/db';
import { FaqItem } from '@/lib/seedData';
import { EmptyState, CardSkeleton } from '@/components/SkeletonLoader';
import Link from 'next/link';

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getFaq();
      setFaqs(data);
      setLoading(false);
    }
    load();
  }, []);

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-16 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Have Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">We Have Answers</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Everything you need to know about working with ZYNTHAX Digital Solutions, our processes, tech stack, and pricing.
        </p>
      </div>

      {/* Category Filter */}
      {!loading && faqs.length > 0 && (
        <div className="flex items-center justify-center gap-2 flex-wrap bg-slate-900/60 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Accordion List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title="No questions found" message="No FAQ items found in this category." />
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-cyan-500/30"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-semibold text-white text-base sm:text-lg hover:text-cyan-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/5 font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Still Have Questions CTA */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white font-display">Still have questions?</h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Can&apos;t find the answer you&apos;re looking for? Reach out directly to our engineering team.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25"
          >
            <MessageCircle className="w-4 h-4" /> Send us a Message
          </Link>
        </div>
      </div>
    </div>
  );
}
