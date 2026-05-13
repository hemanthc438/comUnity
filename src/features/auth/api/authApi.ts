export const loginApi = async (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email.includes('@') || password.length < 6) {
        reject(new Error('Invalid email or password too short.'));
      } else {
        resolve('jwt-mock-token-123456789');
      }
    }, 1000);
  });
};

export const logoutApi = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
