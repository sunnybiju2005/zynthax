import { 
  ServiceItem, 
  ProjectItem, 
  GalleryItem, 
  TechItem, 
  TestimonialItem, 
  StatItem, 
  AboutData, 
  SettingsData, 
  TeamMember, 
  HeroData, 
  ContactDetails, 
  SocialLink, 
  BlogPost, 
  FaqItem, 
  SeoData,
  SEED_ABOUT,
  SEED_HERO,
  SEED_SETTINGS,
  SEED_CONTACT,
  SEED_SEO
} from './seedData';

export const PLACEHOLDER_PROJECT_IMAGE = '/images/placeholder-project.jpg';

/**
 * Safely resolves a project's cover image.
 * Requirement 5:
 * If coverImage exists, use it.
 * Else if images exists and has at least one item, use images[0].
 * Else display a placeholder image.
 */
export function getProjectCoverImage(project?: Partial<ProjectItem> | null): string {
  if (project?.coverImage && typeof project.coverImage === 'string' && project.coverImage.trim() !== '') {
    return project.coverImage;
  }
  if (Array.isArray(project?.images) && project.images.length > 0 && typeof project.images[0] === 'string' && project.images[0].trim() !== '') {
    return project.images[0];
  }
  return PLACEHOLDER_PROJECT_IMAGE;
}

/**
 * Validates and logs Firestore missing or invalid fields.
 */
function logValidationNotice(collectionName: string, docId: string, missingFields: string[]) {
  if (missingFields.length > 0) {
    console.warn(
      `[Firestore Validation Notice] Collection '${collectionName}', Document ID '${docId}': Missing or invalid fields [${missingFields.join(', ')}]. Safe fallbacks applied.`
    );
  }
}

// 1. PROJECT MAPPER
export function mapProjectDoc(id: string, raw: any): ProjectItem {
  const data = raw && typeof raw === 'object' ? raw : {};
  const missing: string[] = [];

  if (!data.title) missing.push('title');
  if (!data.category) missing.push('category');
  if (!data.shortDescription && !data.description) missing.push('description');
  if (!data.coverImage && (!Array.isArray(data.images) || data.images.length === 0)) missing.push('coverImage/images');
  if (!Array.isArray(data.technologies)) missing.push('technologies');

  logValidationNotice('projects', id, missing);

  const images = Array.isArray(data.images) ? data.images.filter((img: any) => typeof img === 'string') : [];
  const coverImage = typeof data.coverImage === 'string' && data.coverImage.trim() !== '' 
    ? data.coverImage 
    : (images.length > 0 ? images[0] : PLACEHOLDER_PROJECT_IMAGE);

  return {
    id: id || data.id || `proj-${Date.now()}`,
    title: typeof data.title === 'string' && data.title.trim() !== '' ? data.title.trim() : 'Untitled Project',
    category: typeof data.category === 'string' && data.category ? data.category : 'Websites',
    shortDescription: typeof data.shortDescription === 'string' && data.shortDescription 
      ? data.shortDescription 
      : (typeof data.description === 'string' ? data.description : 'No summary available.'),
    description: typeof data.description === 'string' && data.description 
      ? data.description 
      : (typeof data.shortDescription === 'string' ? data.shortDescription : 'No description available for this project.'),
    coverImage,
    images: images.length > 0 ? images : [coverImage],
    technologies: Array.isArray(data.technologies) 
      ? data.technologies.filter((t: any) => typeof t === 'string') 
      : [],
    completionDate: typeof data.completionDate === 'string' && data.completionDate ? data.completionDate : '2025',
    websiteUrl: typeof data.websiteUrl === 'string' && data.websiteUrl ? data.websiteUrl : undefined,
    appUrl: typeof data.appUrl === 'string' && data.appUrl ? data.appUrl : undefined,
    featured: Boolean(data.featured),
    clientName: typeof data.clientName === 'string' && data.clientName ? data.clientName : undefined
  };
}

