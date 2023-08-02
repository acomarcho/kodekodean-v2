import type {
  ModuleWithChunks,
  GetSingleModuleResponse,
} from "@/lib/constants/responses";
import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleModule = (id: string) => {
  const [module, setModule] = useState<ModuleWithChunks | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<GetSingleModuleResponse>(
          `/api/module/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        setModule(data.module);
      } catch (error) {
        setModule(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { module, isLoading };
};
