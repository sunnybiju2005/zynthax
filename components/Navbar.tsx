'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, Share2, Mail, MessageCircle, Check } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from './SocialIcons';
import { WhatsAppModal } from './WhatsAppModal';
import { PhoneModal } from './PhoneModal';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Technologies', href: '/technologies' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
];

const LOGO_URL = "https://res.cloudinary.com/dqhn8wq7k/image/upload/v1785569155/logo_no_backgrnd_tkatgq.png";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onOpenMenu = () => setMobileOpen(true);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('zynthax:open-mobile-menu', onOpenMenu);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('zynthax:open-mobile-menu', onOpenMenu);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

  const handleShare = async () => {
    const shareData = {
      title: 'ZYNTHAX Digital Solutions',
      text: 'Architecting high-performance websites, mobile apps, enterprise software, and motion media.',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://zynthax.com',
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard(shareData.url);
      }
    } else {
      copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20'
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* ── LEFT: Official ZYNTHAX Logo ── */}
            <Link 
              href="/" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 group shrink-0 py-2"
            >
              <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900/80 border border-white/10 p-1 group-hover:border-cyan-500/50 transition-all shrink-0">
                <Image
                  src={LOGO_URL}
                  alt="ZYNTHAX Digital Solutions"
                  width={36}
                  height={36}
                  className="max-h-[38px] w-auto h-auto object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform"
                  priority
                />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-base sm:text-lg font-extrabold tracking-wider text-white font-display">
                  ZYNTHA<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">X</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-cyan-400 font-mono uppercase -mt-0.5">
                  Digital Solutions
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAVIGATION ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl group ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors" />
                  </Link>
                );
              })}
            </nav>

            {/* ── DESKTOP CTA + MOBILE HAMBURGER TOGGLE ── */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
                  bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
                  shadow-lg shadow-cyan-500/20
                  hover:shadow-cyan-500/40 hover:scale-105
                  transition-all duration-300"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Animated Hamburger Icon for Mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-11 h-11 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 flex items-center justify-center transition-all active:scale-95 shadow-md shadow-cyan-950/20 focus:outline-none"
                aria-label="Toggle Mobile Menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6 text-cyan-400" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── FULLSCREEN MOBILE NAVIGATION DRAWER ── */}
        <AnimatePresence>
          {mobileOpen && (
            <div className="lg:hidden fixed inset-0 z-[100] flex justify-end">
              {/* Dark Backdrop Overlay (Clicking outside closes drawer) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              {/* Fullscreen Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="relative w-full max-w-md bg-[#020617]/95 border-l border-cyan-500/20 h-full flex flex-col justify-between p-6 shadow-2xl backdrop-blur-2xl overflow-y-auto z-10"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 p-1 flex items-center justify-center">
                      <Image
                        src={LOGO_URL}
                        alt="ZYNTHAX Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-base font-extrabold text-white font-display">ZYNTHAX</span>
                  </div>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 transition-all active:scale-95"
                    aria-label="Close Navigation Drawer"
                  >
                    <X className="w-5 h-5 text-cyan-400" />
                  </button>
                </div>

                {/* Drawer Menu Items */}
                <div className="flex-1 py-8 space-y-2.5 overflow-y-auto">
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-lg font-bold transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-display'
                              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent font-display'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ArrowRight className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Drawer Bottom Actions: Instagram, WhatsApp, Email, Share */}
                <div className="pt-6 border-t border-white/10 space-y-5">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest text-center">
                    Connect With Us
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/zynthax_digital_solutions?utm_source=qr&igsh=MWgzOGFqcTVteThmNA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-12 rounded-2xl bg-slate-900 border border-pink-500/30 text-pink-400 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-md active:scale-95"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </a>

                    {/* WhatsApp */}
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        setIsWhatsAppOpen(true);
                      }}
                      className="w-full h-12 rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-md active:scale-95"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>

                    {/* Email */}
                    <a
                      href="mailto:zynthax13@gmail.com"
                      className="w-full h-12 rounded-2xl bg-slate-900 border border-blue-500/30 text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-md active:scale-95"
                      aria-label="Send Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>

                    {/* Share */}
                    <button
                      onClick={handleShare}
                      className="w-full h-12 rounded-2xl bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-md active:scale-95"
                      aria-label="Share Website"
                    >
                      {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                    </button>
                  </div>

                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3.5 rounded-2xl text-sm font-bold text-white text-center flex items-center justify-center gap-2
                      bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
                      shadow-xl shadow-cyan-500/25 active:scale-95 transition-all"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* WhatsApp Modal Trigger from Drawer */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        phone1="+91 7907374029"
        phone2="+91 8848241519"
        number1="917907374029"
        number2="918848241519"
      />
    </>
  );
};
