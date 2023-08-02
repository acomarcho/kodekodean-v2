import { Unit, Module } from ".";

export type Course = {
  id: number;
  title: string;
  description: string;
  source: string;
  rank: number;
};

export type CourseWithUnits = Course & {
  units: Unit[];
};

export type CourseWithUnitsWithModules = Course & {
  units: (Unit & { modules: Module[] })[];
};

export type GetCoursesResponse = {
  courses: Course[];
};

export type GetSingleCourseResponse = {
  course: CourseWithUnitsWithModules | null;
};
