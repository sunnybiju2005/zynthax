import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  setDoc, 
  serverTimestamp,
  query,
  orderBy,
  where,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

// Type imports only — no SEED data used for fallbacks
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
  SeoData
} from './seedData';

// SEED data imports used ONLY by seedFirestoreCollections() admin tool
import { 
  SEED_SERVICES, 
  SEED_PROJECTS, 
  SEED_GALLERY, 
  SEED_TECHNOLOGIES, 
  SEED_TESTIMONIALS, 
  SEED_STATISTICS, 
  SEED_ABOUT, 
  SEED_SETTINGS,
  SEED_TEAM_MEMBERS,
  SEED_HERO,
  SEED_CONTACT,
  SEED_SOCIAL_LINKS,
  SEED_BLOGS,
  SEED_FAQ,
  SEED_SEO,
} from './seedData';

import {
  mapProjectDoc,
  mapServiceDoc,
  mapTeamMemberDoc,
  mapGalleryDoc,
  mapTestimonialDoc,
  mapTechDoc,
  mapStatDoc,
  mapAboutDoc,
  mapSettingsDoc,
  mapHeroDoc,
  mapBlogPostDoc,
  mapFaqDoc,
  mapSeoDoc
} from './mappers';


// ─── 1. SERVICES ──────────────────────────────────────────────────────────────
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const snap = await getDocs(collection(db, 'services'));
    const list: ServiceItem[] = [];
    snap.forEach((d) => list.push(mapServiceDoc(d.id, d.data())));
    return list;
  } catch (error) {
    console.error("Firestore: getServices failed:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const services = await getServices();
    return services.find(s => s.slug === slug || s.id === slug) || null;
  } catch (error) {
    console.error("Firestore: getServiceBySlug failed:", error);
    return null;
  }
}


// ─── 2. PROJECTS ──────────────────────────────────────────────────────────────
export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const snap = await getDocs(collection(db, 'projects'));
    const list: ProjectItem[] = [];
    snap.forEach((d) => {
      const mapped = mapProjectDoc(d.id, d.data());
      if (mapped.title && mapped.title !== 'Untitled Project' && mapped.title.toLowerCase() !== 'untitled') {
        list.push(mapped);
      }
    });
    return list;
  } catch (error) {
    console.error("Firestore: getProjects failed:", error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<ProjectItem | null> {
  try {
    const dSnap = await getDoc(doc(db, 'projects', id));
    if (dSnap.exists()) {
      const mapped = mapProjectDoc(dSnap.id, dSnap.data());
      if (mapped.title && mapped.title !== 'Untitled Project' && mapped.title.toLowerCase() !== 'untitled') {
        return mapped;
      }
    }
    // Search by id in all projects
    const all = await getProjects();
    return all.find(p => p.id === id) || null;
  } catch (error) {
    console.error("Firestore: getProjectById failed:", error);
    return null;
  }
}


// ─── 3. GALLERY ───────────────────────────────────────────────────────────────
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const snap = await getDocs(collection(db, 'gallery'));
    const list: GalleryItem[] = [];
    snap.forEach((d) => list.push(mapGalleryDoc(d.id, d.data())));
    return list;
  } catch (error) {
    console.error("Firestore: getGallery failed:", error);
    return [];
  }
}


// ─── 4. TECHNOLOGIES ──────────────────────────────────────────────────────────
export async function getTechnologies(): Promise<TechItem[]> {
  try {
    const snap = await getDocs(collection(db, 'technologies'));
    const list: TechItem[] = [];
    snap.forEach((d) => list.push(mapTechDoc(d.id, d.data())));
    return list;
  } catch (error) {
    console.error("Firestore: getTechnologies failed:", error);
    return [];
  }
}


// ─── 5. TESTIMONIALS ──────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const snap = await getDocs(collection(db, 'testimonials'));
    const list: TestimonialItem[] = [];
    snap.forEach((d) => list.push(mapTestimonialDoc(d.id, d.data())));
    return list;
  } catch (error) {
    console.error("Firestore: getTestimonials failed:", error);
    return [];
  }
}


// ─── 6. STATISTICS ────────────────────────────────────────────────────────────
export async function getStatistics(): Promise<StatItem[]> {
  try {
    const snap = await getDocs(collection(db, 'statistics'));
    const list: StatItem[] = [];
    snap.forEach((d) => list.push(mapStatDoc(d.id, d.data())));
    return list;
  } catch (error) {
    console.error("Firestore: getStatistics failed:", error);
    return [];
  }
}


// ─── 7. ABOUT ─────────────────────────────────────────────────────────────────
export async function getAbout(): Promise<AboutData | null> {
  try {
    const docSnap = await getDoc(doc(db, 'about', 'company'));
    if (docSnap.exists()) return mapAboutDoc(docSnap.data());
    return null;
  } catch (error) {
    console.error("Firestore: getAbout failed:", error);
    return null;
  }
}


