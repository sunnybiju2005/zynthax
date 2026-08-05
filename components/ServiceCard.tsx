'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Receipt, 
  Layout, 
  Sparkles, 
  PlaySquare, 
  Film, 
  Video, 
  Wand2, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { ServiceItem } from '@/lib/seedData';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cpu,
  Receipt,
  Layout,
  Sparkles,
  PlaySquare,
  Film,
  Video,
  Wand2
};

interface ServiceCardProps {
  service?: ServiceItem | null;
  index?: number;
  carousel?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0, carousel = false }) => {
  if (!service) return null;

  const iconName = service.icon || 'Sparkles';
  const IconComponent = iconMap[iconName] || Sparkles;
  const title = service.title || 'Digital Service';
  const desc = service.shortDescription || service.description || 'No description available.';
  const features = Array.isArray(service.features) ? service.features : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={carousel ? "min-w-[82vw] sm:min-w-[320px] snap-center shrink-0 h-full" : "h-full"}
    >
      <Link href={`/services/${service.slug || service.id || '#'}`} className="block group">
        <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden border border-white/10">
          
          {/* Top subtle glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div>
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-purple-600 transition-all duration-300 shadow-lg shadow-cyan-950/20">
                <IconComponent className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                Service #{index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {desc}
            </p>

            {/* Key Features List */}
            {features.length > 0 && (
              <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
                {features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Card Footer Link CTA */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-cyan-400 group-hover:text-white">
            <span className="group-hover:translate-x-1 transition-transform">Explore Details</span>
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-500/20 transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
