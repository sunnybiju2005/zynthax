'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  MessageCircle, 
  Check,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from './SocialIcons';
import { WhatsAppModal } from './WhatsAppModal';
import { ToastNotification } from './ToastNotification';
import { getSettings, getContact } from '@/lib/db';
import type { ContactDetails } from '@/lib/db';
import { SettingsData } from '@/lib/seedData';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [contact, setContact]   = useState<ContactDetails | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getSettings(), getContact()]).then(([s, c]) => {
      if (!isMounted) return;
      if (s) setSettings(s);
      if (c) setContact(c);
    });
    return () => { isMounted = false; };
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'ZYNTHAX Digital Solutions',
      text: 'Check out ZYNTHAX Digital Solutions for Website Development, Mobile Apps, Business Software, UI/UX Design, Branding and Digital Solutions.',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://zynthax.com'
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share(shareData); } catch { copyToClipboard(shareData.url); }
    } else {
      copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage('Website link copied successfully.');
    setIsToastVisible(true);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // All contact values come exclusively from Firestore — no hardcoded fallbacks
  const logoUrl      = settings?.logoUrl || null;
  const instagramUrl = contact?.instagramUrl  || settings?.instagramUrl  || '';
  const linkedinUrl  = settings?.linkedinUrl  || '';
  const email        = contact?.email         || settings?.contactEmail  || '';
  const phone1       = contact?.phone         || settings?.contactPhone  || '';
  const phone2       = contact?.phone2        || settings?.contactPhone2 || '';
  const address      = contact?.address       || settings?.address       || '';
  const whatsapp1    = contact?.whatsappNumber  || settings?.whatsappNumber  || '';
  const whatsapp2    = contact?.whatsappNumber2 || settings?.whatsappNumber2 || '';

  // Only build social items for configured links
  const socialItems = [
    instagramUrl && {
      label: 'Instagram',
      icon: InstagramIcon,
      href: instagramUrl,
      isExternal: true,
      color: 'hover:text-pink-400 hover:border-pink-500/50 hover:shadow-pink-500/30'
    },
    (whatsapp1 || whatsapp2) && {
      label: 'WhatsApp',
      icon: MessageCircle,
      onClick: () => setIsWhatsAppOpen(true),
      color: 'hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-emerald-500/30'
    },
    linkedinUrl && {
      label: 'LinkedIn',
      icon: LinkedinIcon,
      href: linkedinUrl,
      isExternal: true,
      color: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-cyan-500/30'
    },
    email && {
      label: 'Email',
      icon: Mail,
      href: `mailto:${email}`,
      color: 'hover:text-purple-400 hover:border-purple-500/50 hover:shadow-purple-500/30'
    },
    {
      label: copiedLink ? 'Copied!' : 'Share',
      icon: copiedLink ? Check : Share2,
      onClick: handleShare,
      color: 'hover:text-cyan-300 hover:border-cyan-400/50 hover:shadow-cyan-500/30'
    }
  ].filter(Boolean) as any[];

  return (
    <>
      <footer className="relative bg-[#02050e] border-t border-cyan-500/20 pt-12 pb-24 md:pb-12 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-t from-cyan-950/20 via-purple-950/10 to-transparent pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 mb-10 sm:mb-12">
            
            {/* 1. Company Logo & Brand */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 p-1 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors overflow-hidden">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt="ZYNTHAX Logo"
                      width={36}
                      height={36}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]"
                    />
                  ) : (
                    <span className="text-xs font-extrabold text-cyan-400 font-display">ZX</span>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl font-extrabold tracking-tight text-white font-display">ZYNTHAX</span>
                  <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono -mt-0.5">Digital Solutions</span>
                </div>
              </Link>

              {settings?.siteDescription ? (
                <p className="text-slate-300 text-sm leading-relaxed max-w-sm">{settings.siteDescription}</p>
              ) : (
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Building high-performance websites, mobile apps, and business software.
                </p>
              )}
            </div>

            {/* 2. Quick Links */}
            <div className="lg:col-span-3 text-left space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Team', href: '/team' },
                  { label: 'Services', href: '/services' },
                  { label: 'Portfolio', href: '/portfolio' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Contact', href: '/contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 group font-medium"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Contact Info — only rendered if configured in Firestore */}
            <div className="lg:col-span-3 text-left space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">Contact</h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {address && (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{address}</span>
                  </li>
                )}
                {email && (
                  <li className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <a href={`mailto:${email}`} className="hover:text-white transition-colors underline decoration-cyan-500/30">
                      {email}
                    </a>
                  </li>
                )}
                {phone1 && (
                  <li className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                      {phone1}
                    </a>
                  </li>
                )}
                {phone2 && (
                  <li className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <a href={`tel:${phone2.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                      {phone2}
                    </a>
                  </li>
                )}
                {!address && !email && !phone1 && (
                  <li className="text-slate-500 text-xs font-mono italic">
                    Contact info not configured yet.
                  </li>
                )}
              </ul>
            </div>

            {/* 4. Social Icons — only for configured platforms */}
            <div className="lg:col-span-2 text-left space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">Follow Us</h4>
              <div className="flex items-center gap-3 flex-wrap pt-1">
                {socialItems.map((soc, i) => {
                  const Icon = soc.icon;
                  if (soc.onClick) {
                    return (
                      <button
                        key={i}
                        onClick={soc.onClick}
                        title={soc.label}
                        className={`w-11 h-11 rounded-full bg-slate-900/90 border border-white/10 flex items-center justify-center text-slate-300 shadow-md backdrop-blur-md hover:scale-110 hover:shadow-lg transition-all duration-300 ${soc.color}`}
                        aria-label={soc.label}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  }
                  return (
                    <a
                      key={i}
                      href={soc.href}
                      target={soc.isExternal ? '_blank' : '_self'}
                      rel={soc.isExternal ? 'noopener noreferrer' : undefined}
                      title={soc.label}
                      className={`w-11 h-11 rounded-full bg-slate-900/90 border border-white/10 flex items-center justify-center text-slate-300 shadow-md backdrop-blur-md hover:scale-110 hover:shadow-lg transition-all duration-300 ${soc.color}`}
                      aria-label={soc.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs sm:text-sm text-slate-400 font-mono">
            <p>© {new Date().getFullYear()} ZYNTHAX Digital Solutions. All Rights Reserved.</p>
            <p className="text-slate-300">
              Designed &amp; Developed by <span className="text-cyan-400 font-semibold">ZYNTHAX Digital Solutions</span>
            </p>
          </div>

        </div>
      </footer>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        phone1={phone1}
        phone2={phone2}
        number1={whatsapp1}
        number2={whatsapp2}
      />
      <ToastNotification
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </>
  );
};
