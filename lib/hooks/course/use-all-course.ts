import type { Course, GetCoursesResponse } from "@/lib/constants/responses";
import { useState, useEffect } from "react";
import axios from "axios";

export const useAllCourse = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<GetCoursesResponse>("/api/course", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        setCourses(data.courses);
      } catch (error) {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { courses, isLoading };
};
