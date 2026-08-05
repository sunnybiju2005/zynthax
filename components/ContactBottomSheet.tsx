'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  MessageCircle, 
  Mail, 
  Share2, 
  Check, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { WhatsAppModal } from './WhatsAppModal';
import { PhoneModal } from './PhoneModal';
import { ContactDetails } from '@/lib/db';

interface ContactBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: ContactDetails | null;
}

export const ContactBottomSheet: React.FC<ContactBottomSheetProps> = ({
  isOpen,
  onClose,
  contact = null,
}) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // All contact details come strictly from Firestore via the `contact` prop.
  // No hardcoded phone numbers, emails, or social links.
  const phone1        = contact?.phone  || '';
  const phone2        = contact?.phone2 || '';
  const whatsapp1     = contact?.whatsappNumber  || '';
  const whatsapp2     = contact?.whatsappNumber2 || '';
  const email         = contact?.email         || '';
  const instagramUrl  = contact?.instagramUrl  || '';

  const hasPhone     = phone1 || phone2;
  const hasWhatsApp  = whatsapp1 || whatsapp2;
  const hasEmail     = !!email;
  const hasInstagram = !!instagramUrl;
  const hasAnyContact = hasPhone || hasEmail || hasInstagram || hasWhatsApp;

  const handleShare = async () => {
    const shareData = {
      title: 'ZYNTHAX Digital Solutions',
      text: 'Digital agency building websites, mobile apps, and business software.',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://zynthax.com',
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard(shareData.url);
      }
    } else {
      copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Sliding Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-slate-900/95 border-t border-cyan-500/30 rounded-t-3xl p-6 shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl pb-10 z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Drag Handle */}
              <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono mb-1">
                    <Sparkles className="w-3 h-3" /> DIRECT CONTACT
                  </div>
                  <h3 className="text-xl font-extrabold text-white font-display">
                    ZYNTHAX Digital Solutions
                  </h3>
                  {contact?.address && (
                    <p className="text-xs text-slate-400 font-mono">{contact.address}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact not configured state */}
              {!hasAnyContact ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center mx-auto">
                    <Info className="w-6 h-6 text-slate-500" />
                  </div>
                  <p className="text-slate-400 text-sm font-mono">
                    Contact details not configured yet.
                  </p>
                  <p className="text-slate-500 text-xs font-mono">
                    Update contact info from the Admin App.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">

                  {/* WhatsApp — only if configured */}
                  {hasWhatsApp && (
                    <button
                      onClick={() => setIsWhatsAppOpen(true)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Chat on WhatsApp</div>
                          <div className="text-[11px] text-emerald-400/80 font-mono">Instant response for project inquiries</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  {/* Direct Call — only if phone configured */}
                  {hasPhone && (
                    <button
                      onClick={() => setIsCallOpen(true)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Call Now</div>
                          <div className="text-[11px] text-cyan-400/80 font-mono">
                            {phone1}{phone2 ? ` / ${phone2}` : ''}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  {/* Instagram — only if configured */}
                  {hasInstagram && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-pink-500/30 text-pink-300 hover:border-pink-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-400">
                          <InstagramIcon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">Follow on Instagram</div>
                          <div className="text-[11px] text-pink-400/80 font-mono">View our creative portfolio</div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    </a>
                  )}

                  {/* Email — only if configured */}
                  {hasEmail && (
                    <a
                      href={`mailto:${email}`}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Send Email</div>
                          <div className="text-[11px] text-blue-400/80 font-mono">{email}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}

                  {/* Share Website — always available */}
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-slate-700/60 border border-white/10 flex items-center justify-center text-cyan-400">
                        {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-white">
                          {copiedLink ? 'Link Copied!' : 'Share Website'}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {copiedLink ? 'Paste anywhere to share' : 'Spread the word about ZYNTHAX'}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sub-modals */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        phone1={phone1}
        phone2={phone2}
        number1={whatsapp1}
        number2={whatsapp2}
      />
      <PhoneModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        phone1={phone1}
        phone2={phone2}
      />
    </>
  );
};