// ─── 8. SETTINGS ──────────────────────────────────────────────────────────────
export async function getSettings(): Promise<SettingsData | null> {
  try {
    const docSnap = await getDoc(doc(db, 'settings', 'general'));
    if (docSnap.exists()) return mapSettingsDoc(docSnap.data());
    return null;
  } catch (error) {
    console.error("Firestore: getSettings failed:", error);
    return null;
  }
}


// ─── 9. ENQUIRY SUBMISSION ────────────────────────────────────────────────────
export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

export async function submitEnquiry(data: EnquiryData): Promise<{ success: boolean; id?: string }> {
  try {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
      timestamp: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Firestore: submitEnquiry failed:", error);
    return { success: false };
  }
}


// ─── 10. TEAM MEMBERS ─────────────────────────────────────────────────────────
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const snap = await getDocs(collection(db, 'teamMembers'));
    const list: TeamMember[] = [];
    snap.forEach((d) => {
      const rawData = d.data();
      console.log(`[Firestore teamMembers document read - ID: "${d.id}"]:`, rawData);
      const mapped = mapTeamMemberDoc(d.id, rawData);
      if (mapped.status !== 'inactive') {
        list.push(mapped);
      }
    });
    console.log(`[Firestore getTeamMembers] Fetched ${list.length} active team members.`);
    return list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.displayOrder || 99) - (b.displayOrder || 99);
    });
  } catch (err) {
    console.error("Firestore read error in getTeamMembers():", err);
    return [];
  }
}

export async function getTeamMemberById(idOrSlug: string): Promise<TeamMember | null> {
  try {
    const dSnap = await getDoc(doc(db, 'teamMembers', idOrSlug));
    if (dSnap.exists()) {
      const rawData = dSnap.data();
      console.log(`[Firestore teamMembers single doc read - ID: "${dSnap.id}"]:`, rawData);
      return mapTeamMemberDoc(dSnap.id, rawData);
    }
    // Query by slug field
    const all = await getTeamMembers();
    const found = all.find(m => m.id === idOrSlug || m.slug === idOrSlug);
    if (found) {
      console.log(`[Firestore teamMembers slug match for "${idOrSlug}"]:`, found);
      return found;
    }
    console.warn(`[Firestore getTeamMemberById] No team member found matching ID or slug: "${idOrSlug}"`);
    return null;
  } catch (err) {
    console.error(`Firestore read error in getTeamMemberById("${idOrSlug}"):`, err);
    return null;
  }
}


// ─── 11. HERO ─────────────────────────────────────────────────────────────────
export async function getHero(): Promise<HeroData | null> {
  try {
    const docSnap = await getDoc(doc(db, 'hero', 'homepage'));
    if (docSnap.exists()) return mapHeroDoc(docSnap.data());
    return null;
  } catch (err) {
    console.error("Firestore: getHero failed:", err);
    return null;
  }
}


// ─── 12. CONTACT DETAILS ──────────────────────────────────────────────────────
export async function getContact(): Promise<ContactDetails | null> {
  try {
    const docSnap = await getDoc(doc(db, 'contact', 'details'));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        phone: typeof data?.phone === 'string' ? data.phone : '',
        phone2: typeof data?.phone2 === 'string' ? data.phone2 : '',
        email: typeof data?.email === 'string' ? data.email : '',
        address: typeof data?.address === 'string' ? data.address : '',
        whatsappNumber: typeof data?.whatsappNumber === 'string' ? data.whatsappNumber : '',
        whatsappNumber2: typeof data?.whatsappNumber2 === 'string' ? data.whatsappNumber2 : '',
        instagramUrl: typeof data?.instagramUrl === 'string' ? data.instagramUrl : '',
        workingHours: typeof data?.workingHours === 'string' ? data.workingHours : '',
        mapEmbedUrl: typeof data?.mapEmbedUrl === 'string' ? data.mapEmbedUrl : '',
      };
    }
    return null;
  } catch (err) {
    console.error("Firestore: getContact failed:", err);
    return null;
  }
}


// ─── 13. SOCIAL LINKS ─────────────────────────────────────────────────────────
export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const snap = await getDocs(collection(db, 'socialLinks'));
    const list: SocialLink[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        platform: typeof data?.platform === 'string' ? data.platform : 'Social',
        url: typeof data?.url === 'string' ? data.url : '#',
        icon: typeof data?.icon === 'string' ? data.icon : 'Globe',
        label: typeof data?.label === 'string' ? data.label : 'Social Link',
        displayOrder: typeof data?.displayOrder === 'number' ? data.displayOrder : 99,
        active: data?.active !== false
      });
    });
    return list.filter(l => l.active).sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  } catch (err) {
    console.error("Firestore: getSocialLinks failed:", err);
    return [];
  }
}


