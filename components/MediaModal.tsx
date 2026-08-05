'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Smartphone, Calendar, Layers } from 'lucide-react';
import { ProjectItem, GalleryItem } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  galleryItem?: GalleryItem | null;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  project,
  galleryItem,
}) => {
  if (!isOpen) return null;

  const projectCoverSrc = project?.coverImage || (project?.images?.length ? project.images[0] : PLACEHOLDER_PROJECT_IMAGE);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0a0f1d] border border-white/10 rounded-3xl overflow-hidden z-10 shadow-2xl shadow-cyan-950/50 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* PROJECT MODAL CONTENT */}
          {project && (
            <div className="flex flex-col">
              {/* Cover Header */}
              <div className="relative w-full h-64 sm:h-80 bg-slate-950">
                <Image
                  src={projectCoverSrc}
                  alt={project?.title || 'Project'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {project?.category || 'Websites'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
                      {project?.title || 'Untitled Project'}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">Project Overview</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project?.description || project?.shortDescription || 'No detailed description available.'}
                  </p>
                </div>

                {/* Tech & Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono">Technologies Used:</span>
                    {Array.isArray(project?.technologies) && project.technologies.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.map((t, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-cyan-300 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 font-mono mt-1">General Tech Stack</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p><strong className="text-slate-400 font-mono">Completion Date:</strong> <span className="text-white">{project?.completionDate || '2025'}</span></p>
                    <p><strong className="text-slate-400 font-mono">Client:</strong> <span className="text-white">{project?.clientName || 'Private Enterprise Client'}</span></p>
                  </div>
                </div>

                {/* Image Gallery */}
                {Array.isArray(project?.images) && project.images.length > 1 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3">Project Gallery</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project.images.map((img, i) => (
                        <div key={i} className="relative h-28 sm:h-36 rounded-xl overflow-hidden border border-white/10 group">
                          <Image src={img || PLACEHOLDER_PROJECT_IMAGE} alt={`Gallery ${i}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Links Buttons (AUTOMATICALLY HIDE IF NON-EXISTENT) */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  {project?.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> Visit Website
                    </a>
                  )}
                  {project?.appUrl && (
                    <a
                      href={project.appUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25 hover:scale-105 transition-all"
                    >
                      <Smartphone className="w-4 h-4" /> Download App
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GALLERY ITEM MODAL CONTENT */}
          {galleryItem && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {galleryItem?.category || 'UI Designs'}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white font-display mt-2">
                    {galleryItem?.title || 'Creative Deliverable'}
                  </h2>
                </div>
              </div>

              {galleryItem?.type === 'video' ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                  <video
                    src={galleryItem.mediaUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                  <Image
                    src={galleryItem?.mediaUrl || PLACEHOLDER_PROJECT_IMAGE}
                    alt={galleryItem?.title || 'Gallery Item'}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <p className="text-slate-300 text-sm leading-relaxed">
                {galleryItem?.description || 'No description provided for this item.'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
