'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TechItem } from '@/lib/seedData';

interface TechMarqueeProps {
  techs?: TechItem[] | null;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ techs }) => {
  const safeTechs = Array.isArray(techs) && techs.length > 0 ? techs : [];

  if (safeTechs.length === 0) return null;

  // Duplicate array to achieve seamless infinite marquee loop
  const marqueeTechs = [...safeTechs, ...safeTechs, ...safeTechs];

  return (
    <div className="w-full overflow-hidden py-4 relative group">
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-4 w-max"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
      >
        {marqueeTechs.map((tech, index) => {
          const techName = tech?.name || 'Tech';
          const techCat = tech?.category || 'development';
          return (
            <div
              key={`${tech?.id || techName}-${index}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md shrink-0 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center text-cyan-400 font-bold font-mono text-xs">
                {techName.slice(0, 2)}
              </div>
              <div>
                <div className="text-xs font-bold text-white font-display whitespace-nowrap">{techName}</div>
                <div className="text-[9px] text-slate-400 font-mono whitespace-nowrap">{techCat}</div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