// 2. SERVICE MAPPER
export function mapServiceDoc(id: string, raw: any): ServiceItem {
  const data = raw && typeof raw === 'object' ? raw : {};
  const missing: string[] = [];

  if (!data.title) missing.push('title');
  if (!data.description) missing.push('description');

  logValidationNotice('services', id, missing);

  return {
    id: id || data.id || `serv-${Date.now()}`,
    slug: typeof data.slug === 'string' && data.slug ? data.slug : id,
    title: typeof data.title === 'string' && data.title ? data.title : 'Digital Service',
    shortDescription: typeof data.shortDescription === 'string' && data.shortDescription 
      ? data.shortDescription 
      : (typeof data.description === 'string' ? data.description : 'No summary provided.'),
    description: typeof data.description === 'string' && data.description ? data.description : 'No description available.',
    bannerImage: typeof data.bannerImage === 'string' && data.bannerImage ? data.bannerImage : PLACEHOLDER_PROJECT_IMAGE,
    icon: typeof data.icon === 'string' && data.icon ? data.icon : 'Sparkles',
    features: Array.isArray(data.features) ? data.features.filter((f: any) => typeof f === 'string') : [],
    technologies: Array.isArray(data.technologies) ? data.technologies.filter((t: any) => typeof t === 'string') : [],
    process: Array.isArray(data.process) ? data.process.map((p: any) => ({
      step: typeof p?.step === 'string' ? p.step : '01',
      title: typeof p?.title === 'string' ? p.title : 'Phase',
      description: typeof p?.description === 'string' ? p.description : ''
    })) : [],
    gallery: Array.isArray(data.gallery) ? data.gallery.filter((g: any) => typeof g === 'string') : [],
    featured: Boolean(data.featured)
  };
}

