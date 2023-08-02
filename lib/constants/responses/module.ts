import { Chunk } from ".";

export type Module = {
  id: number;
  unitId: number;
  title: string;
  description: string;
  rank: number;
};

export type ModuleWithChunks = Module & {
  chunks: Chunk[];
};

export type GetSingleModuleResponse = {
  module: ModuleWithChunks | null;
};
