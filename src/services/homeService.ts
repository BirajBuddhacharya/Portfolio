import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useHomeStats = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_STATS],
    queryFn: async () => placeholder.stats,
  });

export const useHomeTicker = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_TICKER],
    queryFn: async () => placeholder.ticker,
  });

export const useHomeFeaturedProjects = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_FEATURED_PROJECTS],
    queryFn: async () => placeholder.allProjects.filter((p) => p.status === 'live').slice(0, 3),
  });

export const useHomeExperience = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_EXPERIENCE],
    queryFn: async () => placeholder.experience,
  });

export const useHomeSkills = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_SKILLS],
    queryFn: async () =>
      placeholder.resume.skills.map((s) => ({ name: s.title, items: s.body.split(', ') })),
  });

export const useHomeBlogPreview = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_BLOG_PREVIEW],
    queryFn: async () =>
      placeholder.blogPosts.filter((p) => p.status === 'published').slice(0, 3),
  });
