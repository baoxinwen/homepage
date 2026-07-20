export interface SocialLink {
  name: string;
  url: string;
  description?: string;
  primary?: boolean;
}

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  dateLabel: string;
  description: string;
  readTimeMinutes: number;
}

export type ProjectVisual = 'meme' | 'ledger' | 'tree' | 'map' | 'trend';

export type ProjectCardSize = 'lead' | 'support' | 'compact';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface FeaturedProject {
  name: string;
  category: string;
  description: string;
  stack: string[];
  repoUrl: string;
  secondaryLink?: ProjectLink;
  visual: ProjectVisual;
  size: ProjectCardSize;
}
