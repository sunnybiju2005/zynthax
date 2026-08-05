import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Mail, 
  Phone, 
  ArrowLeft, 
  Sparkles, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Briefcase,
  ExternalLink,
  Code2,
  User
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from '@/components/SocialIcons';
import { getTeamMemberById, getTeamMembers, getProjects } from '@/lib/db';
import { TeamCard } from '@/components/TeamCard';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    return {
      title: 'Team Member | ZYNTHAX Digital Solutions',
    };
  }

  return {
    title: `${member.name} | ${member.designation} | ZYNTHAX Digital Solutions`,
    description: member.shortDescription || member.fullBiography,
    openGraph: {
      title: `${member.name} - ${member.designation}`,
      description: member.shortDescription,
      images: member.profileImage ? [{ url: member.profileImage }] : [],
    },
  };
}

export default async function TeamMemberDetailPage({ params }: Props) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member || member.status === 'inactive') {
    notFound();
  }

  const [allMembers, allProjects] = await Promise.all([
    getTeamMembers(),
    getProjects()
  ]);

  const relatedMembers = allMembers.filter(m => m.id !== member.id && m.slug !== member.slug).slice(0, 3);
  const memberTechs = Array.isArray(member.technologies) ? member.technologies : [];
  const contributedProjects = allProjects.filter(p => {
    const projTechs = Array.isArray(p?.technologies) ? p.technologies : [];
    return projTechs.some(t => memberTechs.includes(t)) || Boolean(p?.featured);
  }).slice(0, 3);

  return (
    <div className="pb-24 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Button */}
      <div className="pt-6">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-400 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Team Directory
        </Link>
      </div>

      {/* Hero Header Banner */}
      {(() => {
        const coverPhoto = (member.coverPhoto || member.coverImage || '').trim();
        const profilePhoto = (member.profilePhoto || member.profileImage || '').trim();
        console.log(`[TeamMemberDetailPage - ${member.name}] profilePhoto: "${profilePhoto || '(missing)'}" | coverPhoto: "${coverPhoto || '(empty/hidden)'}"`);
        const hasCover = Boolean(coverPhoto);

        return (
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 relative">
            {/* Requirement 2, 5, 6, 7, 10: Cover Photo banner displayed using standard HTML img tag */}
            {hasCover && (
              <div className="relative w-full h-48 sm:h-72 bg-slate-950 overflow-hidden block">
                <img
                  src={coverPhoto}
                  alt={`${member.name} cover`}
                  className="w-full h-full object-cover object-center opacity-90 block"
                  onError={(e) => {
                    console.error(`[TeamMemberDetailPage Cover Error] Standard HTML img tag failed to load cover photo for "${member.name}": "${coverPhoto}"`, e);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Profile Info Overlay */}
            <div className={`px-6 sm:px-10 relative pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 ${hasCover ? '-mt-16 sm:-mt-20' : 'pt-8'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-cyan-400/60 shadow-2xl shadow-cyan-500/30 bg-slate-900 shrink-0 flex items-center justify-center">
              {(member.profilePhoto || member.profileImage) ? (
                <Image
                  src={member.profilePhoto || member.profileImage || ''}
                  alt={member.name}
                  fill
                  unoptimized
                  sizes="144px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-cyan-400">
                  <User className="w-16 h-16" />
                </div>
              )}
            </div>

            <div className="space-y-1 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{member.experience} EXPERIENCE</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
                {member.name}
              </h1>
              <p className="text-sm sm:text-base font-mono text-cyan-400 font-bold uppercase tracking-wider">
                {member.designation}
              </p>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all shadow-md"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-md"
                title="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-400 transition-all shadow-md"
                title="Instagram Profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            )}
            {member.portfolioWebsite && (
              <a
                href={member.portfolioWebsite}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-all shadow-md"
                title="Personal Portfolio Website"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            <a
              href={`mailto:${member.email}`}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Contact Directly
            </a>
          </div>
        </div>
      </div>
      );
      })()}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Biography & Skills (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Biography */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" /> Biography &amp; Technical Direction
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {member.fullBiography}
            </p>
          </div>

          {/* Core Competencies & Skills */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" /> Core Competencies &amp; Skills
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Specialized Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(member.skills) ? member.skills : []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Technologies &amp; Frameworks</div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(member.technologies) ? member.technologies : []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium flex items-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" /> {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contributed Projects */}
          {contributedProjects.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Featured Projects Contributed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contributedProjects.map((project, idx) => (
                  <div key={project.id || idx} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                    <div className="text-xs font-mono text-cyan-400">{project.category}</div>
                    <h4 className="text-base font-bold text-white font-display">{project.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{project?.shortDescription || project?.description || 'No description available.'}</p>
                    <Link href={`/portfolio/${project.id}`} className="inline-block text-xs font-mono text-cyan-300 hover:text-white pt-1">
                      View Project Case Study &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Details & Related Team (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/10 pb-3">
              Direct Contact
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${member.email}`} className="hover:text-white transition-colors underline decoration-cyan-500/30 truncate">
                  {member.email}
                </a>
              </div>
              {member.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {member.phone}
                  </a>
                </div>
              )}
              {member.joinedDate && (
                <div className="flex items-center gap-3 text-slate-400 font-mono text-xs">
                  <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Joined ZYNTHAX: {member.joinedDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Related Team Members */}
          {relatedMembers.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                Other Team Members
              </h3>
              <div className="space-y-3">
                {relatedMembers.map((rel, idx) => (
                  <Link
                    key={rel.id || idx}
                    href={`/team/${rel.slug || rel.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 transition-all group"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/30 shrink-0">
                      <Image
                        src={rel.profilePhoto || rel.profileImage || ''}
                        alt={rel.name}
                        fill
                        unoptimized
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 line-clamp-1">{rel.designation}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
