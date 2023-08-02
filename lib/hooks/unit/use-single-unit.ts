import type {
  UnitWithModules,
  GetSingleUnitResponse,
  GetCompletionsResponse,
  Completion,
} from "@/lib/constants/responses";
import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleUnit = (id: string) => {
  const [unit, setUnit] = useState<UnitWithModules | null>(null);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<GetSingleUnitResponse>(
          `/api/unit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        setUnit(data.unit);

        const { data: data2 } = await axios.get<GetCompletionsResponse>(
          "/api/completion",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        setCompletions(data2.completions);
      } catch (error) {
        setUnit(null);
        setCompletions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { unit, completions, isLoading };
};