// 3. TEAM MEMBER MAPPER
export function mapTeamMemberDoc(id: string, raw: any): TeamMember {
  const data = raw && typeof raw === 'object' ? raw : {};
  const missing: string[] = [];

  // Helper to extract image URL string from string or nested object
  const extractUrl = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val.trim();
    if (typeof val === 'object') {
      return (
        (typeof val.url === 'string' && val.url.trim()) ||
        (typeof val.downloadURL === 'string' && val.downloadURL.trim()) ||
        (typeof val.downloadUrl === 'string' && val.downloadUrl.trim()) ||
        (typeof val.src === 'string' && val.src.trim()) ||
        (typeof val.link === 'string' && val.link.trim()) ||
        (typeof val.secure_url === 'string' && val.secure_url.trim()) ||
        (typeof val.path === 'string' && val.path.trim()) ||
        ''
      );
    }
    return '';
  };

  // Requirement 2: The Firestore image field is: profilePhoto
  const profilePhoto = 
    extractUrl(data.profilePhoto) ||
    extractUrl(data.profile_photo) ||
    extractUrl(data.profileImage) ||
    extractUrl(data.profile_image) ||
    extractUrl(data.imageUrl) ||
    extractUrl(data.image_url) ||
    extractUrl(data.photo) ||
    extractUrl(data.photoUrl) ||
    extractUrl(data.photo_url) ||
    extractUrl(data.downloadURL) ||
    extractUrl(data.downloadUrl) ||
    extractUrl(data.url) ||
    '';

  // Check all possible cover image variations
  const coverImage = 
    extractUrl(data.coverImage) ||
    extractUrl(data.coverImageUrl) ||
    extractUrl(data.cover_image) ||
    extractUrl(data.cover_image_url) ||
    extractUrl(data.bannerImage) ||
    extractUrl(data.bannerImageUrl) ||
    extractUrl(data.banner) ||
    undefined;

  // Check all possible name variations
  const name = 
    (typeof data.name === 'string' && data.name.trim()) ||
    (typeof data.fullName === 'string' && data.fullName.trim()) ||
    (typeof data.full_name === 'string' && data.full_name.trim()) ||
    (typeof data.memberName === 'string' && data.memberName.trim()) ||
    'Team Specialist';

  // Check designation / role variations
  const designation = 
    (typeof data.designation === 'string' && data.designation.trim()) ||
    (typeof data.role === 'string' && data.role.trim()) ||
    (typeof data.position === 'string' && data.position.trim()) ||
    (typeof data.jobTitle === 'string' && data.jobTitle.trim()) ||
    (typeof data.title === 'string' && data.title.trim()) ||
    'Software Engineer';

  // Check short description / bio
  const shortDescription = 
    (typeof data.shortDescription === 'string' && data.shortDescription.trim()) ||
    (typeof data.short_description === 'string' && data.short_description.trim()) ||
    (typeof data.shortBio === 'string' && data.shortBio.trim()) ||
    (typeof data.bio === 'string' && data.bio.trim()) ||
    (typeof data.summary === 'string' && data.summary.trim()) ||
    (typeof data.description === 'string' && data.description.trim()) ||
    'ZYNTHAX Team Member';

  // Check full biography
  const fullBiography = 
    (typeof data.fullBiography === 'string' && data.fullBiography.trim()) ||
    (typeof data.full_biography === 'string' && data.full_biography.trim()) ||
    (typeof data.biography === 'string' && data.biography.trim()) ||
    (typeof data.about === 'string' && data.about.trim()) ||
    shortDescription;

  // Socials
  const email = (typeof data.email === 'string' && data.email.trim()) || (typeof data.contactEmail === 'string' && data.contactEmail.trim()) || '';
  const phone = (typeof data.phone === 'string' && data.phone.trim()) || (typeof data.phoneNumber === 'string' && data.phoneNumber.trim()) || undefined;
  const instagram = (typeof data.instagram === 'string' && data.instagram.trim()) || (typeof data.instagramUrl === 'string' && data.instagramUrl.trim()) || undefined;
  const linkedin = (typeof data.linkedin === 'string' && data.linkedin.trim()) || (typeof data.linkedinUrl === 'string' && data.linkedinUrl.trim()) || undefined;
  const github = (typeof data.github === 'string' && data.github.trim()) || (typeof data.githubUrl === 'string' && data.githubUrl.trim()) || undefined;
  const portfolioWebsite = (typeof data.portfolioWebsite === 'string' && data.portfolioWebsite.trim()) || (typeof data.portfolioUrl === 'string' && data.portfolioUrl.trim()) || (typeof data.website === 'string' && data.website.trim()) || undefined;

  // Skills & Technologies parser (handles arrays & comma-separated strings)
  const parseList = (val: any): string[] => {
    if (Array.isArray(val)) return val.filter((item: any) => typeof item === 'string' && item.trim());
    if (typeof val === 'string' && val.trim()) return val.split(',').map((s: string) => s.trim()).filter(Boolean);
    return [];
  };

  if (!data.name && !data.fullName) missing.push('name');
  if (!data.designation && !data.role) missing.push('designation');
  if (!profilePhoto) {
    missing.push('profilePhoto');
    console.warn(`[mapTeamMemberDoc] Missing profilePhoto URL for team member ID "${id}" (${name}). Document fields available:`, Object.keys(data));
  }

  logValidationNotice('teamMembers', id, missing);

  return {
    id: id || data.id || `member-${Date.now()}`,
    slug: typeof data.slug === 'string' && data.slug.trim() ? data.slug.trim() : id,
    name,
    designation,
    shortDescription,
    fullBiography,
    profilePhoto,
    profileImage: profilePhoto,
    coverImage,
    email,
    phone,
    instagram,
    linkedin,
    github,
    portfolioWebsite,
    skills: parseList(data.skills),
    technologies: parseList(data.technologies),
    experience: typeof data.experience === 'string' && data.experience.trim() ? data.experience : '1+ Year',
    displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : 99,
    featured: Boolean(data.featured),
    status: data.status === 'inactive' ? 'inactive' : 'active',
    joinedDate: typeof data.joinedDate === 'string' ? data.joinedDate : undefined
  };
}

// 4. GALLERY ITEM MAPPER
export function mapGalleryDoc(id: string, raw: any): GalleryItem {
  const data = raw && typeof raw === 'object' ? raw : {};
  const missing: string[] = [];

  if (!data.title) missing.push('title');
  if (!data.mediaUrl) missing.push('mediaUrl');

  logValidationNotice('gallery', id, missing);

  return {
    id: id || data.id || `gal-${Date.now()}`,
    title: typeof data.title === 'string' && data.title ? data.title : 'Creative Work',
    category: typeof data.category === 'string' && data.category ? data.category : 'UI Designs',
    type: data.type === 'video' ? 'video' : 'image',
    mediaUrl: typeof data.mediaUrl === 'string' && data.mediaUrl ? data.mediaUrl : PLACEHOLDER_PROJECT_IMAGE,
    thumbnailUrl: typeof data.thumbnailUrl === 'string' ? data.thumbnailUrl : undefined,
    description: typeof data.description === 'string' ? data.description : 'Creative deliverable by ZYNTHAX.'
  };
}

