import { useQuery } from '@tanstack/react-query';
import { fetchAllPosts, Post } from '../../posts/api/postsApi';

export type { Post as FeedPost };

export const useFeed = () => {
  const { data: feed = [], isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: fetchAllPosts,
  });

  return { feed, isLoading };
};
