'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Sparkles, Play, Image as ImageIcon, Filter, Eye } from 'lucide-react';
import { getGallery } from '@/lib/db';
import { GalleryItem } from '@/lib/seedData';
import { MediaModal } from '@/components/MediaModal';
import { GridSkeleton, EmptyState } from '@/components/SkeletonLoader';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';


const CATEGORIES = [
  'All',
  'Logo Designs',
  'Logo Animations',
  'Posters',
  'UI Designs',
  'Video Editing',
  'Motion Graphics'
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCat, setActiveCat] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getGallery();
      setItems(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = activeCat === 'All'
    ? items
    : items.filter(i => i.category === activeCat);


  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CREATIVE MEDIA GALLERY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Visual & Motion Art Gallery
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          High-resolution vector logos, 3D motion stingers, posters, and cinematic post-production edits.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center justify-center gap-2 flex-wrap bg-slate-900/60 p-2 rounded-2xl border border-white/10 max-w-4xl mx-auto backdrop-blur-md">
        <div className="flex items-center gap-1 px-3 py-1 text-xs font-mono text-slate-400">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeCat === cat
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <GridSkeleton count={6} type="image" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={activeCat === 'All' ? 'No media items yet' : `No items in "${activeCat}"`}
          message="Check back soon — new creative work is added regularly."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group glass-panel rounded-2xl overflow-hidden border border-white/10 cursor-pointer relative"
            >
              <div className="relative w-full h-64 bg-slate-950">
                <Image
                  src={item.type === 'video' ? (item.thumbnailUrl || item.mediaUrl || PLACEHOLDER_PROJECT_IMAGE) : (item.mediaUrl || PLACEHOLDER_PROJECT_IMAGE)}
                  alt={item.title || 'Gallery item'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all"></div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-white/10">
                  {item.type === 'video' ? (
                    <>
                      <Play className="w-3 h-3 text-purple-400 fill-purple-400" /> Video
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 text-cyan-400" /> Image
                    </>
                  )}
                </div>

                {/* Hover View overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs">
                  <div className="px-4 py-2 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-900/40">
                    <Eye className="w-4 h-4" /> Open Lightbox
                  </div>
                </div>
              </div>

              {/* Bottom info */}
              <div className="p-4 bg-slate-900/90 border-t border-white/5">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
                  {item.category || 'Creative'}
                </span>
                <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {item.title || 'Untitled'}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Lightbox Modal */}
      <MediaModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        galleryItem={selectedItem}
      />

    </div>
  );
}
