import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';

// Preload Google Fonts via Next.js metadata link injection
// We'll inject the link tag in the HTML head directly

export const metadata: Metadata = {
  title: 'ZYNTHAX Digital Solutions | Where Technology Meets Creativity',
  description: 'World-class tech and creative digital agency. We build powerful websites, mobile applications, business software, UI/UX designs, branding, and motion graphics.',
  keywords: [
    'ZYNTHAX',
    'Digital Agency',
    'Website Development',
    'Mobile Application Development',
    'Business Software',
    'Billing Software',
    'UI/UX Design',
    'Motion Graphics',
    'Video Editing',
    'Firebase Firestore'
  ],
  authors: [{ name: 'ZYNTHAX Digital Solutions' }],
  openGraph: {
    title: 'ZYNTHAX Digital Solutions | Where Technology Meets Creativity',
    description: 'World-class tech and creative agency crafting high-performance software and digital media.',
    url: 'https://zynthax.com',
    siteName: 'ZYNTHAX Digital Solutions',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'ZYNTHAX Digital Solutions',
      },
    ],
  },
};

import { MobileBottomNav } from '@/components/MobileBottomNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020617] text-slate-100 selection:bg-blue-500 selection:text-white min-h-screen flex flex-col antialiased pb-16 md:pb-0">
        {/* Background Grid Pattern & Radial Ambient Lights */}
        <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0"></div>
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[160px] pointer-events-none z-0"></div>
        <div className="fixed top-1/2 right-10 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[180px] pointer-events-none z-0"></div>

        <Navbar />

        <main className="flex-grow relative z-10">
          {children}
        </main>

        <Footer />
        <FloatingContactButtons />
        <MobileBottomNav />
      </body>
    </html>
  );
}
