export type Chunk = {
  id: number;
  moduleId: number;
  title: string;
  content: string;
  rank: number;
};

export type GetSingleChunkResponse = {
  chunk: Chunk | null;
};
