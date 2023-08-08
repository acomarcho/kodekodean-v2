import type {
  GetSingleCourseResponse,
  GetCompletionsResponse,
} from "@/lib/constants/responses";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

export const useSingleCourse = (id: string) => {
  const { data: courseResponse, isLoading: isCourseLoading } =
    useSWR<GetSingleCourseResponse>(
      `/api/course/${id}`,
      fetcher<GetSingleCourseResponse>
    );
  const { data: completionsResponse, isLoading: isCompletionLoading } =
    useSWR<GetCompletionsResponse>(
      `/api/completion`,
      fetcher<GetCompletionsResponse>
    );

  const course = courseResponse?.course;
  const completions = completionsResponse?.completions;
  const isLoading = isCourseLoading || isCompletionLoading;

  return { course, completions, isLoading };
};
