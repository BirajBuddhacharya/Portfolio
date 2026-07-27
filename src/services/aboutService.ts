import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useAbout = () =>
  useQuery({
    queryKey: [QueryKeys.ABOUT],
    queryFn: async () => placeholder.about.paragraphs,
  });

export const useAboutEducation = () =>
  useQuery({
    queryKey: [QueryKeys.ABOUT_EDUCATION],
    queryFn: async () => placeholder.about.education,
  });

export const useAboutFacts = () =>
  useQuery({
    queryKey: [QueryKeys.ABOUT_FACTS],
    queryFn: async () => placeholder.about.facts,
  });
