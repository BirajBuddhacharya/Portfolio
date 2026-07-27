'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useAdminOverview = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_OVERVIEW],
    queryFn: async () => placeholder.admin.overviewStats,
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
    queryFn: async () => placeholder.admin.adminProjects,
  });

export const useAdminPosts = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_POSTS],
    queryFn: async () => placeholder.admin.adminPosts,
  });

export const useAdminAbout = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_ABOUT],
    queryFn: async () => placeholder.about,
  });

export const useAdminResume = () =>
  useQuery({
    queryKey: [QueryKeys.ADMIN_RESUME],
    queryFn: async () => placeholder.admin.adminResume,
  });

export const useResumePool = () =>
  useQuery({
    queryKey: [QueryKeys.RESUME_POOL],
    queryFn: async () => placeholder.resumePool,
  });
