'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, ExternalLink, Smartphone, Calendar, User, Sparkles } from 'lucide-react';
import { getProjectById } from '@/lib/db';
import { ProjectItem } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';
import { GridSkeleton } from '@/components/SkeletonLoader';

export default function SingleProjectPage() {
  const params = useParams();
  const id = (params?.id as string) || '';

  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error("Error loading project detail page:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-8 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="h-6 bg-slate-800/60 rounded-lg w-32 animate-pulse" />
        <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 animate-pulse" />
        <div className="h-96 bg-slate-800/60 rounded-3xl animate-pulse" />
        <GridSkeleton count={2} type="card" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h2 className="text-3xl font-bold text-white font-display">Project Not Found</h2>
        <p className="text-slate-400">The requested project ID does not exist in Firebase Firestore.</p>
        <Link
          href="/portfolio"
          className="px-6 py-2.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-sm font-semibold"
        >
          &larr; Return to Portfolio
        </Link>
      </div>
    );
  }

  const coverSrc = project.coverImage || (Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : PLACEHOLDER_PROJECT_IMAGE);
  const title = project.title || 'Untitled Project';
  const category = project.category || 'Websites';
  const description = project.description || project.shortDescription || 'No description available.';
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const images = Array.isArray(project.images) ? project.images : [];
  const completionDate = project.completionDate || '2025';
  const clientName = project.clientName || 'Enterprise Partner';

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-2">
              {title}
            </h1>
          </div>

          {/* Action Links - AUTOMATICALLY HIDDEN IF NOT PRESENT */}
          <div className="flex items-center gap-3">
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> View Live Website
              </a>
            )}
            {project.appUrl && (
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

        {/* Cover Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={coverSrc}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Metadata Details Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-900/80 border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Client: <strong className="text-white">{clientName}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Completion: <strong className="text-white">{completionDate}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Hosting: <strong className="text-white">Cloudinary CDN</strong></span>
          </div>
        </div>

        {/* Description */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold text-white font-display">Project Description</h3>
          <p className="text-slate-300 text-base leading-relaxed">
            {description}
          </p>

          {technologies.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase text-cyan-400 mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white font-display">Gallery Showcase</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
                  <Image 
                    src={img || PLACEHOLDER_PROJECT_IMAGE} 
                    alt={`Gallery Image ${i + 1}`} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
