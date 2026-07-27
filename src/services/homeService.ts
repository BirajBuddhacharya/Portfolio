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
    queryFn: async () => placeholder.featuredProjects,
  });

export const useHomeExperience = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_EXPERIENCE],
    queryFn: async () => placeholder.experience,
  });

export const useHomeSkills = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_SKILLS],
    queryFn: async () => placeholder.skillGroups,
  });

export const useHomeBlogPreview = () =>
  useQuery({
    queryKey: [QueryKeys.HOME_BLOG_PREVIEW],
    queryFn: async () => placeholder.blogPreviews,
  });
