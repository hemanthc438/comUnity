export const toggleJoinCommunity = (_communityId: string, isJoining: boolean): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        resolve(isJoining);
      } else {
        reject(new Error('Network Error'));
      }
    }, 800);
  });
};
