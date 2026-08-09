'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useAdminOverview = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_OVERVIEW],
    queryFn: async () => {
      const { blogPosts, allProjects, admin } = placeholder;
      return [
        {
          label: 'Total posts',
          value: String(blogPosts.length),
          delta: `${blogPosts.filter((p) => p.status === 'published').length} published`,
        },
        {
          label: 'Projects',
          value: String(allProjects.length),
          delta: `${allProjects.filter((p) => p.status === 'live').length} live`,
        },
        {
          label: 'Messages',
          value: String(admin.inbox.length),
          delta: `${admin.inbox.filter((m) => !m.read).length} unread`,
        },
      ];
    },
  });

export const useAdminChart = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_CHART],
    queryFn: async () => placeholder.admin.chartBars,
  });

export const useAdminTopPages = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_TOP_PAGES],
    queryFn: async () => placeholder.admin.topPages,
  });

export const useAdminActivity = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_ACTIVITY],
    queryFn: async () => placeholder.admin.activity,
  });

export const useAdminInbox = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_INBOX],
    queryFn: async () => placeholder.admin.inbox,
  });

export const useAdminProjects = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_PROJECTS],
    queryFn: async () =>
      placeholder.allProjects.map((p) => ({
        title: p.title,
        kind: p.kind,
        year: p.year,
        status: p.status,
      })),
  });

export const useAdminPosts = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_POSTS],
    queryFn: async () =>
      placeholder.blogPosts.map((p) => ({
        title: p.title,
        tags: p.tags,
        date: p.date,
        status: p.status,
      })),
  });

export const useAdminAbout = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_ABOUT],
    queryFn: async () => placeholder.about,
  });

export const useAdminResume = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_RESUME],
    queryFn: async () => placeholder.resume,
  });
