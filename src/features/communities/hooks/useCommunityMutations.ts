import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleJoinCommunity } from '../api/mutations';
import { Community } from '../api/communitiesApi';

export const useCommunityMutations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isJoining }: { id: string; isJoining: boolean }) =>
      toggleJoinCommunity(id, isJoining),

    onMutate: async ({ id, isJoining }) => {
      await queryClient.cancelQueries({ queryKey: ['communities'] });

      const previousCommunities = queryClient.getQueryData(['communities']);

      queryClient.setQueryData(['communities'], (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((community: Community) =>
              community.id === id
                ? {
                    ...community,
                    isJoined: isJoining,
                    memberCount: isJoining
                      ? community.memberCount + 1
                      : community.memberCount - 1,
                  }
                : community
            ),
          })),
        };
      });

      return { previousCommunities };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['communities'], context?.previousCommunities);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
  });
};
