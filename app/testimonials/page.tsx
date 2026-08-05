'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials } from '@/lib/db';
import { TestimonialItem } from '@/lib/seedData';
import { TestimonialCard } from '@/components/TestimonialCard';
import { motion, AnimatePresence } from 'framer-motion';
import { GridSkeleton, EmptyState } from '@/components/SkeletonLoader';


export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getTestimonials();
      setTestimonials(data);
      setLoading(false);
    }
    load();
  }, []);


  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CLIENT SATISFACTION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Client Testimonials &amp; Reviews
        </h1>
        <p className="text-slate-300 text-sm sm:text-base sm:text-lg leading-relaxed">
          See why founders, enterprise leaders, and creative directors trust ZYNTHAX Digital Solutions.
        </p>
      </div>

      {/* Content Area */}
      {loading ? (
        <GridSkeleton count={3} type="testimonial" />
      ) : testimonials.length === 0 ? (
        <EmptyState title="No reviews yet" message="Client testimonials will appear here soon." />
      ) : isMobile ? (

        <div className="space-y-4">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} index={0} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between px-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all ${
                    i === activeIndex
                      ? 'w-6 h-2 bg-cyan-400'
                      : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs font-mono text-slate-500">
            Swipe to see more reviews &mdash; {activeIndex + 1} / {testimonials.length}
          </p>
        </div>
      ) : (
        /* Desktop/Tablet Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <TestimonialCard key={item.id || index} testimonial={item} index={index} />
          ))}
        </div>
      )}

    </div>
  );
}
