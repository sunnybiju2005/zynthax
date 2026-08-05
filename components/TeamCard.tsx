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

  const profileImg = member.profileImage && typeof member.profileImage === 'string' ? member.profileImage.trim() : '';
  const coverImg = member.coverImage && typeof member.coverImage === 'string' ? member.coverImage.trim() : '';
  const name = member.name || 'Team Specialist';
  const designation = member.designation || 'Software Engineer';
  const shortDesc = member.shortDescription || 'ZYNTHAX Team Member';
  const experience = member.experience || '1+ Year';
  const skills = Array.isArray(member.skills) ? member.skills : [];

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
        {/* Cover & Profile Image Header */}
        <div className="relative w-full h-32 sm:h-36 bg-slate-950 overflow-hidden">
          {coverImg && !coverImgError ? (
            <Image
              src={coverImg}
              alt={`${name} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
              onError={(e) => {
                console.error(`[TeamCard Image Error] Cover image failed to load for "${name}" (ID: ${member.id}) from URL: "${coverImg}"`, e);
                setCoverImgError(true);
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-purple-950/40" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

          {/* Featured Badge */}
          {member.featured && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30 flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" /> FEATURED
            </div>
          )}

          {/* Experience Badge */}
          {experience && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
              {experience}
            </div>
          )}
        </div>

        {/* Profile Avatar Overlap */}
        <div className="px-6 relative -mt-12 mb-4 flex items-end justify-between">
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl shadow-cyan-500/20 bg-slate-900 shrink-0 group-hover:border-purple-400 transition-colors flex items-center justify-center">
            {profileImg && !profileImgError ? (
              <Image
                src={profileImg}
                alt={name}
                fill
                sizes="88px"
                className="object-cover"
                onError={(e) => {
                  console.error(`[TeamCard Image Error] Profile image failed to load for "${name}" (ID: ${member.id}) from Cloudinary/Firestore URL: "${profileImg}"`, e);
                  setProfileImgError(true);
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
