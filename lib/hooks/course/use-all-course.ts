import type { GetCoursesResponse } from "@/lib/constants/responses";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

export const useAllCourse = () => {
  const { data, isLoading } = useSWR<GetCoursesResponse>(
    "/api/course",
    fetcher<GetCoursesResponse>
  );

  const courses = data?.courses;

  return { courses, isLoading };
};
