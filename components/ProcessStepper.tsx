'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export interface ProcessStep {
  stepNumber?: number;
  title: string;
  description: string;
}

interface ProcessStepperProps {
  steps?: ProcessStep[] | null;
}

export const ProcessStepper: React.FC<ProcessStepperProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const safeSteps = Array.isArray(steps) ? steps : [];

  if (safeSteps.length === 0) return null;

  const currentStep = safeSteps[activeStep] || safeSteps[0];
  const title = currentStep?.title || 'Process Step';
  const description = currentStep?.description || 'Execution milestone.';
  const stepNum = currentStep?.stepNumber || activeStep + 1;

  const handleNext = () => {
    setActiveStep((prev) => (prev >= safeSteps.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? safeSteps.length - 1 : prev - 1));
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Stepper Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
            STEP {activeStep + 1} OF {safeSteps.length}
          </span>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-1.5">
          {safeSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                index === activeStep
                  ? 'w-6 bg-gradient-to-r from-cyan-400 to-purple-500'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Active Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 min-h-[160px] flex flex-col justify-between"
        >
          <div>
            <div className="text-3xl font-extrabold text-cyan-400/30 font-mono mb-1">
              0{stepNum}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              {description}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Guaranteed Milestones &amp; QA Checkpoints</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Stepper Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold font-mono shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
        >
          Next Step <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
