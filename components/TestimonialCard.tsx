'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TestimonialItem } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';

interface TestimonialCardProps {
  testimonial?: TestimonialItem | null;
  index?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index = 0,
}) => {
  if (!testimonial) return null;

  const profileImg = testimonial.profileImage || PLACEHOLDER_PROJECT_IMAGE;
  const name = testimonial.name || 'Verified Client';
  const role = testimonial.role || 'Client';
  const company = testimonial.company || 'Enterprise Partner';
  const review = testimonial.review || 'Great experience working with ZYNTHAX.';
  const rating = typeof testimonial.rating === 'number' ? Math.max(1, Math.min(5, testimonial.rating)) : 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-white/10 h-full"
    >
      {/* Background Quote Icon */}
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
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6">
          &quot;{review}&quot;
        </p>
      </div>

      {/* Client Profile Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/40 shrink-0">
          <Image
            src={profileImg}
            alt={name}
            fill
            sizes="48px"
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
    </motion.div>
  );
};
