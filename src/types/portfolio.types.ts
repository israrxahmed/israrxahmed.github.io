/* =========================================================
   CORE SHARED TYPES
========================================================= */

export type ProjectCategory =
  | "all"
  | "refinery"
  | "gas"
  | "power"
  | "pipeline";

/* =========================================================
   PERSONAL / HERO / ABOUT
========================================================= */

export interface HeroData {
  headline: string;
  subHeadline: string;
  badgeTexts: string[];
  tagline: string;
  description: string;
  summary: string;
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
  description: string;
  extendedDescription: string;
  quote: string;
}

export interface StatsData {
  yearsExperience: number;
  projects: number;
  countries: number;
}

export interface ContactMeta {
  email: string;
  linkedin: string;
  location: string;
  availabilityStatus: string;
  availabilityDescription: string;
  responseNote: string;
}

export interface PersonalData {
  name: string;
  initials: string;
  designation: string;
  hero: HeroData;
  about: AboutData;
  achievements: Achievement[];
  stats: StatsData;
  contact: ContactMeta;
}

/* =========================================================
   CONTACT FORM
   ========================================================= */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/* =========================================================
   NAVIGATION
========================================================= */

export interface NavigationItem {
  label: string;
  href: string;
}

export type NavigationData = NavigationItem[];

/* =========================================================
   PROJECTS
========================================================= */

export interface Project {
  id: number;
  name: string;
  location: string;
  category: ProjectCategory;
  image: string;
  role: string;
  scope: string[];
  description: string;
}

export interface ProjectCategoryItem {
  value: ProjectCategory;
  label: string;
}

export interface ProjectsData {
  categories: ProjectCategoryItem[];
  items: Project[];
}

/* =========================================================
   SERVICES
========================================================= */

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicesData {
  services: Service[];
  processSteps: ProcessStep[];
}

/* =========================================================
   SKILLS / EXPERTISE
========================================================= */

export interface SkillItem {
  name: string;
  icon: string;
  proficiency: number; // 0–100
}

export interface SkillsData {
  technicalSkills: SkillItem[];
  epcExecution: SkillItem[];
  softwareTools: string[];
}

/* =========================================================
    INNOVATIONS
   ========================================================= */

export interface Innovation {
  icon: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  color: string;
}

export interface InnovationStat {
  icon: string;
  value: string;
  label: string;
}

export interface InnovationsData {
  innovations: Innovation[];
  overallStats: InnovationStat[];
}

/* =========================================================
    CLIENTS & TESTIMONIALS
   ========================================================= */

export interface Client {
  name: string;
  country: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface ClientsData {
  clients: Client[];
  testimonials: Testimonial[];
}
