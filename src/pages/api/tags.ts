import type { NextApiRequest, NextApiResponse } from 'next';

const ALL_TAGS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python',
  'Machine Learning', 'NLP', 'LangChain', 'FastAPI', 'PostgreSQL',
  'pgvector', 'Docker', 'RAG', 'AI', 'Deep Learning',
  'Web Development', 'CLI', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'GraphQL', 'REST API', 'MongoDB', 'Redis',
  'Computer Vision', 'Data Engineering', 'DevOps', 'CI/CD',
  'Open Source', 'Tutorial', 'Opinion', 'Case Study',
];

type Data = { tags: string[] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { q } = req.query;
  const query = typeof q === 'string' ? q.toLowerCase().trim() : '';
  const tags = query ? ALL_TAGS.filter(t => t.toLowerCase().includes(query)) : ALL_TAGS;
  res.status(200).json({ tags });
}
