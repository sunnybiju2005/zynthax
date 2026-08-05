'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  Layers, 
  Cpu, 
  Sparkles, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { getServiceBySlug, getProjects } from '@/lib/db';
import { ServiceItem, ProjectItem } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';
import { SectionHeader } from '@/components/SectionHeader';
import { GlassCard } from '@/components/GlassCard';
import { ProjectCard } from '@/components/ProjectCard';
import { GridSkeleton } from '@/components/SkeletonLoader';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || '';

  const [service, setService] = useState<ServiceItem | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadService() {
      if (!slug) return;
      setLoading(true);
      try {
        const serv = await getServiceBySlug(slug);
        setService(serv);

        if (serv) {
          const allProj = await getProjects();
          const servTechs = Array.isArray(serv.technologies) ? serv.technologies : [];
          const titleWord = typeof serv.title === 'string' ? serv.title.toLowerCase().split(' ')[0] : '';
          const filtered = allProj.filter(p =>
            (Array.isArray(p?.technologies) ? p.technologies.some(t => servTechs.includes(t)) : false) ||
            (typeof p?.category === 'string' ? p.category.toLowerCase().includes(titleWord) : false)
          );
          setRelatedProjects(filtered.length > 0 ? filtered : allProj.slice(0, 3));
        }
      } catch (err) {
        console.error("Error loading service detail page:", err);
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="h-6 bg-slate-800/60 rounded-lg w-32 animate-pulse" />
        <div className="h-64 bg-slate-800/60 rounded-3xl animate-pulse" />
        <GridSkeleton count={3} type="card" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h2 className="text-3xl font-bold text-white font-display">Service Not Found</h2>
        <p className="text-slate-400">The requested service could not be located in Firebase Firestore.</p>
        <Link
          href="/services"
          className="px-6 py-2.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-sm font-semibold"
        >
          &larr; View All Services
        </Link>
      </div>
    );
  }

  const serviceTitle = service.title || 'Digital Service';
  const serviceDesc = service.description || service.shortDescription || 'No description available.';
  const bannerImg = service.bannerImage || PLACEHOLDER_PROJECT_IMAGE;
  const features = Array.isArray(service.features) ? service.features : [];
  const technologies = Array.isArray(service.technologies) ? service.technologies : [];
  const process = Array.isArray(service.process) ? service.process : [];
  const gallery = Array.isArray(service.gallery) ? service.gallery : [];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Back Navigation */}
      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to All Services
        </Link>
      </div>

      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden border border-white/10 glass-panel p-8 sm:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ZYNTHAX SERVICE OFFERING</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display leading-tight">
              {serviceTitle}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {serviceDesc}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?service=${service.slug || service.id}`}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-2"
              >
                Request {serviceTitle}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Banner Image */}
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={bannerImg}
              alt={serviceTitle}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features & Technologies Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Key Features (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Key Capabilities & Features
          </h2>
          {features.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3 hover:border-cyan-500/30 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm font-mono">Features will be updated soon.</p>
          )}
        </div>

        {/* Tech Stack Column (1 col) */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Technologies Used
          </h2>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
            <p className="text-xs font-mono text-slate-400">
              Core stack powering {serviceTitle}:
            </p>
            {technologies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs font-mono">Tech stack details coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* Execution Process Steps */}
      {process.length > 0 && (
        <section className="space-y-10">
          <SectionHeader
            badge="WORKFLOW"
            title="Our Development"
            gradientText="Process"
            description={`Step-by-step workflow followed for all ${serviceTitle} projects.`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <GlassCard key={i} hoverGlow="cyan" className="p-6">
                <span className="text-3xl font-extrabold font-mono text-cyan-400 block mb-3">
                  {p?.step || `0${i + 1}`}
                </span>
                <h3 className="text-lg font-bold text-white font-display mb-2">{p?.title || 'Phase'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p?.description || ''}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      {/* Service Gallery Images */}
      {gallery.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Visual Gallery Showcase
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <div key={i} className="relative h-60 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={img || PLACEHOLDER_PROJECT_IMAGE}
                  alt={`Service screenshot ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Related Projects Delivered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.slice(0, 3).map((proj, i) => (
              <ProjectCard key={proj?.id || i} project={proj} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom Contact Bar */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white font-display">
            Ready to start your {serviceTitle} project?
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            Get an instant custom quote and technical proposal from ZYNTHAX engineers.
          </p>
        </div>
        <Link
          href={`/contact?service=${service.slug || service.id}`}
          className="px-8 py-4 rounded-full bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 shadow-lg shadow-cyan-400/20 shrink-0 transition-all"
        >
          Get Started Now &rarr;
        </Link>
      </div>

    </div>
  );
}
