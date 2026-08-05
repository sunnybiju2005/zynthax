'use client';

import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { motion } from 'framer-motion';
import { WhatsAppModal } from './WhatsAppModal';
import { getSettings, getContact } from '@/lib/db';
import type { ContactDetails } from '@/lib/db';
import { SettingsData } from '@/lib/seedData';

export const FloatingContactButtons: React.FC = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [contact, setContact]   = useState<ContactDetails | null>(null);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getSettings(), getContact()]).then(([s, c]) => {
      if (!isMounted) return;
      if (s) setSettings(s);
      if (c) setContact(c);
    });
    return () => { isMounted = false; };
  }, []);

  // All values come strictly from Firestore — no hardcoded fallbacks
  const instagramUrl = contact?.instagramUrl  || settings?.instagramUrl  || '';
  const email        = contact?.email         || settings?.contactEmail  || '';
  const phone1       = contact?.phone         || settings?.contactPhone  || '';
  const phone2       = contact?.phone2        || settings?.contactPhone2 || '';
  const whatsapp1    = contact?.whatsappNumber  || settings?.whatsappNumber  || '';
  const whatsapp2    = contact?.whatsappNumber2 || settings?.whatsappNumber2 || '';
  const hasWhatsApp  = whatsapp1 || whatsapp2 || phone1 || phone2;

  // Only render if at least one contact option is configured
  const hasAny = instagramUrl || email || hasWhatsApp;
  if (!hasAny) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Email Floating Button — only if configured */}
        {email && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
              Send Email
            </span>
            <a
              href={`mailto:${email}`}
              className="w-12 h-12 rounded-full bg-slate-900/80 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/20 backdrop-blur-md hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:scale-110 transition-all duration-300"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        )}

        {/* Instagram Floating Button — only if configured */}
        {instagramUrl && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
              Follow on Instagram
            </span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-900/80 border border-pink-500/40 text-pink-400 flex items-center justify-center shadow-lg shadow-pink-500/20 backdrop-blur-md hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-pink-400 hover:scale-110 transition-all duration-300"
              aria-label="Follow on Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </motion.div>
        )}

        {/* WhatsApp Floating Button — only if configured */}
        {hasWhatsApp && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0 }}
            className="relative group"
          >
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
              Chat on WhatsApp
            </span>
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center shadow-xl shadow-emerald-500/25 backdrop-blur-md hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all duration-300"
              aria-label="Chat on WhatsApp"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
              <MessageCircle className="w-6 h-6 relative z-10" />
            </button>
          </motion.div>
        )}

      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        phone1={phone1}
        phone2={phone2}
        number1={whatsapp1}
        number2={whatsapp2}
      />
    </>
  );
};
