'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge: string;
  title: string;
  gradientText?: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  gradientText,
  description,
  centered = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-12 sm:mb-16`}
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 mb-4 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="text-xs font-mono font-medium tracking-wider text-cyan-300 uppercase">
          {badge}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
        {title}{' '}
        {gradientText && (
          <span className="text-gradient block sm:inline">{gradientText}</span>
        )}
      </h2>

      {description && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
};
