import type {
  CourseWithUnitsWithModules,
  GetSingleCourseResponse,
  GetCompletionsResponse,
  Completion,
} from "@/lib/constants/responses";
import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleCourse = (id: string) => {
  const [course, setCourse] = useState<CourseWithUnitsWithModules | null>(null);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<GetSingleCourseResponse>(
          `/api/course/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        setCourse(data.course);

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
        setCourse(null);
        setCompletions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { course, completions, isLoading };
};
