import { useContext } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import Unauthorized from "../unauthorized";
import { LoadingOverlay } from "@mantine/core";
import Image from "next/image";

export default function Courses() {
  const user = useContext(UserContext);

  if (!user.isLoading && user.id === -1) {
    return <Unauthorized />;
  }

  const loadingFlag = user.isLoading;

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
    </div>
  );
}
