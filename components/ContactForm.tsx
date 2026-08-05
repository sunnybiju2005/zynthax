'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { submitEnquiry, getServices } from '@/lib/db';
import { ServiceItem } from '@/lib/seedData';

interface ContactFormProps {
  defaultService?: string;
}

const DEFAULT_SERVICE_OPTIONS = [
  "Website Development",
  "Mobile App Development",
  "Software Development",
  "UI/UX Design",
  "Branding & Creative Media",
  "Video Editing & Motion Graphics"
];

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService }) => {
  const searchParams = useSearchParams();
  const serviceQuery = searchParams ? searchParams.get('service') : null;

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || serviceQuery || 'Website Development',
    budget: '$1,000 - $5,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadServices() {
      const data = await getServices();
      setServices(data);

      if (serviceQuery) {
        const matched = data.find(s => s.slug === serviceQuery || s.id === serviceQuery);
        if (matched) {
          setFormData(prev => ({ ...prev, service: matched.title }));
        }
      }
    }
    loadServices();
  }, [serviceQuery]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitEnquiry(formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: services.length > 0 ? services[0].title : 'Website Development',
          budget: '$1,000 - $5,000',
          message: '',
        });
      } else {
        setErrorMsg('Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = services.length > 0
    ? services.map(s => s.title)
    : DEFAULT_SERVICE_OPTIONS;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl shadow-cyan-950/20">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Start Your Project Blueprint
          </h3>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white font-display">
              Enquiry Received!
            </h4>
            <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
              Thank you for contacting <strong className="text-cyan-400">ZYNTHAX Digital Solutions</strong>. 
              Our team will review your specifications and reach out within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-sm font-semibold transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-2 uppercase tracking-wider">
                  Your Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alexander Wright"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-2 uppercase tracking-wider">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alexander@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-2 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                />
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-2 uppercase tracking-wider">
                  Service Required <span className="text-cyan-400">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                >
                  {serviceOptions.map(opt => (
                    <option key={opt} value={opt} className="bg-slate-950 text-white">
                      {opt}
                    </option>
                  ))}
                  <option value="Other Custom Solution" className="bg-slate-950 text-white">
                    Other / Custom Digital Solution
                  </option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-2 uppercase tracking-wider">
                  Estimated Budget
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                >
                  <option value="Under $1,000" className="bg-slate-950 text-white">Under $1,000</option>
                  <option value="$1,000 - $5,000" className="bg-slate-950 text-white">$1,000 - $5,000</option>
                  <option value="$5,000 - $10,000" className="bg-slate-950 text-white">$5,000 - $10,000</option>
                  <option value="$10,000+" className="bg-slate-950 text-white">$10,000+</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-2 uppercase tracking-wider">
                Project Details & Specifications <span className="text-cyan-400">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your requirements, goals, timelines, or questions..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm resize-y"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Specifications to Cloud...
                </>
              ) : (
                <>
                  Send Project Proposal
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 font-mono pt-2">
              🔒 Form responses push directly to Firebase Firestore for Admin App review.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
