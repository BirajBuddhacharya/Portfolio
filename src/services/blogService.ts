import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

const published = () => placeholder.blogPosts.filter((p) => p.status === 'published');

export const useBlogPosts = () =>
  useQuery({
    queryKey: [QueryKeys.BLOG_POSTS],
    queryFn: async () => published(),
  });

export const useBlogFeatured = () =>
  useQuery({
    queryKey: [QueryKeys.BLOG_FEATURED],
    queryFn: async () => published()[0],
  });

export const useBlogPostDetail = (id: string) =>
  useQuery({
    queryKey: [QueryKeys.BLOG_POST_DETAIL, id],
    queryFn: async () => {
      const post = published().find((p) => p.id === id);
      if (!post) throw new Error('Post not found');
      return post;
    },
    enabled: !!id,
  });
