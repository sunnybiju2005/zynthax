export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  bannerImage: string;
  icon: string;
  features: string[];
  technologies: string[];
  process: { step: string; title: string; description: string }[];
  gallery: string[];
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Websites' | 'Mobile Applications' | 'Software' | 'UI/UX Designs' | 'Branding' | 'Video Projects';
  shortDescription: string;
  description: string;
  coverImage: string;
  images: string[];
  technologies: string[];
  completionDate: string;
  websiteUrl?: string;
  appUrl?: string;
  featured: boolean;
  clientName?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Logo Designs' | 'Logo Animations' | 'Posters' | 'UI Designs' | 'Video Editing' | 'Motion Graphics';
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  description: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'development' | 'design' | 'video';
  icon: string;
  description: string;
  badgeColor?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  role: string;
  profileImage: string;
  review: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  shortDescription: string;
  fullBiography: string;
  profilePhoto: string;
  coverPhoto?: string;
  profileImage?: string;
  coverImage?: string;
  email: string;
  phone?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  portfolioWebsite?: string;
  skills: string[];
  technologies: string[];
  experience: string;
  displayOrder: number;
  featured: boolean;
  status: 'active' | 'inactive';
  joinedDate?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  icon: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  approach: { number: string; title: string; desc: string }[];
  whyChooseUs: { title: string; desc: string; icon: string }[];
  founderName: string;
  founderRole: string;
  founderBio: string;
  founderImage: string;
  companyImages: string[];
}

export interface SettingsData {
  siteName: string;
  tagline: string;
  siteDescription?: string;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  heroDescription: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  contactEmail: string;
  contactPhone: string;
  contactPhone2?: string;
  whatsappNumber?: string;
  whatsappNumber2?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  logoUrl?: string;
  address: string;
  laptopScreenImage?: string;
  phoneScreenImage?: string;
  creativeCardImage?: string;
  socialLinks: { platform: string; url: string; icon: string }[];
}

export interface HeroData {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  availabilityText: string;
}

export interface ContactDetails {
  companyName?: string;
  tagline?: string;
  address?: string;
  email?: string;
  phone?: string;
  phone2?: string;
  whatsapp?: string;
  whatsapp2?: string;
  whatsappNumber?: string;
  whatsappNumber2?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  workingHours?: string;
  sla?: string;
  mapEmbedUrl?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
  displayOrder: number;
  active: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorImage?: string;
  authorRole?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  featured: boolean;
  status: 'published' | 'draft';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
}

export interface SeoData {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImage: string;
  twitterHandle?: string;
  canonicalUrl: string;
  googleAnalyticsId?: string;
}

// ------------------- SEED DATA CONSTANTS -------------------


export const SEED_SETTINGS: SettingsData = {
  siteName: "ZYNTHAX Digital Solutions",
  tagline: "Where Technology Meets Creativity",
  heroBadge: "WELCOME TO ZYNTHAX",
  heroTitlePrefix: "ZYNTHA",
  heroTitleHighlight: "X",
  heroTitleSuffix: "Digital Solutions",
  heroSubtitle: "Where Technology Meets Creativity",
  heroDescription: "We build powerful websites, mobile applications, and business software with stunning designs and smooth experiences.",
  heroPrimaryBtn: "View Our Work",
  heroSecondaryBtn: "Start a Project",
  contactEmail: "zynthax13@gmail.com",
  contactPhone: "+91 7907374029",
  contactPhone2: "+91 8848241519",
  whatsappNumber: "917907374029",
  whatsappNumber2: "918848241519",
  instagramUrl: "https://www.instagram.com/zynthax_digital_solutions?utm_source=qr&igsh=MWgzOGFqcTVteThmNA==",
  address: "Thrissur, Kerala, India",
  laptopScreenImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  phoneScreenImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  creativeCardImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  socialLinks: [
    { platform: "Instagram", url: "https://www.instagram.com/zynthax_digital_solutions?utm_source=qr&igsh=MWgzOGFqcTVteThmNA==", icon: "Instagram" },
    { platform: "WhatsApp", url: "#", icon: "MessageCircle" },
    { platform: "Email", url: "mailto:zynthax13@gmail.com", icon: "Mail" },
    { platform: "Facebook", url: "#", icon: "Facebook" },
    { platform: "LinkedIn", url: "#", icon: "Linkedin" },
    { platform: "YouTube", url: "#", icon: "Youtube" }
  ]
};

