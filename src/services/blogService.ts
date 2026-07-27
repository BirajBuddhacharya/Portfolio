import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export const useBlogPosts = () =>
  useQuery({
    queryKey: [QueryKeys.BLOG_POSTS],
    queryFn: async () => placeholder.blogPosts,
  });

export const useBlogFeatured = () =>
  useQuery({
    queryKey: [QueryKeys.BLOG_FEATURED],
    queryFn: async () => placeholder.blogPosts[0],
  });

export const useBlogPostDetail = (id: string) =>
  useQuery({
    queryKey: [QueryKeys.BLOG_POST_DETAIL, id],
    queryFn: async () => {
      const post = placeholder.blogPosts.find((p) => p.id === id);
      if (!post) throw new Error('Post not found');
      return post;
    },
    enabled: !!id,
  });
