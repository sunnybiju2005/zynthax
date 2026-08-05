'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: 'cyan' | 'purple' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverGlow = 'cyan',
  onClick,
}) => {
  const glowStyles = {
    cyan: 'hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/15',
    purple: 'hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/15',
    none: '',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${glowStyles[hoverGlow]} ${className}`}
    >
      {/* Subtle top glare effect */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};
