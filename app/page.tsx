'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Layers, 
  Sparkles,
  Zap,
  PhoneCall,
  LayoutGrid,
  Star,
  FolderOpen
} from 'lucide-react';
import { 
  getServices, 
  getProjects, 
  getStatistics, 
  getTestimonials, 
  getTechnologies, 
  getAbout,
  getContact
} from '@/lib/db';
import type { ContactDetails } from '@/lib/db';
import { ServiceItem, ProjectItem, StatItem, TestimonialItem, TechItem, AboutData, SettingsData } from '@/lib/seedData';
import { HeroSection } from '@/components/HeroSection';
import { SectionHeader } from '@/components/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectCard } from '@/components/ProjectCard';
import { MediaModal } from '@/components/MediaModal';
import { GlassCard } from '@/components/GlassCard';
import { ProcessStepper } from '@/components/ProcessStepper';
import { TechMarquee } from '@/components/TechMarquee';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { ContactBottomSheet } from '@/components/ContactBottomSheet';

export default function HomePage() {
  const [services, setServices]     = useState<ServiceItem[]>([]);
  const [projects, setProjects]     = useState<ProjectItem[]>([]);
  const [stats, setStats]           = useState<StatItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [techs, setTechs]           = useState<TechItem[]>([]);
  const [about, setAbout]           = useState<AboutData | null>(null);
  const [settings, setSettings]     = useState<SettingsData | null>(null);
  const [contact, setContact]       = useState<ContactDetails | null>(null);
  const [loading, setLoading]       = useState(true);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [servData, projData, statData, testData, techData, aboutData, settingsData, contactData] = await Promise.all([
        getServices(),
        getProjects(),
        getStatistics(),
        getTestimonials(),
        getTechnologies(),
        getAbout(),
        import('@/lib/db').then(m => m.getSettings()),
        getContact(),
      ]);
      setServices(servData);
      setProjects(projData);
      setStats(statData);
      setTestimonials(testData);
      setTechs(techData);
      setAbout(aboutData);
      setSettings(settingsData);
      setContact(contactData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Process steps come exclusively from Firestore about.approach
  const processSteps = Array.isArray(about?.approach) && about.approach.length > 0
    ? about.approach.map((step, idx) => ({
        stepNumber: idx + 1,
        title: step.title || `Step ${idx + 1}`,
        description: step.desc || '',
      }))
    : [];

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="pb-24 space-y-16 sm:space-y-24">

      {/* ── 1. HERO ── */}
      <HeroSection settings={settings} />

      {/* ── 2. ABOUT INTRO CARD ── */}
      {about && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GlassCard hoverGlow="cyan" className="p-6 sm:p-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                  <Layers className="w-3.5 h-3.5" />
                  <span>ABOUT ZYNTHAX</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                  {about.title || 'Engineering Digital Products That Scale Worldwide'}
                </h2>
                {about.description && (
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {about.description}
                  </p>
                )}
              </div>
              <Link
                href="/about"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0"
              >
                Read More &rarr;
              </Link>
            </div>
          </GlassCard>
        </section>
      )}

      {/* ── 3. SERVICES ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Digital &amp; Creative Services
            </h2>
          </div>
          {services.length > 0 && (
            <Link
              href="/services"
              className="hidden sm:flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
            >
              View All Services &rarr;
            </Link>
          )}
        </div>

        {services.length > 0 ? (
          <>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {services.map((service, index) => (
                <ServiceCard key={service.id || index} service={service} index={index} carousel={true} />
              ))}
            </div>
            <div className="text-center mt-4 sm:hidden">
              <Link href="/services" className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400">
                Explore All {services.length} Digital Services &rarr;
              </Link>
            </div>
          </>
        ) : !loading && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 glass-panel rounded-3xl border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
              <LayoutGrid className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-400 font-display">No Services Yet</h3>
            <p className="text-slate-500 text-sm font-mono max-w-xs">
              Services will appear here once added from the Admin App.
            </p>
          </div>
        )}
      </section>

      {/* ── 4. FEATURED PROJECTS ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Highlighted Deliverables
            </h2>
          </div>
          {featuredProjects.length > 0 && (
            <Link
              href="/portfolio"
              className="hidden sm:flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-white transition-colors"
            >
              View Full Portfolio &rarr;
            </Link>
          )}
        </div>

        {featuredProjects.length > 0 ? (
          <>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  onOpenModal={setSelectedProject}
                  index={index}
                  carousel={true}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-xs sm:text-sm hover:bg-cyan-500/30 transition-all"
              >
                View Full Portfolio ({projects.length} {projects.length === 1 ? 'Project' : 'Projects'})
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : !loading && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 glass-panel rounded-3xl border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
              <FolderOpen className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-400 font-display">No Featured Projects</h3>
            <p className="text-slate-500 text-sm font-mono max-w-xs">
              Projects will appear here once added from the Admin App.
            </p>
          </div>
        )}
      </section>

      {/* ── 5. PROCESS STEPPER — only if about.approach data exists ── */}
      {processSteps.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SectionHeader
            badge="EXECUTION FLOW"
            title="Our Project"
            gradientText="Development Process"
            description={about?.subtitle || 'Our step-by-step workflow from discovery to deployment.'}
          />
          <ProcessStepper steps={processSteps} />
        </section>
      )}

      {/* ── 6. TECH MARQUEE — only if technologies exist ── */}
      {techs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
          <div className="text-center">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              TECHNOLOGY STACK
            </span>
          </div>
          <TechMarquee techs={techs} />
          <div className="text-center">
            <Link href="/technologies" className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors">
              View Complete Technology Stack &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* ── 7. TESTIMONIALS — only if data exists ── */}
      {testimonials.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SectionHeader
            badge="CLIENT REVIEWS"
            title="Trusted by Leaders"
            gradientText="Worldwide"
            description="Real feedback from executives and founders powered by ZYNTHAX Digital Solutions."
          />
          <TestimonialSlider testimonials={testimonials} />
        </section>
      )}

      {/* ── 8. CONTACT CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <GlassCard hoverGlow="cyan" className="p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              Ready to Innovate?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Let&apos;s Build Something Extraordinary Together
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect directly with our engineering team for instant project estimates.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsContactSheetOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Direct Contact Options
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-all"
              >
                Open Contact Form &rarr;
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Project Lightbox Modal */}
      <MediaModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      {/* Bottom Contact Sheet */}
      <ContactBottomSheet
        isOpen={isContactSheetOpen}
        onClose={() => setIsContactSheetOpen(false)}
        contact={contact}
      />

    </div>
  );
}
