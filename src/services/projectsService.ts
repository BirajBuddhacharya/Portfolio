import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useProjects = () =>
  useQuery({
    queryKey: [QueryKeys.PROJECTS_LIST],
    queryFn: async () => placeholder.allProjects,
  });

export const useProjectDetail = (id: string) =>
  useQuery({
    queryKey: [QueryKeys.PROJECT_DETAIL, id],
    queryFn: async () => {
      const project = placeholder.allProjects.find((p) => p.id === id);
      if (!project) throw new Error('Project not found');
      return project;
    },
    enabled: !!id,
  });
