export type User = {
  id: number;
  createdAt: Date;
  name: string;
  email: string;
  password: string;
};

export type GetUserResponse = {
  user: User;
};
