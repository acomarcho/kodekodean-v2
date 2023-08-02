import type { Chunk, GetSingleChunkResponse } from "@/lib/constants/responses";
import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleChunk = (id: string) => {
  const [chunk, setChunk] = useState<Chunk | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<GetSingleChunkResponse>(
          `/api/chunk/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        setChunk(data.chunk);
      } catch (error) {
        setChunk(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { chunk, isLoading };
};
