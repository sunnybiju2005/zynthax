'use client';

import React from 'react';
import { X, Phone, PhoneCall, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone1?: string;
  phone2?: string;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({
  isOpen,
  onClose,
  phone1 = "+91 7907374029",
  phone2 = "+91 8848241519"
}) => {
  if (!isOpen) return null;

  const contacts = [
    { label: "Primary Phone", phone: phone1 },
    { label: "Secondary Phone", phone: phone2 }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[#070d1e] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 z-10 overflow-hidden"
        >
          {/* Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-500/10 blur-2xl pointer-events-none rounded-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900/60 border border-white/10 hover:bg-slate-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/10">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white font-display">
              Call ZYNTHAX
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Choose a contact number to connect with our representatives.
            </p>
          </div>

          <div className="space-y-3">
            {contacts.map((contact, i) => (
              <a
                key={i}
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                onClick={onClose}
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                      {contact.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {contact.phone}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] font-mono text-slate-400">
              Available 9:00 AM – 7:00 PM IST (Mon – Sat)
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
