import { Metadata } from 'next';
import { getBlogBySlug, getBlogs } from '@/lib/db';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return { title: 'Article Not Found | ZYNTHAX Digital Solutions' };
  }
  return {
    title: `${post.title} | ZYNTHAX Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getBlogBySlug(slug),
    getBlogs(true).then(all => all.filter(p => p.slug !== slug).slice(0, 3))
  ]);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} slug={slug} />;
}