// 5. TESTIMONIAL MAPPER
export function mapTestimonialDoc(id: string, raw: any): TestimonialItem {
  const data = raw && typeof raw === 'object' ? raw : {};
  const missing: string[] = [];

  if (!data.name) missing.push('name');
  if (!data.review) missing.push('review');

  logValidationNotice('testimonials', id, missing);

  return {
    id: id || data.id || `test-${Date.now()}`,
    name: typeof data.name === 'string' && data.name ? data.name : 'Verified Client',
    company: typeof data.company === 'string' && data.company ? data.company : 'Enterprise Partner',
    role: typeof data.role === 'string' && data.role ? data.role : 'Client',
    profileImage: typeof data.profileImage === 'string' && data.profileImage ? data.profileImage : PLACEHOLDER_PROJECT_IMAGE,
    review: typeof data.review === 'string' && data.review ? data.review : 'High-quality engineering delivered on schedule by ZYNTHAX.',
    rating: typeof data.rating === 'number' ? Math.max(1, Math.min(5, data.rating)) : 5
  };
}

// 6. TECH ITEM MAPPER
export function mapTechDoc(id: string, raw: any): TechItem {
  const data = raw && typeof raw === 'object' ? raw : {};
  return {
    id: id || data.id || `tech-${Date.now()}`,
    name: typeof data.name === 'string' && data.name ? data.name : 'Technology',
    category: data.category === 'design' || data.category === 'video' ? data.category : 'development',
    icon: typeof data.icon === 'string' ? data.icon : 'Code2',
    description: typeof data.description === 'string' ? data.description : 'Core technology stack item.',
    badgeColor: typeof data.badgeColor === 'string' ? data.badgeColor : undefined
  };
}

// 7. STAT MAPPER
export function mapStatDoc(id: string, raw: any): StatItem {
  const data = raw && typeof raw === 'object' ? raw : {};
  return {
    id: id || data.id || `stat-${Date.now()}`,
    label: typeof data.label === 'string' && data.label ? data.label : 'Metric',
    value: typeof data.value === 'string' && data.value ? data.value : '100%',
    prefix: typeof data.prefix === 'string' ? data.prefix : undefined,
    suffix: typeof data.suffix === 'string' ? data.suffix : undefined,
    icon: typeof data.icon === 'string' ? data.icon : 'Sparkles'
  };
}

// 8. ABOUT MAPPER
export function mapAboutDoc(raw: any): AboutData {
  if (!raw || typeof raw !== 'object') return {
    title: '', subtitle: '', description: '', mission: '', vision: '',
    approach: [], whyChooseUs: [], founderName: '', founderRole: '', founderBio: '',
    founderImage: '', companyImages: []
  };
  return {
    title: typeof raw.title === 'string' ? raw.title : '',
    subtitle: typeof raw.subtitle === 'string' ? raw.subtitle : '',
    description: typeof raw.description === 'string' ? raw.description : '',
    mission: typeof raw.mission === 'string' ? raw.mission : '',
    vision: typeof raw.vision === 'string' ? raw.vision : '',
    approach: Array.isArray(raw.approach)
      ? raw.approach.map((a: any) => ({
          number: typeof a?.number === 'string' ? a.number : '01',
          title: typeof a?.title === 'string' ? a.title : '',
          desc: typeof a?.desc === 'string' ? a.desc : ''
        }))
      : [],
    whyChooseUs: Array.isArray(raw.whyChooseUs)
      ? raw.whyChooseUs.map((w: any) => ({
          title: typeof w?.title === 'string' ? w.title : '',
          desc: typeof w?.desc === 'string' ? w.desc : '',
          icon: typeof w?.icon === 'string' ? w.icon : 'CheckCircle2'
        }))
      : [],
    founderName: typeof raw.founderName === 'string' ? raw.founderName : '',
    founderRole: typeof raw.founderRole === 'string' ? raw.founderRole : '',
    founderBio: typeof raw.founderBio === 'string' ? raw.founderBio : '',
    founderImage: typeof raw.founderImage === 'string' ? raw.founderImage : '',
    companyImages: Array.isArray(raw.companyImages)
      ? raw.companyImages.filter((c: any) => typeof c === 'string')
      : []
  };
}