// ─── 14. BLOGS ────────────────────────────────────────────────────────────────
export async function getBlogs(publishedOnly = true): Promise<BlogPost[]> {
  try {
    const snap = await getDocs(collection(db, 'blogs'));
    const list: BlogPost[] = [];
    snap.forEach((d) => list.push(mapBlogPostDoc(d.id, d.data())));
    const filtered = publishedOnly ? list.filter(b => b.status === 'published') : list;
    return filtered.sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTime - aTime;
    });
  } catch (err) {
    console.error("Firestore: getBlogs failed:", err);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const dSnap = await getDoc(doc(db, 'blogs', slug));
    if (dSnap.exists()) return mapBlogPostDoc(dSnap.id, dSnap.data());
    // Search all blogs by slug field
    const all = await getBlogs(false);
    return all.find(b => b.slug === slug || b.id === slug) || null;
  } catch (err) {
    console.error("Firestore: getBlogBySlug failed:", err);
    return null;
  }
}


// ─── 15. FAQ ──────────────────────────────────────────────────────────────────
export async function getFaq(): Promise<FaqItem[]> {
  try {
    const snap = await getDocs(collection(db, 'faq'));
    const list: FaqItem[] = [];
    snap.forEach((d) => list.push(mapFaqDoc(d.id, d.data())));
    return list.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  } catch (err) {
    console.error("Firestore: getFaq failed:", err);
    return [];
  }
}


// ─── 16. SEO ──────────────────────────────────────────────────────────────────
export async function getSeo(): Promise<SeoData | null> {
  try {
    const docSnap = await getDoc(doc(db, 'seo', 'global'));
    if (docSnap.exists()) return mapSeoDoc(docSnap.data());
    return null;
  } catch (err) {
    console.error("Firestore: getSeo failed:", err);
    return null;
  }
}


// ─── 17. DATABASE SEEDER (Admin Tool Only) ────────────────────────────────────
// This function pushes initial seed data to Firestore from the admin panel.
// It is the ONLY place SEED_* constants should be used.
export async function seedFirestoreCollections(): Promise<{ success: boolean; details: string[] }> {
  const details: string[] = [];
  try {
    for (const s of SEED_SERVICES) await setDoc(doc(db, 'services', s.id), s);
    details.push(`Seeded ${SEED_SERVICES.length} services`);

    for (const p of SEED_PROJECTS) await setDoc(doc(db, 'projects', p.id), p);
    details.push(`Seeded ${SEED_PROJECTS.length} projects`);

    for (const g of SEED_GALLERY) await setDoc(doc(db, 'gallery', g.id), g);
    details.push(`Seeded ${SEED_GALLERY.length} gallery items`);

    for (const t of SEED_TECHNOLOGIES) await setDoc(doc(db, 'technologies', t.id), t);
    details.push(`Seeded ${SEED_TECHNOLOGIES.length} technologies`);

    for (const test of SEED_TESTIMONIALS) await setDoc(doc(db, 'testimonials', test.id), test);
    details.push(`Seeded ${SEED_TESTIMONIALS.length} testimonials`);

    for (const st of SEED_STATISTICS) await setDoc(doc(db, 'statistics', st.id), st);
    details.push(`Seeded ${SEED_STATISTICS.length} statistics`);

    await setDoc(doc(db, 'about', 'company'), SEED_ABOUT);
    details.push('Seeded About document');

    await setDoc(doc(db, 'settings', 'general'), SEED_SETTINGS);
    details.push('Seeded Settings document');

    for (const member of SEED_TEAM_MEMBERS) await setDoc(doc(db, 'teamMembers', member.id), member);
    details.push(`Seeded ${SEED_TEAM_MEMBERS.length} team members`);

    await setDoc(doc(db, 'hero', 'homepage'), SEED_HERO);
    details.push('Seeded Hero document');

    await setDoc(doc(db, 'contact', 'details'), SEED_CONTACT);
    details.push('Seeded Contact Details document');

    for (const link of SEED_SOCIAL_LINKS) await setDoc(doc(db, 'socialLinks', link.id), link);
    details.push(`Seeded ${SEED_SOCIAL_LINKS.length} social links`);

    for (const blog of SEED_BLOGS) await setDoc(doc(db, 'blogs', blog.id), blog);
    details.push(`Seeded ${SEED_BLOGS.length} blog posts`);

    for (const item of SEED_FAQ) await setDoc(doc(db, 'faq', item.id), item);
    details.push(`Seeded ${SEED_FAQ.length} FAQ items`);

    await setDoc(doc(db, 'seo', 'global'), SEED_SEO);
    details.push('Seeded SEO document');

    return { success: true, details };
  } catch (err: any) {
    console.error("Firestore seeder error:", err);
    return { success: false, details: [`Error: ${err?.message || err}`] };
  }
}

// Re-export types for convenience
export type { HeroData, ContactDetails, SocialLink, BlogPost, FaqItem, SeoData };
