'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';

interface BlogPostClientProps {
  post: BlogPost | null;
  relatedPosts: BlogPost[];
  slug: string;
}

export default function BlogPostClient({ post, relatedPosts, slug }: BlogPostClientProps) {
  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 px-4">
        <BookOpen className="w-16 h-16 text-slate-600" />
        <div>
          <h1 className="text-2xl font-bold text-white font-display mb-2">Article Not Found</h1>
          <p className="text-slate-400 text-sm font-mono">
            The article &ldquo;{slug}&rdquo; could not be found.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-sm hover:bg-cyan-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const title = post.title || 'Untitled Article';
  const excerpt = post.excerpt || '';
  const content = typeof post.content === 'string' ? post.content : '';
  const category = post.category || 'Engineering';
  const readTime = post.readTime || '3 min read';
  const publishedAt = post.publishedAt || '';
  const author = post.author || 'ZYNTHAX Team';
  const coverImage = post.coverImage || PLACEHOLDER_PROJECT_IMAGE;
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const safeRelatedPosts = Array.isArray(relatedPosts) ? relatedPosts : [];

  // Convert markdown-like content to paragraphs
  const renderContent = (rawContent: string) => {
    const lines = rawContent.split('\n');
    const elements: React.ReactNode[] = [];
    let key = 0;

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-2xl font-extrabold text-white font-display mt-10 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={key++} className="font-bold text-white mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={key++} className="text-slate-300 text-sm leading-relaxed ml-4 list-disc">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.trim() !== '') {
        // Handle inline bold
        const parts = line.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <p key={key++} className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
            )}
          </p>
        );
      } else {
        elements.push(<div key={key++} className="my-2" />);
      }
    });

    return elements;
  };

  return (
    <div className="pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Back Button */}
      <div className="pt-6 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 mb-10"
      >
        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
            <Tag className="w-3 h-3" /> {category}
          </span>
          <span className="text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> {readTime}
          </span>
          {publishedAt && (
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {publishedAt}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display leading-tight tracking-tight">
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed border-l-4 border-cyan-500/50 pl-5 italic">
            {excerpt}
          </p>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 pb-4 border-b border-white/10">
          {post.authorImage ? (
            <Image
              src={post.authorImage}
              alt={author}
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500/30"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/30 flex items-center justify-center">
              <User className="w-5 h-5 text-cyan-400" />
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-white">{author}</p>
            {post.authorRole && (
              <p className="text-xs text-cyan-400 font-mono">{post.authorRole}</p>
            )}
          </div>
        </div>
      </motion.header>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10 mb-12"
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="prose-sm sm:prose max-w-none space-y-2"
      >
        {content ? renderContent(content) : (
          <p className="text-slate-400 font-mono text-sm">Article content is being prepared.</p>
        )}
      </motion.article>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-widest">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center space-y-4">
        <h3 className="text-xl font-bold text-white font-display">Ready to Build Something Extraordinary?</h3>
        <p className="text-slate-300 text-sm">
          Contact ZYNTHAX Digital Solutions to discuss your project requirements.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
        >
          Start Your Project <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Posts */}
      {safeRelatedPosts.length > 0 && (
        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold text-white font-display">More Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {safeRelatedPosts.map(related => (
              <Link
                key={related?.id || Math.random()}
                href={`/blog/${related?.slug || related?.id || '#'}`}
                className="group glass-panel rounded-xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <div className="relative h-36 bg-slate-950">
                  <Image
                    src={related?.coverImage || PLACEHOLDER_PROJECT_IMAGE}
                    alt={related?.title || 'Article'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-cyan-400">{related?.category || 'Engineering'}</span>
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {related?.title || 'Untitled Article'}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {related?.readTime || '3 min read'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
