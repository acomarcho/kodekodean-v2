import type {
  GetSingleUnitResponse,
  GetCompletionsResponse,
} from "@/lib/constants/responses";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

export const useSingleUnit = (id: string) => {
  const { data: unitData, isLoading: isUnitLoading } =
    useSWR<GetSingleUnitResponse>(
      `/api/unit/${id}`,
      fetcher<GetSingleUnitResponse>
    );
  const { data: completionsResponse, isLoading: isCompletionLoading } =
    useSWR<GetCompletionsResponse>(
      `/api/completion`,
      fetcher<GetCompletionsResponse>
    );

  const unit = unitData?.unit;
  const completions = completionsResponse?.completions;
  const isLoading = isUnitLoading || isCompletionLoading;

  return { unit, completions, isLoading };
};
