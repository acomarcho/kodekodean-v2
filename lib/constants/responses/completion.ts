export type Completion = {
  id: number;
  userId: number;
  moduleId: number;
  createdAt: Date;
};

export type PutCompletionResponse = {
  completion: Completion;
};
