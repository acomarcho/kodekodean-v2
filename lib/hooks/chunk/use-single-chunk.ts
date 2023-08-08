import type { GetSingleChunkResponse } from "@/lib/constants/responses";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

export const useSingleChunk = (id: string) => {
  const { data: chunkData, isLoading } = useSWR<GetSingleChunkResponse>(
    `/api/chunk/${id}`,
    fetcher<GetSingleChunkResponse>
  );

  const chunk = chunkData?.chunk;

  return { chunk, isLoading };
};
