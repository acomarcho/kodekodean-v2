import { useContext } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import Unauthorized from "../../unauthorized";
import { LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import { useSingleUnit } from "@/lib/hooks/unit/use-single-unit";
import { useSingleCourse } from "@/lib/hooks/course/use-single-course";
import Link from "next/link";
import { useRouter } from "next/router";
import Accordion from "./accordion";
import Head from "next/head";
import _ from "lodash";

export default function SingleUnit() {
  const router = useRouter();
  const user = useContext(UserContext);
  const {
    unit,
    completions,
    isLoading: isUnitLoading,
  } = useSingleUnit(router.query.id as string);
  const { course, isLoading: isCourseLoading } = useSingleCourse(
    (unit?.courseId && (unit?.courseId).toString()) || ""
  );

  if (!user.isLoading && user.id === -1) {
    return <Unauthorized />;
  }

  const loadingFlag = user.isLoading || isUnitLoading || isCourseLoading;

  const relevantCompletions =
    completions?.filter((completion) =>
      unit?.modules.find((module) => module.id === completion.moduleId)
    ) || [];

  const renderUnit = () => {
    if (loadingFlag) {
      return <></>;
    }

    if (!unit) {
      return (
        <>
          <h1 className="heading text-white">Unit tidak ditemukan!</h1>
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
        <Head>
          <title>
            Unit {unit.rank}: {unit.description}
          </title>
        </Head>
        <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center">
          <div>
            <h1 className="heading text-white">
              Unit {unit.rank}: {unit.description}
            </h1>
            <p className="paragraph text-lightgray">
              Anda sudah menyelesaikan {relevantCompletions.length}/
              {unit.modules.length} modul pada unit ini.
            </p>
          </div>
          <Image src="/images/course.png" alt="" height={180} width={564} />
        </div>
        <div className="grid grid-cols-1 gap-[1rem] mt-[2rem]">
          {unit.modules.map((module) => {
            return (
              <Accordion
                key={module.id}
                module={module}
                completed={
                  relevantCompletions.find(
                    (completion) => completion.moduleId == module.id
                  )
                    ? true
                    : false
                }
              />
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="wrapper">
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <div className="flex flex-wrap gap-[0.5rem] mb-[1rem]">
        <Link href="/course" className="paragraph text-white underline">
          Semua course
        </Link>
        <p>{">"}</p>
        <Link
          href={`/course/${unit?.courseId}`}
          className="paragraph text-white underline"
        >
          {_.truncate(course?.title || "", {
            length: 20,
          })}
        </Link>
        <p>{">"}</p>
        <Link
          href={`/unit/${router.query.id}`}
          className="paragraph text-white underline"
        >
          {_.truncate(unit?.description || "", {
            length: 20,
          })}
        </Link>
      </div>
      {renderUnit()}
    </div>
  );
}
