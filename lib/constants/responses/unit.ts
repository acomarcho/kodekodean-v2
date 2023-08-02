import { Module } from ".";

export type Unit = {
  id: number;
  courseId: number;
  description: string;
  rank: number;
};

export type UnitWithModules = Unit & {
  modules: Module[];
};

export type GetSingleUnitResponse = {
  unit: UnitWithModules | null;
};
