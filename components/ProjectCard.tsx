'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Smartphone, Calendar, Layers, Eye } from 'lucide-react';
import { ProjectItem } from '@/lib/seedData';
import { getProjectCoverImage } from '@/lib/mappers';

interface ProjectCardProps {
  project?: ProjectItem | null;
  onOpenModal?: (project: ProjectItem) => void;
  index?: number;
  carousel?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenModal,
  index = 0,
  carousel = false,
}) => {
  if (!project) return null;

  const coverSrc = project.coverImage || (project.images?.length ? project.images[0] : "/images/placeholder-project.jpg");
  const title = project.title || 'Untitled Project';
  const category = project.category || 'Websites';
  const shortDesc = project.shortDescription || project.description || 'No description available.';
  const clientName = project.clientName || 'Client Project';
  const completionDate = project.completionDate || '2025';
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between h-full ${
        carousel ? 'min-w-[85vw] sm:min-w-[340px] snap-center shrink-0' : ''
      }`}
    >
      {/* Image Thumbnail with Overlay */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-950">
        <Image
          src={coverSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-slate-950/20 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
            {category}
          </span>
          {project?.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40">
              FEATURED
            </span>
          )}
        </div>

        {/* Quick View Overlay Button */}
        {onOpenModal && (
          <button
            onClick={() => onOpenModal(project)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-sm cursor-pointer"
          >
            <div className="px-4 py-2 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/30">
              <Eye className="w-4 h-4" /> View Details
            </div>
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>{clientName}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3 h-3" /> {completionDate}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {shortDesc}
          </p>
        </div>

        <div>
          {/* Tech Stack Badges */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-300 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Links - AUTOMATICALLY HIDE IF NO LINK EXISTS */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
            {onOpenModal ? (
              <button
                onClick={() => onOpenModal(project)}
                className="text-xs font-semibold text-cyan-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                Details & Gallery &rarr;
              </button>
            ) : (
              <Link
                href={`/portfolio/${project?.id || '#'}`}
                className="text-xs font-semibold text-cyan-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                Details & Gallery &rarr;
              </Link>
            )}

            <div className="flex items-center gap-2">
              {/* Website Link (Only rendered if websiteUrl exists) */}
              {project?.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-semibold flex items-center gap-1 transition-all"
                  title="View Live Website"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Web
                </a>
              )}

              {/* App Link (Only rendered if appUrl exists) */}
              {project?.appUrl && (
                <a
                  href={project.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                  title="View App Store"
                >
                  <Smartphone className="w-3.5 h-3.5" /> App
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
