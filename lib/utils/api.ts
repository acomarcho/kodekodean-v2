export const extractToken = (authHeader: string) => {
  return authHeader.split(" ")[1];
};
