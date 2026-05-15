import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, Post } from '../api/postsApi';

interface CreatePostVars {
  communityId: string;
  communityName: string;
  title: string;
  content: string;
}

export const usePostMutations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communityId, communityName, title, content }: CreatePostVars) =>
      createPost(communityId, communityName, title, content),

    onMutate: async ({ communityId, communityName, title, content }) => {
      await queryClient.cancelQueries({ queryKey: ['posts', communityId] });
      await queryClient.cancelQueries({ queryKey: ['allPosts'] });

      const previousPosts = queryClient.getQueryData<Post[]>(['posts', communityId]);
      const previousAllPosts = queryClient.getQueryData<Post[]>(['allPosts']);

      const optimisticPost: Post = {
        id: 'temp-' + Date.now(),
        communityId,
        communityName,
        authorName: 'You',
        title,
        content,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Post[]>(['posts', communityId], (old = []) => [
        optimisticPost,
        ...old,
      ]);

      queryClient.setQueryData<Post[]>(['allPosts'], (old = []) => [
        optimisticPost,
        ...old,
      ]);

      return { previousPosts, previousAllPosts, communityId };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousPosts !== undefined) {
        queryClient.setQueryData(['posts', context.communityId], context.previousPosts);
      }
      if (context?.previousAllPosts !== undefined) {
        queryClient.setQueryData(['allPosts'], context.previousAllPosts);
      }
    },

    onSettled: (_data, _err, { communityId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', communityId] });
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
    },
  });
};
