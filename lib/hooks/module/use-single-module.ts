import type { GetSingleModuleResponse } from "@/lib/constants/responses";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

export const useSingleModule = (id: string) => {
  const { data: moduleData, isLoading } = useSWR<GetSingleModuleResponse>(
    `/api/module/${id}`,
    fetcher<GetSingleModuleResponse>
  );

  const myModule = moduleData?.module;

  return { module: myModule, isLoading };
};
