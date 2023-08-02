import { useContext } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import Unauthorized from "../../unauthorized";
import { LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import { useSingleCourse } from "@/lib/hooks/course/use-single-course";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SingleCourse() {
  const router = useRouter();
  const user = useContext(UserContext);
  const {
    course,
    completions,
    isLoading: isCourseLoading,
  } = useSingleCourse(router.query.id as string);

  if (!user.isLoading && user.id === -1) {
    return <Unauthorized />;
  }

  const loadingFlag = user.isLoading || isCourseLoading;

  const unitCompletionData =
    course?.units.map((unit) => {
      return {
        moduleCount: unit.modules.length,
        completedCount:
          completions?.filter((completion) =>
            unit.modules.find((module) => module.id === completion.moduleId)
          ).length || 0,
      };
    }) || [];

  const renderCourse = () => {
    if (loadingFlag) {
      return <></>;
    }

    if (!course) {
      return (
        <>
          <h1 className="heading text-white">Course tidak ditemukan!</h1>
          <Link
            href="/course"
            className="button-primary mt-[1rem] inline-block"
          >
            Lihat semua course yang ada
          </Link>
        </>
      );
    }

    return (
      <>
        <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center">
          <div>
            <h1 className="heading text-white">{course.title}</h1>
          </div>
          <Image src="/images/course.png" alt="" height={180} width={564} />
        </div>
        <div className="grid grid-cols-1 gap-[1rem] lg:grid-cols-2 mt-[2rem]">
          {course.units.map((unit, idx) => {
            return (
              <div
                key={unit.id}
                className="bg-darkgray p-[2rem] flex flex-col justify-between gap-[2rem]"
              >
                <div className="flex flex-col gap-[0.5rem]">
                  <h1 className="heading text-white">Unit {unit.rank}</h1>
                  <p className="paragraph text-lightgray">{unit.description}</p>
                  {unitCompletionData[idx].completedCount ===
                  unitCompletionData[idx].moduleCount ? (
                    <p className="paragraph text-green">
                      {unitCompletionData[idx].completedCount}/
                      {unitCompletionData[idx].moduleCount} modul sudah Anda
                      selesaikan
                    </p>
                  ) : (
                    <p className="paragraph text-yellow">
                      {unitCompletionData[idx].completedCount}/
                      {unitCompletionData[idx].moduleCount} modul sudah Anda
                      selesaikan
                    </p>
                  )}
                </div>
                <Link
                  href={`/unit/${unit.id}`}
                  className="block button-secondary"
                >
                  Eksplorasi
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="wrapper">
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      {renderCourse()}
    </div>
  );
}
