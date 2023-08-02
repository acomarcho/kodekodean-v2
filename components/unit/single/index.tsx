import { useContext } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import Unauthorized from "../../unauthorized";
import { LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import { useSingleUnit } from "@/lib/hooks/unit/use-single-unit";
import Link from "next/link";
import { useRouter } from "next/router";
import Accordion from "./accordion";

export default function SingleUnit() {
  const router = useRouter();
  const user = useContext(UserContext);
  const { unit, isLoading: isUnitLoading } = useSingleUnit(
    router.query.id as string
  );

  if (!user.isLoading && user.id === -1) {
    return <Unauthorized />;
  }

  const loadingFlag = user.isLoading || isUnitLoading;

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
        <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center">
          <div>
            <h1 className="heading text-white">
              Unit {unit.rank}: {unit.description}
            </h1>
            {/* <p className="paragraph text-lightgray">
              Anda sudah menyelesaikan 0/0 modul pada unit ini.
            </p> */}
          </div>
          <Image src="/images/course.png" alt="" height={180} width={564} />
        </div>
        <div className="grid grid-cols-1 gap-[1rem] mt-[2rem]">
          {unit.modules.map((module) => {
            return <Accordion key={module.id} module={module} />;
          })}
        </div>
      </>
    );
  };

  return (
    <div className="wrapper">
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      {renderUnit()}
    </div>
  );
}
