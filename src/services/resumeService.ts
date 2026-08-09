import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

type Entry = { title: string; period: string; organization: string; body: string };

const toRow = (e: Entry) => ({
  title: e.title,
  meta: [e.organization, e.period].filter(Boolean).join(' · '),
  body: e.body,
});

export const useResume = () =>
  useQuery({
    queryKey: [QueryKeys.RESUME],
    queryFn: async () => {
      const r = placeholder.resume;
      return [
        { label: 'Experience', rows: r.experiences.map(toRow) },
        { label: 'Education', rows: r.education.map(toRow) },
        { label: 'Certifications', rows: r.certifications.map(toRow) },
        { label: 'Skills', rows: r.skills.map((s) => ({ ...s, meta: '' })) },
      ];
    },
  });
