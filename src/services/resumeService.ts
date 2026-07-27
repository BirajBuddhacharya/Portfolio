import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useResume = () =>
  useQuery({
    queryKey: [QueryKeys.RESUME],
    queryFn: async () => placeholder.resume,
  });
