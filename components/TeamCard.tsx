'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Star, ExternalLink, User } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from './SocialIcons';
import { TeamMember } from '@/lib/seedData';

interface TeamCardProps {
  member?: TeamMember | null;
  index?: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index = 0 }) => {
  const [profileImgError, setProfileImgError] = useState(false);
  const [coverImgError, setCoverImgError] = useState(false);

  if (!member) return null;

  // Requirement 1, 4, 10: Extract profilePhoto and coverPhoto exact fields
  const profilePhoto = (member.profilePhoto || member.profileImage || '').trim();
  const coverPhoto = (member.coverPhoto || member.coverImage || '').trim();
  const name = member.name || 'Team Specialist';
  const designation = member.designation || 'Software Engineer';
  const shortDesc = member.shortDescription || 'ZYNTHAX Team Member';
  const experience = member.experience || '1+ Year';
  const skills = Array.isArray(member.skills) ? member.skills : [];

  // Requirement 5 & 6: Log fetched profilePhoto and coverPhoto URLs in browser console
  console.log(`[TeamCard Render - ${name}] profilePhoto: "${profilePhoto || '(missing)'}" | coverPhoto: "${coverPhoto || '(empty/hidden)'}"`);

  const hasCover = Boolean(coverPhoto && !coverImgError);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between h-full relative"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

      <div>
        {/* Requirement 5, 6, 7, 10: Display coverPhoto using standard HTML img tag with explicit height, width, and clear opacity */}
        {hasCover && (
          <div className="relative w-full h-36 sm:h-44 bg-slate-950 overflow-hidden block">
            <img
              src={coverPhoto}
              alt={`${name} cover`}
              className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-500 block"
              onError={(e) => {
                console.error(`[TeamCard Cover Image Error] Standard HTML img tag failed to load cover photo for "${name}": "${coverPhoto}"`, e);
                setCoverImgError(true);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent pointer-events-none" />

            {/* Featured Badge overlay on cover */}
            {member.featured && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30 flex items-center gap-1 z-10">
                <Star className="w-3 h-3 fill-white" /> FEATURED
              </div>
            )}

            {/* Experience Badge overlay on cover */}
            {experience && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 z-10">
                {experience}
              </div>
            )}
          </div>
        )}

        {/* Profile Avatar & Badges Header */}
        <div className={`px-6 relative mb-4 flex items-end justify-between ${hasCover ? '-mt-12' : 'pt-6'}`}>
          {!hasCover && (
            <div className="absolute top-6 right-6 flex items-center gap-2">
              {member.featured && (
                <div className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> FEATURED
                </div>
              )}
            </div>
          )}

          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl shadow-cyan-500/20 bg-slate-900 shrink-0 group-hover:border-purple-400 transition-colors flex items-center justify-center">
            {profilePhoto && !profileImgError ? (
              /* Requirement 4: Next.js Image component with member.profilePhoto */
              <Image
                src={profilePhoto}
                alt={name}
                fill
                unoptimized
                sizes="88px"
                className="object-cover"
                onError={(e) => {
                  console.warn(`[TeamCard Image Error] Profile image failed Next image proxy for "${name}": "${profilePhoto}". Testing direct HTML img tag fallback.`, e);
                  setProfileImgError(true);
                }}
              />
            ) : profilePhoto ? (
              /* Requirement 8: HTML img tag fallback */
              <img
                src={profilePhoto}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`[TeamCard Image Error] HTML img tag also failed to load for "${name}": "${profilePhoto}"`, e);
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900 text-cyan-400">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>

          {/* Social Badges Quick Row */}
          <div className="flex items-center gap-1.5 mb-1">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-all"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            {member.portfolioWebsite && (
              <a
                href={member.portfolioWebsite}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                title="Website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Info Content */}
        <div className="px-6 space-y-2">
          <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
            {name}
          </h3>
          <p className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            {designation}
          </p>
          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 pt-1">
            {shortDesc}
          </p>

          {/* Skills Badges */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3">
              {skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-950/80 text-purple-300 border border-purple-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="p-6 pt-5 mt-4 border-t border-white/5">
        <Link
          href={`/team/${member.slug || member.id || '#'}`}
          className="w-full py-2.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 text-cyan-400 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:bg-cyan-500/10"
        >
          <span>View Profile</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
