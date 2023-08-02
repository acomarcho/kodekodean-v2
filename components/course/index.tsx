import { useContext } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import Unauthorized from "../unauthorized";
import { LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import { useAllCourse } from "@/lib/hooks/course/use-all-course";
import Link from "next/link";

export default function Courses() {
  const user = useContext(UserContext);
  const { courses, isLoading: isCourseLoading } = useAllCourse();

  if (!user.isLoading && user.id === -1) {
    return <Unauthorized />;
  }

  const loadingFlag = user.isLoading || isCourseLoading;

  return (
    <div className="wrapper">
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center">
        <div>
          <h1 className="heading text-white">
            Ingin <span className="text-purple">belajar apa</span> Anda hari
            ini?
          </h1>
          <p className="paragraph text-lightgray mt-[0.5rem]">
            Halo <span className="text-yellow">{user.name}</span>! Yuk, pilih
            salah satu dari <span className="italic">pathway</span> yang kami
            sediakan!
          </p>
        </div>
        <Image src="/images/course.png" alt="" height={180} width={564} />
      </div>
      <div className="grid grid-cols-1 gap-[1rem] lg:grid-cols-2 mt-[2rem]">
        {courses.map((course) => {
          return (
            <div
              key={course.id}
              className="bg-darkgray p-[2rem] flex flex-col justify-between gap-[2rem]"
            >
              <div className="flex flex-col gap-[0.5rem]">
                <h1 className="heading text-white">{course.title}</h1>
                <p className="paragraph text-lightgray">{course.description}</p>
                <p className="paragraph text-green">
                  Materi diambil dari mata kuliah {course.source}
                </p>
              </div>
              <Link
                href={`/course/${course.id}`}
                className="block button-secondary"
              >
                Mulai belajar
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
