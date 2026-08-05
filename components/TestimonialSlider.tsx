'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { TestimonialItem } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';

interface TestimonialSliderProps {
  testimonials?: TestimonialItem[] | null;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];

  useEffect(() => {
    if (safeTestimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= safeTestimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [safeTestimonials.length]);

  if (safeTestimonials.length === 0) return null;

  const current = safeTestimonials[activeIndex] || safeTestimonials[0];
  const profileImg = current?.profileImage || PLACEHOLDER_PROJECT_IMAGE;
  const name = current?.name || 'Verified Client';
  const role = current?.role || 'Client';
  const company = current?.company || 'Enterprise Partner';
  const review = current?.review || 'Great service from ZYNTHAX.';
  const rating = typeof current?.rating === 'number' ? Math.max(1, Math.min(5, current.rating)) : 5;

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= safeTestimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? safeTestimonials.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="w-full relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between"
        >
          {/* Background Quote */}
          <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-800/40 pointer-events-none" />

          <div>
            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
              &quot;{review}&quot;
            </p>
          </div>

          {/* Client Info */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-500/40 shrink-0">
                <Image
                  src={profileImg}
                  alt={name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">{name}</h4>
                <p className="text-xs text-cyan-400 font-mono">
                  {role} • <span className="text-slate-400">{company}</span>
                </p>
              </div>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {safeTestimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all cursor-pointer ${
              i === activeIndex
                ? 'w-6 h-1.5 bg-cyan-400'
                : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
