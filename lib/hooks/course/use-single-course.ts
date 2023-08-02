import type {
  CourseWithUnits,
  GetSingleCourseResponse,
} from "@/lib/constants/responses";
import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleCourse = (id: string) => {
  const [course, setCourse] = useState<CourseWithUnits | null>(null);
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
      } catch (error) {
        setCourse(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { course, isLoading };
};
