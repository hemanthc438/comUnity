import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { toggleJoinCommunity } from '../api/mutations';
import { Community } from '../api/communitiesApi';

type CommunitiesPage = { data: Community[]; nextPage: number | null };

const applyJoinToggle = (c: Community, isJoining: boolean): Community => ({
  ...c,
  isJoined: isJoining,
  memberCount: isJoining ? c.memberCount + 1 : c.memberCount - 1,
});

export const useCommunityMutations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isJoining }: { id: string; isJoining: boolean }) =>
      toggleJoinCommunity(id, isJoining),

    onMutate: async ({ id, isJoining }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['communities'] }),
        queryClient.cancelQueries({ queryKey: ['community', id] }),
      ]);

      const previousList = queryClient.getQueryData<InfiniteData<CommunitiesPage>>(['communities']);
      const previousDetail = queryClient.getQueryData<Community>(['community', id]);

      queryClient.setQueryData<InfiniteData<CommunitiesPage>>(['communities'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((c) => c.id === id ? applyJoinToggle(c, isJoining) : c),
          })),
        };
      });

      queryClient.setQueryData<Community>(['community', id], (old) =>
        old ? applyJoinToggle(old, isJoining) : old
      );

      return { previousList, previousDetail };
    },

    onError: (_err, { id }, context) => {
      if (context?.previousList !== undefined) {
        queryClient.setQueryData(['communities'], context.previousList);
      }
      if (context?.previousDetail !== undefined) {
        queryClient.setQueryData(['community', id], context.previousDetail);
      }
    },
  });
};