// 9. SETTINGS MAPPER
export function mapSettingsDoc(raw: any): SettingsData {
  if (!raw || typeof raw !== 'object') return {} as SettingsData;
  return {
    ...raw,
    socialLinks: Array.isArray(raw.socialLinks) ? raw.socialLinks : []
  };
}

// 10. HERO MAPPER
export function mapHeroDoc(raw: any): HeroData {
  if (!raw || typeof raw !== 'object') return {} as HeroData;
  return {
    badge: typeof raw.badge === 'string' ? raw.badge : '',
    titlePrefix: typeof raw.titlePrefix === 'string' ? raw.titlePrefix : 'ZYNTHA',
    titleHighlight: typeof raw.titleHighlight === 'string' ? raw.titleHighlight : 'X',
    titleSuffix: typeof raw.titleSuffix === 'string' ? raw.titleSuffix : 'Digital Solutions',
    subtitle: typeof raw.subtitle === 'string' ? raw.subtitle : '',
    description: typeof raw.description === 'string' ? raw.description : '',
    primaryBtnText: typeof raw.primaryBtnText === 'string' ? raw.primaryBtnText : 'View Our Work',
    primaryBtnLink: typeof raw.primaryBtnLink === 'string' ? raw.primaryBtnLink : '/portfolio',
    secondaryBtnText: typeof raw.secondaryBtnText === 'string' ? raw.secondaryBtnText : 'Start a Project',
    secondaryBtnLink: typeof raw.secondaryBtnLink === 'string' ? raw.secondaryBtnLink : '/contact',
    availabilityText: typeof raw.availabilityText === 'string' ? raw.availabilityText : 'Available for New Projects'
  };
}

// 11. BLOG POST MAPPER
export function mapBlogPostDoc(id: string, raw: any): BlogPost {
  const data = raw && typeof raw === 'object' ? raw : {};
  const missing: string[] = [];

  if (!data.title) missing.push('title');
  if (!data.content) missing.push('content');

  logValidationNotice('blogs', id, missing);

  return {
    id: id || data.id || `blog-${Date.now()}`,
    slug: typeof data.slug === 'string' && data.slug ? data.slug : id,
    title: typeof data.title === 'string' && data.title ? data.title : 'Untitled Article',
    excerpt: typeof data.excerpt === 'string' && data.excerpt ? data.excerpt : 'Article overview.',
    content: typeof data.content === 'string' && data.content ? data.content : 'No article content available.',
    coverImage: typeof data.coverImage === 'string' && data.coverImage ? data.coverImage : PLACEHOLDER_PROJECT_IMAGE,
    author: typeof data.author === 'string' && data.author ? data.author : 'ZYNTHAX Team',
    authorImage: typeof data.authorImage === 'string' ? data.authorImage : undefined,
    authorRole: typeof data.authorRole === 'string' ? data.authorRole : undefined,
    category: typeof data.category === 'string' && data.category ? data.category : 'Engineering',
    tags: Array.isArray(data.tags) ? data.tags.filter((t: any) => typeof t === 'string') : [],
    publishedAt: typeof data.publishedAt === 'string' && data.publishedAt ? data.publishedAt : '2025-01-01',
    readTime: typeof data.readTime === 'string' && data.readTime ? data.readTime : '3 min read',
    featured: Boolean(data.featured),
    status: data.status === 'draft' ? 'draft' : 'published'
  };
}

// 12. FAQ MAPPER
export function mapFaqDoc(id: string, raw: any): FaqItem {
  const data = raw && typeof raw === 'object' ? raw : {};
  return {
    id: id || data.id || `faq-${Date.now()}`,
    question: typeof data.question === 'string' && data.question ? data.question : 'Frequently Asked Question',
    answer: typeof data.answer === 'string' && data.answer ? data.answer : 'Answer detailing service guidelines.',
    category: typeof data.category === 'string' && data.category ? data.category : 'General',
    displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : 99
  };
}

// 13. SEO MAPPER
export function mapSeoDoc(raw: any): SeoData {
  if (!raw || typeof raw !== 'object') return {} as SeoData;
  return {
    ...raw,
    defaultKeywords: Array.isArray(raw.defaultKeywords) ? raw.defaultKeywords : []
  };
}