export const SEED_SERVICES: ServiceItem[] = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Website Development",
    shortDescription: "Modern responsive websites, custom web applications, and enterprise web portals.",
    description: "We craft state-of-the-art responsive websites and full-stack web applications engineered for lightning performance, SEO dominance, and high conversions. From sleek SaaS landing pages to complex corporate portals.",
    bannerImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
    icon: "Globe",
    featured: true,
    features: [
      "Responsive & Adaptive Layouts",
      "E-commerce Websites & Payment Gateways",
      "Corporate & Business Web Applications",
      "Headless CMS Integration",
      "SEO Optimization & Analytics",
      "Progressive Web Apps (PWA)"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
    process: [
      { step: "01", title: "Discovery & Blueprint", description: "Mapping architecture, user flows, and wireframes tailored to business objectives." },
      { step: "02", title: "Design & Prototyping", description: "Crafting modern glassmorphic, accessible interactive UI components." },
      { step: "03", title: "Frontend & Backend Build", description: "Writing clean, modular code connected to scalable cloud APIs." },
      { step: "04", title: "Quality Audit & Deploy", description: "Rigorous performance, security, and responsive testing before global launch." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mobile-development",
    slug: "mobile-development",
    title: "Mobile Application Development",
    shortDescription: "Native and cross-platform mobile apps for iOS and Android with intuitive interfaces.",
    description: "Build engaging iOS and Android applications powered by Flutter and React Native. We deliver seamless mobile experiences with native performance, biometric authentication, offline synchronization, and real-time push notifications.",
    bannerImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    icon: "Smartphone",
    featured: true,
    features: [
      "Cross-Platform Flutter & React Native",
      "Native iOS (Swift) & Android (Kotlin)",
      "Real-time Cloud Sync & Push Alerts",
      "In-App Purchases & Payment Integration",
      "Biometric Security & Offline Data Mode",
      "App Store & Google Play Publishing"
    ],
    technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "REST APIs"],
    process: [
      { step: "01", title: "App Architecture", description: "Defining state management, backend APIs, and screen flow navigation." },
      { step: "02", title: "UI/UX Prototyping", description: "Designing intuitive touch gestures, dark modes, and micro-interactions." },
      { step: "03", title: "Native Mobile Build", description: "Building robust, battery-optimized mobile apps with seamless API calls." },
      { step: "04", title: "App Store Publishing", description: "Full deployment support for Apple App Store and Google Play Store." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "software-solutions",
    slug: "software-solutions",
    title: "Business Software Development",
    shortDescription: "Custom enterprise CRM, ERP, automation platforms, and cloud-native software.",
    description: "Transform your operations with custom-built enterprise software solutions. We specialize in workflow automation systems, inventory management, cloud databases, and bespoke business tools designed to scale.",
    bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    icon: "Cpu",
    featured: true,
    features: [
      "Custom Enterprise ERP & CRM Systems",
      "Cloud Infrastructure & Microservices",
      "Business Intelligence & Analytics Dashboards",
      "Automated Workflow Engine Integration",
      "Role-Based Access & Security Protocols"
    ],
    technologies: ["Node.js", "Python", "Docker", "PostgreSQL", "Firebase", "AWS"],
    process: [
      { step: "01", title: "Needs Assessment", description: "Analyzing business workflow bottlenecks and data architecture." },
      { step: "02", title: "Software System Specs", description: "Drafting schema, security levels, and integrations." },
      { step: "03", title: "Development & Testing", description: "Building cloud services with microservices architecture." },
      { step: "04", title: "Integration & Training", description: "Deploying enterprise software with staff onboarding." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "billing-software",
    slug: "billing-software",
    title: "Billing & Management Software",
    shortDescription: "POS systems, automated invoicing, inventory control, and accounting software.",
    description: "Accelerate revenue operations with reliable, fast billing and business management platforms. Feature invoice generation, thermal print support, real-time stock tracking, GST/VAT calculations, and executive financial reports.",
    bannerImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    icon: "Receipt",
    featured: false,
    features: [
      "Point of Sale (POS) Touch Interface",
      "Automated Invoicing & Digital Receipting",
      "Multi-store Inventory & Stock Alerts",
      "GST / Tax Calculation & Financial Reporting",
      "Barcode Scanning & Thermal Printer Integration"
    ],
    technologies: ["Electron", "React", "SQLite", "Firebase", "Node.js"],
    process: [
      { step: "01", title: "Audit", description: "Understanding retail or billing hardware and transaction flows." },
      { step: "02", title: "UX Customization", description: "Designing rapid touch-and-type cashier interfaces." },
      { step: "03", title: "Engine Build", description: "Implementing offline transaction queues and cloud backup." },
      { step: "04", title: "Hardware Pairing", description: "Connecting printers, scanners, and cloud reporting." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "User-centered design systems, wireframes, high-fidelity prototypes, and sleek interfaces.",
    description: "Elevate your visual standards with design systems that captivate users. We merge deep user research with futuristic UI trends, creating seamless product interactions, interactive wireframes, and design components ready for code.",
    bannerImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    icon: "Layout",
    featured: true,
    features: [
      "Comprehensive User Research & Personas",
      "Interactive Figma Prototypes & Wireframes",
      "Futuristic Dark & Glassmorphism Design Systems",
      "Micro-animations & Component Libraries",
      "Usability Testing & Conversion Design"
    ],
    technologies: ["Figma", "Adobe XD", "Framer", "Protopie", "Illustrator"],
    process: [
      { step: "01", title: "Empathize & Map", description: "Conducting user interviews and wireframing journey maps." },
      { step: "02", title: "Design System Build", description: "Building typography, color scales, and reusable components." },
      { step: "03", title: "High-Fi Prototyping", description: "Creating clickable interactive prototypes in Figma." },
      { step: "04", title: "Hand-off to Code", description: "Delivering asset specs and design tokens to engineers." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "branding",
    slug: "branding",
    title: "Logo Design & Branding",
    shortDescription: "Brand identity, logo guidelines, vector graphics, and visual brand storytelling.",
    description: "Shape an unforgettable brand identity that commands attention in your industry. From iconic vector logo mark design to comprehensive brand books, color psychology, print stationery, and digital style guides.",
    bannerImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    icon: "Sparkles",
    featured: false,
    features: [
      "Modern Vector Logo Design Concepts",
      "Brand Identity & Style Guidelines",
      "Typography & Color Palette Curation",
      "Business Cards & Corporate Stationery",
      "Social Media Branding Kits"
    ],
    technologies: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign"],
    process: [
      { step: "01", title: "Brand Identity Workshop", description: "Uncovering company values, competitors, and target audience." },
      { step: "02", title: "Concept Sketching", description: "Developing multiple unique vector mark options." },
      { step: "03", title: "Refinement & Brand Book", description: "Finalizing geometry, typography, and color rules." },
      { step: "04", title: "Master Export", description: "Exporting vector SVG, AI, EPS, PNG and stationery templates." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "logo-animation",
    slug: "logo-animation",
    title: "Logo Animation",
    shortDescription: "Dynamic 2D/3D logo reveals, animated brand assets, and stingers for video intros.",
    description: "Bring your brand to life with high-impact animated logo intros. Ideal for video content, website headers, app startup splash screens, and video marketing presentations.",
    bannerImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    icon: "PlaySquare",
    featured: false,
    features: [
      "3D & 2D Logo Reveal Animations",
      "Website & App Splash Screen Animations",
      "Transparent Alpha Overlay Stings",
      "Custom Sound Effects & Audio Sync",
      "4K Ultra-HD Video Render Formats"
    ],
    technologies: ["After Effects", "Cinema 4D", "Blender", "Lottie"],
    process: [
      { step: "01", title: "Storyboard & Style", description: "Planning camera movement, lighting, and motion duration." },
      { step: "02", title: "Layer Preparation", description: "Vector separation and 3D extrusion of brand elements." },
      { step: "03", title: "Keyframing & FX", description: "Animating particles, glow effects, and sound design." },
      { step: "04", title: "Multi-Format Export", description: "Delivering MP4, MOV, WebM, and Lottie JSON." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "motion-graphics",
    slug: "motion-graphics",
    title: "Motion Graphics",
    shortDescription: "Explainer videos, animated visual effects, 3D graphics, and broadcast design.",
    description: "Tell complex visual stories through captivating motion graphics. We create high-converting product explainer videos, promo teasers, kinetic typography, and 3D animated visual assets.",
    bannerImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    icon: "Film",
    featured: true,
    features: [
      "3D Product Renderings & Motion Teasers",
      "Kinetic Typography & Infographic Motion",
      "SaaS Product Walkthrough Animations",
      "Social Media Video Ad Motion Assets",
      "VFX & Composition Effects"
    ],
    technologies: ["After Effects", "Blender", "Premiere Pro", "Lottie"],
    process: [
      { step: "01", title: "Script & Audio Voiceover", description: "Crafting story narration and pacing." },
      { step: "02", title: "Visual Storyboard", description: "Drawing frame-by-frame visual concepts." },
      { step: "03", title: "Motion Production", description: "Creating smooth keyframe animations and sound FX." },
      { step: "04", title: "Final Render", description: "Exporting high-bitrate video formats for broadcast." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "video-editing",
    slug: "video-editing",
    title: "Video Editing",
    shortDescription: "Professional video post-production, color grading, sound design, and promotional edits.",
    description: "Transform raw footage into polished cinematic masterpieces. Our post-production workflow features precise cuts, color grading, sound enhancement, custom lower thirds, and social media formats.",
    bannerImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    icon: "Video",
    featured: false,
    features: [
      "Cinematic Color Grading & Correction",
      "Multi-Camera Cutting & Audio Mastering",
      "Corporate Commercial & Event Video Edits",
      "Short-Form Video (Reels, TikTok, Shorts)",
      "Subtitle Styling & Sound Design"
    ],
    technologies: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Audition"],
    process: [
      { step: "01", title: "Footage Ingestion", description: "Organizing clips, proxies, and audio sync." },
      { step: "02", title: "Rough Cut & Pacing", description: "Assembling narrative timeline." },
      { step: "03", title: "Color & Audio Polish", description: "Applying DaVinci LUTs and noise reduction." },
      { step: "04", title: "Export & Delivery", description: "Rendering for YouTube, Instagram, and web." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "creative-solutions",
    slug: "creative-solutions",
    title: "Digital Creative Solutions",
    shortDescription: "Comprehensive 360-degree digital media strategies, campaign assets, and interactive art.",
    description: "Combine tech innovation with artistic direction. We provide end-to-end creative digital solutions including interactive web experiences, digital campaign banners, augmented reality visuals, and multi-channel content kits.",
    bannerImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    icon: "Wand2",
    featured: false,
    features: [
      "360° Digital Campaign Strategy & Assets",
      "Interactive Web Experiences & Canvas FX",
      "Multi-channel Marketing Content Bundles",
      "Augmented & Virtual Reality Assets",
      "AI-Enhanced Visual Creation & Art Direction"
    ],
    technologies: ["Three.js", "Figma", "Blender", "After Effects", "Photoshop"],
    process: [
      { step: "01", title: "Creative Ideation", description: "Brainstorming futuristic digital campaign themes." },
      { step: "02", title: "Multi-Media Build", description: "Synthesizing code, motion, and graphics." },
      { step: "03", title: "Interactive Integration", description: "Embedding visual assets into web & mobile channels." },
      { step: "04", title: "Campaign Launch", description: "Deploying high-impact creative campaigns globally." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const SEED_PROJECTS: ProjectItem[] = [
  {
    id: "pjr-collections",
    title: "PJR Collections",
    category: "Websites",
    shortDescription: "Ultra-fast Next.js dynamic e-commerce web platform for premium fashion retail.",
    description: "PJR Collections is an advanced digital storefront featuring real-time product sync, seamless checkout integration, Cloudinary image delivery, dynamic filtering, and a sleek glassmorphic UI.",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    ],
    technologies: ["React", "Next.js", "Firebase", "Cloudinary", "Tailwind CSS"],
    completionDate: "2026-05",
    websiteUrl: "https://pjrcollections.com",
    appUrl: "https://play.google.com/store/apps/details?id=com.pjr.collections",
    featured: true,
    clientName: "PJR Retail International"
  },
  {
    id: "nexus-crm-app",
    title: "Nexus Enterprise Mobility CRM",
    category: "Mobile Applications",
    shortDescription: "Cross-platform Flutter application for real-time field sales tracking.",
    description: "A high-performance mobile application engineered with Flutter and Firebase. Equips field agents with offline customer data sync, route optimization, digital signatures, and instant push notifications.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80"
    ],
    technologies: ["Flutter", "Firebase", "Dart", "Google Maps API", "REST API"],
    completionDate: "2026-03",
    appUrl: "https://play.google.com/store/apps/details?id=com.nexus.crm",
    featured: true,
    clientName: "Nexus Global Solutions"
  },
  {
    id: "omni-billing-suite",
    title: "OmniBilling Cloud Suite",
    category: "Software",
    shortDescription: "Comprehensive desktop and web business management and invoicing platform.",
    description: "An all-in-one business software solution built for retail chains and logistics providers. Includes thermal printer receipt generation, real-time multi-warehouse inventory management, and automated tax reporting.",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    ],
    technologies: ["Electron", "React", "Node.js", "Firebase", "SQLite"],
    completionDate: "2026-04",
    websiteUrl: "https://omnibilling.io",
    featured: true,
    clientName: "Omni Group Logistics"
  },
  {
    id: "aether-ai-design",
    title: "Aether AI UI/UX System",
    category: "UI/UX Designs",
    shortDescription: "Futuristic dark glassmorphic design system for a generative AI SaaS portal.",
    description: "A complete design framework for an AI data analytics platform. Designed in Figma with 150+ modular components, dark mode variants, interactive micro-animations, and full design tokens.",
    coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ],
    technologies: ["Figma", "Framer", "Illustrator", "Protopie"],
    completionDate: "2026-02",
    websiteUrl: "https://dribbble.com/shots/aether-ai-system",
    featured: true,
    clientName: "Aether Labs AI"
  },
  {
    id: "hyperion-branding",
    title: "Hyperion Cyber Identity",
    category: "Branding",
    shortDescription: "Complete vector logo identity & brand kit for a next-gen cybersecurity enterprise.",
    description: "Created a bold, futuristic visual identity for Hyperion Cyber Security. Delivered 3D metallic vector logos, stationery, brand architecture guidelines, and social media launch assets.",
    coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80"
    ],
    technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
    completionDate: "2026-01",
    featured: false,
    clientName: "Hyperion Security Corp"
  },
  {
    id: "cyber-pulse-motion",
    title: "CyberPulse 3D Product Launch Video",
    category: "Video Projects",
    shortDescription: "Full 3D motion graphics teaser and cinematic product reveal video.",
    description: "Produced a high-energy 60-second 3D product reveal video combining Cinema 4D particle renders, kinetic typography, custom sound design, and After Effects visual effects.",
    coverImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
    ],
    technologies: ["After Effects", "Cinema 4D", "Premiere Pro", "Blender"],
    completionDate: "2026-06",
    websiteUrl: "https://youtube.com/watch?v=demo",
    featured: true,
    clientName: "Pulse Audio Tech"
  }
];

export const SEED_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "NeoGrid Cyber Logo Mark",
    category: "Logo Designs",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    description: "Geometric vector logo mark created for an AI cloud platform."
  },
  {
    id: "gal-2",
    title: "Quantum 3D Logo Reveal",
    category: "Logo Animations",
    type: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "Electric neon 3D logo reveal animated in After Effects & Blender."
  },
  {
    id: "gal-3",
    title: "Futuristic Cyberpunk Poster",
    category: "Posters",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
    description: "High-resolution promotional graphic design poster."
  },
  {
    id: "gal-4",
    title: "FinTech Mobile App Interface",
    category: "UI Designs",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Dark glassmorphic crypto dashboard UI mockups."
  },
  {
    id: "gal-5",
    title: "SaaS Explainer Motion Graphics",
    category: "Motion Graphics",
    type: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    description: "Interactive SaaS platform walkthrough animation video."
  },
  {
    id: "gal-6",
    title: "Commercial Film Color Grading",
    category: "Video Editing",
    type: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
    description: "Cinematic DaVinci Resolve color correction and sound mastering."
  }
];

export const SEED_TECHNOLOGIES: TechItem[] = [
  // Development
  { id: "tech-next", name: "Next.js", category: "development", icon: "Layers", description: "React Web Framework & Server Components", badgeColor: "purple" },
  { id: "tech-react", name: "React", category: "development", icon: "Code2", description: "Frontend UI Library", badgeColor: "cyan" },
  { id: "tech-ts", name: "TypeScript", category: "development", icon: "FileCode", description: "Typed JavaScript for Scalable Code", badgeColor: "blue" },
  { id: "tech-tailwind", name: "Tailwind CSS", category: "development", icon: "Sparkles", description: "Utility-First Responsive Styling", badgeColor: "cyan" },
  { id: "tech-flutter", name: "Flutter", category: "development", icon: "Smartphone", description: "Cross-Platform iOS & Android SDK", badgeColor: "cyan" },
  { id: "tech-firebase", name: "Firebase", category: "development", icon: "Flame", description: "Cloud Firestore & Authentication", badgeColor: "amber" },
  { id: "tech-node", name: "Node.js", category: "development", icon: "Server", description: "Scalable Backend Runtime Engine", badgeColor: "emerald" },
  { id: "tech-electron", name: "Electron", category: "development", icon: "Box", description: "Desktop Cross-Platform App Engine", badgeColor: "blue" },
  { id: "tech-python", name: "Python", category: "development", icon: "Terminal", description: "Data Processing & AI Algorithms", badgeColor: "amber" },
  { id: "tech-postgres", name: "PostgreSQL", category: "development", icon: "Database", description: "Enterprise Relational Database", badgeColor: "blue" },
  { id: "tech-vercel", name: "Vercel", category: "development", icon: "Globe", description: "Global Cloud Edge Hosting", badgeColor: "purple" },
  { id: "tech-git", name: "Git & GitHub", category: "development", icon: "GitBranch", description: "Version Control & Continuous Delivery", badgeColor: "orange" },
  
  // Design
  { id: "tech-figma", name: "Figma", category: "design", icon: "Figma", description: "UI/UX & Interactive Design Systems", badgeColor: "magenta" },
  { id: "tech-xd", name: "Adobe XD", category: "design", icon: "Layout", description: "UX Wireframing & Screen Flows", badgeColor: "purple" },
  { id: "tech-framer", name: "Framer", category: "design", icon: "Sparkles", description: "Interactive Prototype & Web Canvas", badgeColor: "purple" },
  { id: "tech-photoshop", name: "Photoshop", category: "design", icon: "Image", description: "Digital Visuals & Raster Graphics", badgeColor: "blue" },
  { id: "tech-illustrator", name: "Illustrator", category: "design", icon: "PenTool", description: "Scalable Vector Graphics & Logos", badgeColor: "amber" },
  { id: "tech-protopie", name: "Protopie", category: "design", icon: "Sliders", description: "High-Fidelity Micro-Animations", badgeColor: "magenta" },
  { id: "tech-indesign", name: "InDesign", category: "design", icon: "FileText", description: "Brand Guidelines & Publications", badgeColor: "pink" },
  
  // Video & Motion
  { id: "tech-aftereffects", name: "After Effects", category: "video", icon: "Film", description: "Motion Graphics & Visual FX", badgeColor: "indigo" },
  { id: "tech-premiere", name: "Premiere Pro", category: "video", icon: "Video", description: "Cinematic Video Post-Production", badgeColor: "purple" },
  { id: "tech-blender", name: "Blender", category: "video", icon: "Box", description: "3D Modeling, Lighting & Rendering", badgeColor: "orange" },
  { id: "tech-c4d", name: "Cinema 4D", category: "video", icon: "Cpu", description: "3D Product Teasers & Logo Reveals", badgeColor: "blue" },
  { id: "tech-davinci", name: "DaVinci Resolve", category: "video", icon: "Sliders", description: "Professional Color Grading & Audio", badgeColor: "emerald" },
  { id: "tech-lottie", name: "Lottie", category: "video", icon: "Play", description: "Vector Animated JSON for Web & Apps", badgeColor: "cyan" },
  { id: "tech-lightroom", name: "Lightroom", category: "video", icon: "Camera", description: "Photo & Texture Color Calibration", badgeColor: "cyan" }
];

export const SEED_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Alexander Wright",
    company: "PJR Retail Corp",
    role: "Chief Executive Officer",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    review: "ZYNTHAX transformed our entire digital infrastructure. Their website development and mobile application work increased our online sales by over 240% within three months!",
    rating: 5
  },
  {
    id: "test-2",
    name: "Dr. Elena Rostova",
    company: "Nexus Medical Tech",
    role: "Head of Product Strategy",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    review: "The UI/UX design team at ZYNTHAX has an extraordinary eye for detail. The glassmorphic interface they created for our software platform set a new industry benchmark.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Marcus Vance",
    company: "Hyperion Cyber Security",
    role: "Managing Director",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    review: "Their motion graphics and logo animation work for our product launch exceeded all expectations. ZYNTHAX delivers world-class, premium agency quality without compromise.",
    rating: 5
  }
];

export const SEED_STATISTICS: StatItem[] = [
  { id: "stat-1", label: "Projects Completed", value: "150", suffix: "+", icon: "CheckCircle" },
  { id: "stat-2", label: "Client Satisfaction", value: "99.4", suffix: "%", icon: "Smile" },
  { id: "stat-3", label: "Global Tech Awards", value: "18", suffix: "+", icon: "Award" },
  { id: "stat-4", label: "Countries Served", value: "24", suffix: "+", icon: "Globe" }
];

export const SEED_ABOUT: AboutData = {
  title: "Empowering Next-Gen Digital Products",
  subtitle: "Where Cutting-Edge Technology Meets Creative Mastery",
  description: "ZYNTHAX Digital Solutions is a premier technology and creative agency. We architect high-performance websites, cross-platform mobile apps, bespoke enterprise software, and breathtaking motion graphics that empower ambitious brands worldwide.",
  mission: "To bridge technical innovation and artistic expression, creating transformative digital experiences that drive exponential business growth for our global clients.",
  vision: "To be recognized worldwide as the benchmark for futuristic digital software development and high-end creative media design.",
  approach: [
    { number: "01", title: "Strategic Vision", desc: "We deep-dive into product architecture, market positioning, and user behavior." },
    { number: "02", title: "Precision Engineering", desc: "Using state-of-the-art frameworks (React, Next.js, Flutter, Firebase) built for speed and security." },
    { number: "03", title: "Artistic Craftsmanship", desc: "Curating immersive UI/UX visuals, dark neon themes, and cinematic motion design." },
    { number: "04", title: "Continuous Growth", desc: "Delivering dynamic, scalable software supported by cloud architecture and data insights." }
  ],
  whyChooseUs: [
    { title: "Dynamic Firebase Cloud Engine", desc: "Every project and text content is manageable remotely via mobile & cloud backends.", icon: "Database" },
    { title: "Futuristic Design Language", desc: "Sleek glassmorphism, responsive micro-animations, and modern dark aesthetics.", icon: "Sparkles" },
    { title: "End-to-End Digital Solutions", desc: "From logo branding and mobile apps to custom billing software and video editing.", icon: "Layers" },
    { title: "Unmatched Delivery Speed", desc: "Agile engineering sprints ensuring lightning-fast turnarounds with zero compromise.", icon: "Zap" }
  ],
  founderName: "Sunny Biju",
  founderRole: "Founder & Chief Technology Officer",
  founderBio: "Visionary technologist and software architect committed to pushing the boundaries of Web3, AI UI design, and cloud software engineering.",
  founderImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  companyImages: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  ]
};

export const SEED_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sunny-biju",
    slug: "sunny-biju",
    name: "Sunny Biju",
    designation: "Founder & Chief Technology Officer",
    shortDescription: "Visionary technologist and cloud software architect specializing in Next.js, Flutter, and scalable AI UI systems.",
    fullBiography: "Sunny Biju is the Founder & Chief Technology Officer at ZYNTHAX Digital Solutions. With over 6+ years of specialized experience in full-stack cloud software engineering, mobile application development, and UI/UX design systems, Sunny directs end-to-end tech architecture and client delivery across international markets.",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    email: "zynthax13@gmail.com",
    phone: "+91 7907374029",
    instagram: "https://www.instagram.com/zynthax_digital_solutions",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    portfolioWebsite: "https://zynthax.com",
    skills: ["Software Architecture", "Full-Stack Development", "Cloud Backend Engineering", "UI/UX System Design", "Mobile App Development"],
    technologies: ["Next.js", "React", "TypeScript", "Flutter", "Firebase", "Node.js", "TailwindCSS"],
    experience: "6+ Years",
    displayOrder: 1,
    featured: true,
    status: "active",
    joinedDate: "2023-01-15"
  },
  {
    id: "alex-morgan",
    slug: "alex-morgan",
    name: "Alex Morgan",
    designation: "Lead UI/UX & Brand Strategist",
    shortDescription: "Creative director mastering glassmorphism visual identities, micro-animations, and interactive product prototypes.",
    fullBiography: "Alex Morgan leads UI/UX design and brand positioning at ZYNTHAX. Passionate about futuristic design languages, glassmorphism, and dark-themed digital experiences, Alex ensures every client deliverable wows users at first glance.",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    email: "alex@zynthax.com",
    phone: "+91 8848241519",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    skills: ["UI/UX Design", "Brand Strategy", "Motion Design", "Design Systems", "Prototyping"],
    technologies: ["Figma", "Adobe After Effects", "Spline 3D", "Photoshop", "Illustrator"],
    experience: "5+ Years",
    displayOrder: 2,
    featured: true,
    status: "active",
    joinedDate: "2023-04-01"
  },
  {
    id: "david-chen",
    slug: "david-chen",
    name: "David Chen",
    designation: "Senior Mobile Software Engineer",
    shortDescription: "Cross-platform mobile engineer building ultra-fast iOS & Android applications with offline-first state sync.",
    fullBiography: "David Chen is a senior mobile engineer dedicated to building reactive iOS and Android applications. Expert in Flutter and Native modules, David crafts seamless touch interactions and robust API integrations.",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    email: "david@zynthax.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    skills: ["Mobile Development", "Cross-Platform Apps", "State Management", "Performance Tuning"],
    technologies: ["Flutter", "Dart", "React Native", "Firebase Firestore", "REST APIs"],
    experience: "4+ Years",
    displayOrder: 3,
    featured: false,
    status: "active",
    joinedDate: "2023-08-10"
  }
];

// ------------------- HERO SEED -------------------
export const SEED_HERO: HeroData = {
  badge: "WELCOME TO ZYNTHAX",
  titlePrefix: "ZYNTHA",
  titleHighlight: "X",
  titleSuffix: "Digital Solutions",
  subtitle: "Where Technology Meets Creativity",
  description: "We build powerful websites, mobile applications, and business software with stunning designs and smooth experiences.",
  primaryBtnText: "View Our Work",
  primaryBtnLink: "/portfolio",
  secondaryBtnText: "Start a Project",
  secondaryBtnLink: "/contact",
  availabilityText: "Available for New Projects"
};

// ------------------- CONTACT DETAILS SEED -------------------
export const SEED_CONTACT: ContactDetails = {
  companyName: "ZYNTHAX Digital Solutions",
  tagline: "Where Technology Meets Creativity",
  address: "Thrissur, Kerala, India",
  email: "zynthax13@gmail.com",
  phone: "+91 7907374029",
  phone2: "+91 8848241519",
  whatsapp: "+917907374029",
  whatsapp2: "+918848241519",
  instagramUrl: "https://www.instagram.com/zynthax_digital_solutions?utm_source=qr&igsh=MWgzOGFqcTVteThmNA==",
  linkedinUrl: "https://linkedin.com/company/zynthax",
  workingHours: "9:00 AM – 7:00 PM IST",
  sla: "Response under 2 hours",
};

// ------------------- SOCIAL LINKS SEED -------------------
export const SEED_SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    platform: "Instagram",
    url: "https://www.instagram.com/zynthax_digital_solutions?utm_source=qr&igsh=MWgzOGFqcTVteThmNA==",
    icon: "instagram",
    label: "Follow on Instagram",
    displayOrder: 1,
    active: true
  },
  {
    id: "whatsapp",
    platform: "WhatsApp",
    url: "https://wa.me/917907374029",
    icon: "whatsapp",
    label: "Chat on WhatsApp",
    displayOrder: 2,
    active: true
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/company/zynthax",
    icon: "linkedin",
    label: "Connect on LinkedIn",
    displayOrder: 3,
    active: true
  },
  {
    id: "email",
    platform: "Email",
    url: "mailto:zynthax13@gmail.com",
    icon: "email",
    label: "Send Email",
    displayOrder: 4,
    active: true
  }
];

// ------------------- BLOG POSTS SEED -------------------
export const SEED_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "why-your-business-needs-a-mobile-app",
    title: "Why Your Business Needs a Mobile App in 2025",
    excerpt: "Discover how a custom mobile application can dramatically increase customer engagement, retention, and revenue for your business.",
    content: "In today's mobile-first world, businesses that invest in custom mobile applications consistently outperform their competitors. From increased customer engagement to streamlined internal operations, the benefits are clear.\n\nA well-designed mobile app puts your brand directly in your customers' pockets — available 24/7, personalized to their preferences, and far more interactive than any website alone.\n\n## Key Benefits\n\n**1. Enhanced Customer Engagement**\nPush notifications, loyalty programs, and personalized content keep users coming back. Unlike email, push notifications achieve open rates of 90%+ when relevant.\n\n**2. Improved Brand Recognition**\nEvery time a user unlocks their phone, your app icon reinforces your brand. This consistent exposure builds trust and recognition over time.\n\n**3. Revenue Generation**\nIn-app purchases, subscriptions, and premium features create new revenue streams beyond traditional channels.\n\n**4. Competitive Advantage**\nMany small and medium businesses still don't have a dedicated mobile app — giving you a significant edge in user experience.\n\n## Choosing the Right Technology\n\nAt ZYNTHAX, we recommend Flutter for most projects. It delivers native performance on both iOS and Android from a single codebase, dramatically reducing development time and maintenance costs.\n\nFor enterprise applications, React Native combined with a robust Firebase backend provides excellent scalability and developer tooling.\n\n## Getting Started\n\nThe best time to build your mobile app was yesterday — the second best time is today. Contact ZYNTHAX Digital Solutions to get a free technical consultation and project estimate.",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    author: "Sunny Biju",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    authorRole: "Founder & CTO",
    category: "Mobile Development",
    tags: ["mobile apps", "flutter", "business growth", "digital transformation"],
    publishedAt: "2025-06-15",
    readTime: "5 min read",
    featured: true,
    status: "published"
  },
  {
    id: "blog-2",
    slug: "the-power-of-modern-web-design",
    title: "The Power of Modern Web Design: First Impressions Matter",
    excerpt: "Your website is your most powerful sales tool. Learn how premium UI/UX design drives conversions and builds trust with first-time visitors.",
    content: "You have exactly 0.05 seconds to make a first impression online. Research shows that users form an opinion about your website almost instantly — and that opinion shapes whether they stay, explore, or leave forever.\n\nPremium web design is not just about aesthetics. It is a strategic investment that directly impacts your bottom line.\n\n## Why Design Quality Matters\n\n**Credibility and Trust**\nA professionally designed website signals that you take your business seriously. Poor design — outdated layouts, inconsistent typography, or slow loading — immediately erodes trust.\n\n**Conversion Optimization**\nEvery element of a well-designed website is intentional. Clear call-to-action buttons, strategic content hierarchy, and smooth user flows guide visitors towards becoming customers.\n\n**SEO Performance**\nModern design best practices align with Google's Core Web Vitals metrics. Fast loading, mobile responsiveness, and proper semantic HTML all contribute to better search rankings.\n\n## The ZYNTHAX Design Philosophy\n\nAt ZYNTHAX, we apply a three-pillar approach to every website project:\n\n1. **Visual Impact** — Dark themes, glassmorphism, and subtle animations create a premium, memorable first impression\n2. **Functional Clarity** — Every design decision serves a purpose. Navigation is intuitive, content is scannable, actions are obvious\n3. **Performance Excellence** — We optimize for sub-2-second load times, 90+ Lighthouse scores, and flawless mobile experiences\n\n## What to Expect\n\nWorking with ZYNTHAX means your website will be built on Next.js with Tailwind CSS, optimized for Core Web Vitals, fully responsive, and connected to a Firebase CMS for easy content management without code changes.",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
    author: "ZYNTHAX Team",
    authorRole: "Design & Development",
    category: "Web Design",
    tags: ["web design", "ui/ux", "conversion optimization", "next.js"],
    publishedAt: "2025-07-01",
    readTime: "4 min read",
    featured: true,
    status: "published"
  },
  {
    id: "blog-3",
    slug: "firebase-firestore-cms-guide",
    title: "Building a CMS-Driven Website with Firebase Firestore",
    excerpt: "How ZYNTHAX builds fully dynamic, CMS-driven websites where every piece of content is managed from a central database — no code changes required.",
    content: "One of the most powerful features of modern web development is the ability to decouple content management from code deployment. With Firebase Firestore as your backend, you can update every aspect of your website without touching a single line of code.\n\n## What is a CMS-Driven Website?\n\nA Content Management System (CMS) driven website fetches all of its content from a database. Instead of hardcoding text, images, and data into your HTML files, your website queries a database and renders whatever it finds.\n\nThis means:\n- Update your hero text in the database → website updates immediately\n- Add a new service in the database → it appears on your services page automatically\n- Upload a new portfolio project → it shows on your portfolio instantly\n\n## Why Firebase Firestore?\n\nFirestore offers several advantages for this architecture:\n\n**Real-Time Updates**: Changes propagate to all connected clients instantly using WebSocket connections.\n\n**Offline Support**: Firestore caches data locally, so your website works even with intermittent connectivity.\n\n**Scalability**: As your content grows, Firestore scales automatically without any infrastructure management.\n\n**Security**: Granular security rules let you control exactly who can read and write each collection.\n\n## The ZYNTHAX Approach\n\nFor every website we build, we create a custom admin application (Android) that connects directly to Firestore. Business owners can update their website content through the admin app, and changes appear on the live website within seconds.\n\nThis is exactly how the ZYNTHAX website itself is built — every service, project, testimonial, team member, and piece of content you see is fetched from Firebase Firestore.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    author: "Sunny Biju",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    authorRole: "Founder & CTO",
    category: "Technology",
    tags: ["firebase", "firestore", "cms", "web development", "next.js"],
    publishedAt: "2025-07-20",
    readTime: "6 min read",
    featured: false,
    status: "published"
  }
];

// ------------------- FAQ SEED -------------------
export const SEED_FAQ: FaqItem[] = [
  {
    id: "faq-1",
    question: "What services does ZYNTHAX Digital Solutions offer?",
    answer: "ZYNTHAX offers 10 core digital services: Website Development, Mobile App Development (Flutter/React Native), Business Software & ERP, UI/UX Design, Branding & Identity, Video Editing, Motion Graphics, Digital Marketing, E-Commerce Solutions, and Firebase/Cloud Solutions. Each service is tailored to your specific business requirements.",
    category: "Services",
    displayOrder: 1
  },
  {
    id: "faq-2",
    question: "How long does it take to build a website or mobile app?",
    answer: "Project timelines depend on complexity. A standard business website typically takes 2–4 weeks. A mobile application (Flutter) typically takes 4–10 weeks. Enterprise software and custom solutions are scoped individually. We always provide a detailed project timeline before work begins.",
    category: "Process",
    displayOrder: 2
  },
  {
    id: "faq-3",
    question: "What technologies do you use for development?",
    answer: "For web development: Next.js, React, TypeScript, Tailwind CSS, and Firebase. For mobile apps: Flutter (Dart) and React Native. For backend: Node.js, Firebase Firestore, Cloud Functions, and REST APIs. For design: Figma, Adobe Creative Suite, and After Effects for motion graphics.",
    category: "Technology",
    displayOrder: 3
  },
  {
    id: "faq-4",
    question: "Do you provide ongoing support and maintenance after project completion?",
    answer: "Yes. All projects include a 30-day post-launch support period at no additional cost. After that, we offer flexible monthly maintenance plans that cover security updates, content changes, performance monitoring, and feature additions. Contact us for maintenance plan pricing.",
    category: "Support",
    displayOrder: 4
  },
  {
    id: "faq-5",
    question: "How do you handle project pricing?",
    answer: "We provide custom pricing based on your specific requirements, complexity, timeline, and scope. To get an accurate quote, contact us with your project details. We offer flexible payment structures including milestone-based payments to suit different budget plans.",
    category: "Pricing",
    displayOrder: 5
  },
  {
    id: "faq-6",
    question: "Can you build a website that I can update myself without coding?",
    answer: "Absolutely. All ZYNTHAX websites are built with Firebase Firestore as the content management backend. We also build a companion Android Admin App that lets you update text, images, services, projects, team members, and all other content directly from your phone — no coding required.",
    category: "Services",
    displayOrder: 6
  },
  {
    id: "faq-7",
    question: "Do you work with clients outside of Kerala / India?",
    answer: "Yes! We work with clients globally. Our team communicates via WhatsApp, email, Google Meet, and Zoom. We have delivered projects for clients across India, the Middle East, and Europe. Distance is not a barrier to premium digital solutions.",
    category: "Process",
    displayOrder: 7
  },
  {
    id: "faq-8",
    question: "What information do you need to start a project?",
    answer: "To get started, we need: a brief description of your business and project goals, your target audience, examples of designs or websites you admire, your budget range, and your expected timeline. You can share all of this by filling out our contact form or reaching out via WhatsApp.",
    category: "Process",
    displayOrder: 8
  }
];

// ------------------- SEO SEED -------------------
export const SEED_SEO: SeoData = {
  siteName: "ZYNTHAX Digital Solutions",
  defaultTitle: "ZYNTHAX Digital Solutions — Premium Web & App Development Agency",
  titleTemplate: "%s | ZYNTHAX Digital Solutions",
  defaultDescription: "ZYNTHAX Digital Solutions is a world-class technology and creative agency based in Thrissur, Kerala. We build stunning websites, mobile apps, business software, UI/UX designs, branding, and motion graphics.",
  defaultKeywords: [
    "web development Kerala", "mobile app development India", "flutter app development",
    "next.js website development", "UI UX design agency", "firebase development",
    "branding design Kerala", "video editing services", "motion graphics",
    "digital agency Thrissur", "ZYNTHAX", "business software development"
  ],
  ogImage: "https://res.cloudinary.com/dqhn8wq7k/image/upload/v1785569155/logo_no_backgrnd_tkatgq.png",
  canonicalUrl: "https://zynthax.com",
  googleAnalyticsId: "G-S4SLTDZZJZ"
};

