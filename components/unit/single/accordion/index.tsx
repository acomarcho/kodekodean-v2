import { Module } from "@/lib/constants/responses";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function Accordion({ module }: { module: Module }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="px-[2rem] py-[1rem] bg-darkgray">
      <div className="flex justify-between items-center">
        <h1 className="heading text-white max-w-[75%]">
          #{module.rank}. {module.title}
        </h1>
        <button
          style={{
            rotate: isOpen ? "180deg" : "0deg",
          }}
          className="transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconChevronDown />
        </button>
      </div>
      <div
        className="transition-all overflow-hidden"
        style={{
          maxHeight: isOpen ? "80rem" : "0rem",
        }}
      >
        <div className="py-[1rem]">
          <p className="paragraph text-lightgray">{module.description}</p>
          <Link
            href={`/module/${module.id}`}
            className="button-primary block mt-[1rem]"
          >
            Lihat materi
          </Link>
        </div>
      </div>
    </div>
  );
}
