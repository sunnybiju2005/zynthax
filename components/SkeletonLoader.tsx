'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-800/60 rounded-xl ${className}`} />
);

// Card skeleton for services/projects/team
export const CardSkeleton: React.FC = () => (
  <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-slate-800/60" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-slate-800/60 rounded-lg w-3/4" />
        <div className="h-3 bg-slate-800/60 rounded-lg w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-slate-800/60 rounded-lg w-full" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-5/6" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-4/6" />
    </div>
    <div className="h-9 bg-slate-800/60 rounded-xl w-full" />
  </div>
);

// Image card skeleton for gallery/portfolio
export const ImageCardSkeleton: React.FC = () => (
  <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 animate-pulse">
    <div className="w-full h-56 bg-slate-800/60" />
    <div className="p-4 space-y-2">
      <div className="h-3 bg-slate-800/60 rounded-lg w-1/3" />
      <div className="h-4 bg-slate-800/60 rounded-lg w-2/3" />
    </div>
  </div>
);

// Team member card skeleton
export const TeamCardSkeleton: React.FC = () => (
  <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 animate-pulse">
    <div className="w-full h-48 bg-slate-800/60" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-slate-800/60 rounded-lg w-2/3" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-1/2" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-full" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-4/5" />
      <div className="flex gap-2 pt-1">
        {[1,2,3].map(i => (
          <div key={i} className="h-6 w-16 bg-slate-800/60 rounded-full" />
        ))}
      </div>
    </div>
  </div>
);

// Blog card skeleton
export const BlogCardSkeleton: React.FC = () => (
  <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 animate-pulse">
    <div className="w-full h-48 bg-slate-800/60" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-slate-800/60 rounded-full w-1/4" />
      <div className="h-5 bg-slate-800/60 rounded-lg w-full" />
      <div className="h-4 bg-slate-800/60 rounded-lg w-5/6" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-3/4" />
      <div className="flex justify-between items-center pt-1">
        <div className="h-3 bg-slate-800/60 rounded-lg w-1/4" />
        <div className="h-8 bg-slate-800/60 rounded-xl w-1/4" />
      </div>
    </div>
  </div>
);

// Testimonial skeleton
export const TestimonialSkeleton: React.FC = () => (
  <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 animate-pulse">
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-slate-800/60 rounded" />)}
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-slate-800/60 rounded-lg w-full" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-5/6" />
      <div className="h-3 bg-slate-800/60 rounded-lg w-4/6" />
    </div>
    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
      <div className="w-10 h-10 rounded-full bg-slate-800/60 shrink-0" />
      <div className="space-y-1">
        <div className="h-3 bg-slate-800/60 rounded-lg w-28" />
        <div className="h-2.5 bg-slate-800/60 rounded-lg w-20" />
      </div>
    </div>
  </div>
);

// Grid of N card skeletons
interface GridSkeletonProps {
  count?: number;
  cols?: string;
  type?: 'card' | 'image' | 'team' | 'blog' | 'testimonial';
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({
  count = 6,
  cols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  type = 'card'
}) => {
  const SkeletonComponent = {
    card: CardSkeleton,
    image: ImageCardSkeleton,
    team: TeamCardSkeleton,
    blog: BlogCardSkeleton,
    testimonial: TestimonialSkeleton,
  }[type];

  return (
    <div className={`grid ${cols} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
};

// Hero skeleton
export const HeroSkeleton: React.FC = () => (
  <section className="min-h-screen flex items-center bg-[#020617] pt-24 pb-16 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-6 bg-slate-800/60 rounded-full w-40" />
          <div className="space-y-3">
            <div className="h-14 bg-slate-800/60 rounded-xl w-3/4" />
            <div className="h-12 bg-slate-800/60 rounded-xl w-2/3" />
          </div>
          <div className="h-6 bg-slate-800/60 rounded-lg w-full max-w-sm" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-800/60 rounded-lg w-full" />
            <div className="h-4 bg-slate-800/60 rounded-lg w-5/6" />
          </div>
          <div className="flex gap-4 pt-2">
            <div className="h-12 bg-slate-800/60 rounded-2xl w-40" />
            <div className="h-12 bg-slate-800/60 rounded-2xl w-36" />
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-80 h-80 bg-slate-800/60 rounded-3xl" />
        </div>
      </div>
    </div>
  </section>
);

// Empty state component
interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  message = 'Check back later for updates.',
  icon
}) => (
  <div className="py-20 text-center space-y-4">
    {icon && (
      <div className="flex justify-center text-slate-600">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-bold text-slate-400 font-display">{title}</h3>
    <p className="text-slate-500 text-sm font-mono">{message}</p>
  </div>
);
