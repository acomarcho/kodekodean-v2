import type {
  UnitWithModules,
  GetSingleUnitResponse,
} from "@/lib/constants/responses";
import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleUnit = (id: string) => {
  const [unit, setUnit] = useState<UnitWithModules | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
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
      } catch (error) {
        setUnit(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { unit, isLoading };
};
