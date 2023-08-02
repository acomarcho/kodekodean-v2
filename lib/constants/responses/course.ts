export type Course = {
  id: number;
  title: string;
  description: string;
  source: string;
  rank: number;
};

export type GetCoursesResponse = {
  courses: Course[];
};
