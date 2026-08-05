'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getServices } from '@/lib/db';
import { ServiceItem } from '@/lib/seedData';
import { SectionHeader } from '@/components/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getServices();
      setServices(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR CAPABILITIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          10 Dynamic Digital Services
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From full-stack web applications and mobile apps to custom billing software, branding, and motion graphics.
        </p>
      </div>

      {/* Grid of All Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.id || index} service={service} index={index} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white font-display">Need a Customized Software or Media Solution?</h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          We tailor architecture and design to your specific business requirements. Speak directly with our technical team today.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25"
          >
            Book Technical Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
