export type Course = {
  id: number;
  title: string;
  description: string;
  source: string;
  rank: number;
};

export type Unit = {
  id: number;
  courseId: number;
  description: string;
  rank: number;
};

export type CourseWithUnits = Course & {
  units: Unit[];
};

export type GetCoursesResponse = {
  courses: Course[];
};

export type GetSingleCourseResponse = {
  course: CourseWithUnits | null;
};