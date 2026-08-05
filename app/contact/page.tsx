'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Share2, 
  MessageCircle, 
  ExternalLink,
  Check,
  Info
} from 'lucide-react';
import { InstagramIcon } from '@/components/SocialIcons';
import { ContactForm } from '@/components/ContactForm';
import { WhatsAppModal } from '@/components/WhatsAppModal';
import { PhoneModal } from '@/components/PhoneModal';
import { ToastNotification } from '@/components/ToastNotification';
import { getSettings, getContact } from '@/lib/db';
import type { ContactDetails } from '@/lib/db';
import { SettingsData } from '@/lib/seedData';

export default function ContactPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [contact, setContact]   = useState<ContactDetails | null>(null);
  const [loading, setLoading]   = useState(true);

  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function load() {
      const [settingsData, contactData] = await Promise.all([
        getSettings(),
        getContact(),
      ]);
      setSettings(settingsData);
      setContact(contactData);
      setLoading(false);
    }
    load();
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'ZYNTHAX Digital Solutions',
      text: 'Check out ZYNTHAX Digital Solutions for Website Development, Mobile Apps, Business Software, UI/UX Design, Branding and Digital Solutions.',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://zynthax.com'
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setToastMessage('Website link copied successfully.');
        setIsToastVisible(true);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      } catch (err) { console.error('Failed to copy', err); }
    }
  };

  // All contact values come strictly from Firestore — no hardcoded fallbacks
  const instagramUrl = contact?.instagramUrl  || settings?.instagramUrl  || '';
  const email        = contact?.email         || settings?.contactEmail  || '';
  const phone1       = contact?.phone         || settings?.contactPhone  || '';
  const phone2       = contact?.phone2        || settings?.contactPhone2 || '';
  const whatsapp1    = contact?.whatsappNumber  || settings?.whatsappNumber  || '';
  const whatsapp2    = contact?.whatsappNumber2 || settings?.whatsappNumber2 || '';
  const address      = contact?.address       || settings?.address       || '';
  const workingHours = contact?.workingHours  || '';

  const hasPhone     = phone1 || phone2;
  const hasWhatsApp  = whatsapp1 || whatsapp2;

  if (loading) {
    return (
      <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="h-10 bg-slate-800/60 rounded-full w-48 mx-auto animate-pulse" />
        <div className="h-14 bg-slate-800/60 rounded-xl w-2/3 mx-auto animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 h-96 bg-slate-800/60 rounded-3xl animate-pulse" />
          <div className="lg:col-span-7 h-96 bg-slate-800/60 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START A CONVERSATION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Let&apos;s Build Your Digital Product
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Connect directly with our engineering team or send your project requirements below.
        </p>
      </div>

      {/* Mobile: form first; Desktop: info sidebar first */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Contact Info & Action Buttons Sidebar */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          
          {/* Info Card */}
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10 space-y-5 sm:space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white font-display">ZYNTHAX</h3>
                <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase">Digital Solutions</p>
              </div>
              <button
                onClick={handleShare}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all shadow-md"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />}
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
            
            {/* Contact Details — only rendered when set in Firestore */}
            <div className="space-y-5 text-sm">

              {address && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Location</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">{address}</p>
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Email</h4>
                    <a 
                      href={`mailto:${email}`} 
                      className="text-base font-bold text-white hover:text-purple-300 transition-colors block mt-0.5 underline decoration-purple-500/30 underline-offset-4"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {hasPhone && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Phone</h4>
                    <div className="flex flex-col gap-1 mt-0.5">
                      {phone1 && (
                        <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">
                          {phone1}
                        </a>
                      )}
                      {phone2 && (
                        <a href={`tel:${phone2.replace(/\s+/g, '')}`} className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">
                          {phone2}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {workingHours && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Working Hours</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">{workingHours}</p>
                  </div>
                </div>
              )}

              {/* No contact configured yet */}
              {!address && !email && !hasPhone && !workingHours && (
                <div className="flex items-center gap-3 py-4 text-slate-500 text-sm font-mono">
                  <Info className="w-5 h-5 text-slate-600 shrink-0" />
                  Contact details not configured yet. Update from the Admin App.
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NDA &amp; Client Privacy Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {hasWhatsApp && (
              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/40 text-left transition-all duration-300 shadow-lg shadow-emerald-950/40 overflow-hidden"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors">WhatsApp</span>
                  <span className="text-[11px] text-slate-400 font-medium">Chat on WhatsApp</span>
                </div>
              </button>
            )}

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-pink-950/30 border border-pink-500/30 hover:border-pink-400 hover:bg-pink-900/40 text-left transition-all duration-300 shadow-lg shadow-pink-950/40 overflow-hidden"
              >
                <div className="w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-rose-500 group-hover:to-purple-600 group-hover:text-white transition-all shrink-0">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white group-hover:text-pink-200 transition-colors flex items-center gap-1">
                    Instagram <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-pink-300" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Follow on Instagram</span>
                </div>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/40 text-left transition-all duration-300 shadow-lg shadow-purple-950/40 overflow-hidden"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors">Direct Email</span>
                  <span className="text-[11px] text-slate-400 font-medium">Send Email</span>
                </div>
              </a>
            )}

            {hasPhone && (
              <button
                onClick={() => setIsPhoneOpen(true)}
                className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/40 text-left transition-all duration-300 shadow-lg shadow-cyan-950/40 overflow-hidden"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">Phone Call</span>
                  <span className="text-[11px] text-slate-400 font-medium">Call Now</span>
                </div>
              </button>
            )}

          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Suspense fallback={
            <div className="glass-panel rounded-3xl p-10 border border-white/10 text-center text-slate-400 font-mono text-sm">
              Loading contact form...
            </div>
          }>
            <ContactForm />
          </Suspense>
        </div>

      </div>

      {/* Modals & Toast */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        phone1={phone1}
        phone2={phone2}
        number1={whatsapp1}
        number2={whatsapp2}
      />
      <PhoneModal
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
        phone1={phone1}
        phone2={phone2}
      />
      <ToastNotification
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

    </div>
  );
}
