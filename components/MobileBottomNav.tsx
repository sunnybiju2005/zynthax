'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Wrench, Briefcase, Phone, Menu } from 'lucide-react';
import { ContactBottomSheet } from './ContactBottomSheet';

interface MobileBottomNavProps {
  onOpenMenu?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMenu }) => {
  const pathname = usePathname();
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  const handleOpenMenu = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('zynthax:open-mobile-menu'));
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', href: '/', icon: Home },
    { id: 'services', label: 'Services', href: '/services', icon: Wrench },
    { id: 'portfolio', label: 'Portfolio', href: '/portfolio', icon: Briefcase },
    { id: 'contact', label: 'Contact', action: () => setIsContactSheetOpen(true), icon: Phone },
    { id: 'menu', label: 'Menu', action: handleOpenMenu, icon: Menu },
  ];

  return (
    <>
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="glass-panel rounded-2xl p-2 bg-slate-950/90 border border-white/10 shadow-2xl backdrop-blur-2xl flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.href ? pathname === tab.href : false;

            const content = (
              <div className="relative flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all">
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 rounded-xl"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 relative z-10 transition-colors ${
                    isActive ? 'text-cyan-400 font-bold scale-110' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                <span
                  className={`text-[10px] font-mono tracking-tight relative z-10 transition-colors ${
                    isActive ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-white'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            );

            if (tab.href) {
              return (
                <Link key={tab.id} href={tab.href} className="group">
                  {content}
                </Link>
              );
            }

            return (
              <button key={tab.id} onClick={tab.action} className="group text-left">
                {content}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Sheet */}
      <ContactBottomSheet
        isOpen={isContactSheetOpen}
        onClose={() => setIsContactSheetOpen(false)}
      />
    </>
  );
};
