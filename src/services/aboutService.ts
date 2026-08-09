import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useAboutProfile = () =>
  useQuery({
    queryKey: [QueryKeys.ABOUT_PROFILE],
    queryFn: async () => ({
      headline: placeholder.about.headline,
      coverImage: placeholder.about.coverImage,
    }),
  });

export const useAbout = () =>
  useQuery({
    queryKey: [QueryKeys.ABOUT],
    queryFn: async () => placeholder.about.paragraphs,
  });

// education + certifications are edited in the admin Resume tab
export const useAboutEducation = () =>
  useQuery({
    queryKey: [QueryKeys.ABOUT_EDUCATION],
    queryFn: async () =>
      [...placeholder.resume.education, ...placeholder.resume.certifications].map((e) => ({
        period: e.period,
        title: e.title,
        place: e.organization,
      })),
  });

export const useAboutFacts = () =>
  useQuery({
    queryKey: [QueryKeys.ABOUT_FACTS],
    queryFn: async () => placeholder.about.facts,
  });
