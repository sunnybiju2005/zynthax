'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock, Tag, BookOpen } from 'lucide-react';
import { getBlogs } from '@/lib/db';
import { BlogPost } from '@/lib/seedData';
import { PLACEHOLDER_PROJECT_IMAGE } from '@/lib/mappers';
import { GridSkeleton, EmptyState } from '@/components/SkeletonLoader';

const ALL_CATEGORIES = 'All';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  useEffect(() => {
    async function load() {
      const data = await getBlogs(true);
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = activeCategory === ALL_CATEGORIES
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured = posts.filter(p => p.featured)[0];
  const regular = filtered.filter(p => !p.featured || activeCategory !== ALL_CATEGORIES);

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="pt-6 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>INSIGHTS & ARTICLES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          ZYNTHAX <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Blog</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Insights on web development, mobile apps, design, and digital growth strategies from the ZYNTHAX team.
        </p>
      </div>

      {/* Featured Article */}
      {!loading && featured && activeCategory === ALL_CATEGORIES && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group block glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Cover Image */}
              <div className="relative h-64 lg:h-80 bg-slate-950">
                <Image
                  src={featured?.coverImage || PLACEHOLDER_PROJECT_IMAGE}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/60 lg:block hidden" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/90 text-slate-950">
                    FEATURED
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{featured.category}</span>
                  <span className="text-slate-500">·</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400">{featured.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display group-hover:text-cyan-300 transition-colors leading-tight">
                  {featured.title}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2.5">
                    {featured.authorImage && (
                      <Image
                        src={featured.authorImage}
                        alt={featured.author}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                      />
                    )}
                    <div>
                      <p className="text-xs font-bold text-white">{featured.author}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{featured.publishedAt}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Category Filter */}
      {!loading && posts.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {loading ? (
        <GridSkeleton count={3} type="blog" />
      ) : regular.length === 0 && !featured ? (
        <EmptyState
          title="No articles yet"
          icon={<BookOpen className="w-12 h-12" />}
          message="The ZYNTHAX team is working on insightful articles. Check back soon."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full"
              >
                {/* Cover */}
                <div className="relative w-full h-48 bg-slate-950">
                  <Image
                    src={post?.coverImage || PLACEHOLDER_PROJECT_IMAGE}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      {post.category}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <p className="text-[10px] text-slate-500 font-mono">{post.publishedAt}</p>
                    <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
