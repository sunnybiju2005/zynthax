'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { getProjects } from '@/lib/db';
import { ProjectItem } from '@/lib/seedData';
import { ProjectCard } from '@/components/ProjectCard';
import { MediaModal } from '@/components/MediaModal';
import { GridSkeleton, EmptyState } from '@/components/SkeletonLoader';

const CATEGORIES = [
  'All',
  'Websites',
  'Mobile Applications',
  'Software',
  'UI/UX Designs',
  'Branding',
  'Video Projects'
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading projects in portfolio page:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p?.category === activeCategory);

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROJECT PORTFOLIO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Featured Digital Case Studies
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explore software systems, mobile apps, web stores, and creative brand deliverables crafted by ZYNTHAX.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-start sm:items-center justify-start sm:justify-center gap-1.5 flex-wrap bg-slate-900/60 p-2 rounded-2xl border border-white/10 max-w-4xl mx-auto backdrop-blur-md overflow-x-auto">
        <div className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs font-mono text-slate-400 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <GridSkeleton count={6} type="image" />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title={activeCategory === 'All' ? 'No projects found' : `No projects under "${activeCategory}"`}
          message="Check back soon — new deliverables are uploaded regularly."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project?.id || index}
              project={project}
              onOpenModal={setSelectedProject}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Project Lightbox Modal */}
      <MediaModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

    </div>
  );
}
