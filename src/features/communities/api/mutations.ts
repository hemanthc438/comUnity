import { saveJoinedId } from './communitiesApi';

export const toggleJoinCommunity = (communityId: string, isJoining: boolean): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        saveJoinedId(communityId, isJoining);
        resolve(isJoining);
      } else {
        reject(new Error('Network Error'));
      }
    }, 800);
  });
};
