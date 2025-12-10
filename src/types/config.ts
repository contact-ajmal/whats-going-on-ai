export interface SiteConfig {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
  skills: Array<{
    name: string;
    icon: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    demo: string | null;
  }>;
  blogMeta: {
    title: string;
    description: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}
