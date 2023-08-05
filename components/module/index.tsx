import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import Unauthorized from "../unauthorized";
import { LoadingOverlay } from "@mantine/core";
import { useSingleModule } from "@/lib/hooks/module/use-single-module";
import { useSingleChunk } from "@/lib/hooks/chunk/use-single-chunk";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../navbar";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useViewportSize } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import MarkdownRenderer from "./markdown-renderer";
import axios from "axios";

export default function SingleModule() {
  const router = useRouter();
  const user = useContext(UserContext);
  const { module, isLoading: isModuleLoading } = useSingleModule(
    router.query.id as string
  );
  const [chunkIdx, setChunkIdx] = useState(0);
  const { chunk, isLoading: isChunkLoading } = useSingleChunk(
    module?.chunks[chunkIdx]?.id.toString() || ""
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const { height, width } = useViewportSize();
  useEffect(() => {
    setNavHeight(navRef.current?.getBoundingClientRect().height || 0);
    setFooterHeight(footerRef.current?.getBoundingClientRect().height || 0);
  }, [
    navRef,
    height,
    width,
    user.isLoading,
    isModuleLoading,
    isChunkLoading,
    isSaving,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const chunkIdx = params.get("chunkIdx");
    if (chunkIdx !== null) {
      setChunkIdx(parseInt(chunkIdx));
    }
  }, [router]);

  if (!user.isLoading && user.id === -1) {
    return (
      <>
        <Navbar />
        <Unauthorized />;
      </>
    );
  }

  if (!module && !isModuleLoading) {
    return (
      <>
        <Navbar />
        <div className="wrapper">
          <h1 className="heading text-white">Modul tidak ditemukan!</h1>
          <Link
            href="/course"
            className="button-primary mt-[1rem] inline-block"
          >
            Lihat semua course yang ada
          </Link>
        </div>
      </>
    );
  }

  const loadingFlag =
    user.isLoading || isModuleLoading || isChunkLoading || isSaving;

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-darkgray z-10" ref={navRef}>
        <div className="wrapper">
          <div className="flex justify-between items-center">
            <h1 className="heading text-white max-w-[75%]">
              {module?.title ?? ""}
            </h1>
            <button onClick={() => setIsDrawerOpen(true)}>
              <IconMenu2 size={32} />
            </button>
          </div>
        </div>
      </div>
      <Drawer
        opened={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        withCloseButton={false}
        position="right"
      >
        <div className="p-[1rem] flex flex-col gap-[1rem]">
          <button onClick={() => setIsDrawerOpen(false)}>
            <IconX size={32} />
          </button>
          {module?.chunks.map((chunk, idx) => {
            if (idx <= chunkIdx) {
              return (
                <button
                  key={chunk.id}
                  className="button-primary w-full"
                  onClick={() => {
                    setChunkIdx(idx);
                    setIsDrawerOpen(false);
                    window.scrollTo({ top: 0 });
                    router.push(
                      `/module/${module.id}`,
                      `/module/${module.id}?chunkIdx=${idx}`,
                      {
                        shallow: true,
                      }
                    );
                  }}
                >
                  {chunk.rank}. {chunk.title}
                </button>
              );
            } else {
              return (
                <button
                  key={chunk.id}
                  className="button-secondary w-full"
                  onClick={() => {
                    setChunkIdx(idx);
                    setIsDrawerOpen(false);
                    window.scrollTo({ top: 0 });
                    router.push(
                      `/module/${module.id}`,
                      `/module/${module.id}?chunkIdx=${idx}`,
                      {
                        shallow: true,
                      }
                    );
                  }}
                >
                  {chunk.rank}. {chunk.title}
                </button>
              );
            }
          }) || ""}
          <Link
            href={`/unit/${module?.unitId}`}
            className="button-secondary w-full"
          >
            Kembali ke unit
          </Link>
        </div>
      </Drawer>
      <div style={{ marginTop: `${navHeight}px` }} />
      <div className="wrapper">
        <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
        <h1 className="heading text-white">
          {(chunk?.rank && `${chunk?.rank}. ${chunk?.title}`) ||
            "Chunk tidak ditemukan"}
        </h1>
        <MarkdownRenderer>{chunk?.content || ""}</MarkdownRenderer>
      </div>
      <div style={{ marginBottom: `${footerHeight}px` }} />
      <div
        className="fixed bottom-0 left-0 right-0 bg-darkgray"
        ref={footerRef}
      >
        <div className="max-w-[1160px] mx-auto px-[2rem] py-[1rem] flex justify-between">
          <button
            className="button-primary"
            disabled={chunkIdx === 0 || isChunkLoading}
            onClick={() => {
              setChunkIdx(chunkIdx - 1);
              window.scrollTo({ top: 0 });
              router.push(
                `/module/${module?.id}`,
                `/module/${module?.id}?chunkIdx=${chunkIdx - 1}`,
                {
                  shallow: true,
                }
              );
            }}
          >
            Kembali
          </button>
          <button
            className="button-primary"
            onClick={() => {
              if (
                module?.chunks.length &&
                chunkIdx === module?.chunks.length - 1
              ) {
                const put = async () => {
                  try {
                    setIsSaving(true);
                    await axios.put(
                      `/api/module/${module?.id}/completion`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${
                            localStorage.getItem("token") ?? ""
                          }`,
                        },
                      }
                    );
                  } catch (error) {
                  } finally {
                    setIsSaving(false);
                    router.push(`/unit/${module?.unitId}`);
                  }
                };

                put();
              } else {
                setChunkIdx(chunkIdx + 1);
                window.scrollTo({ top: 0 });
                router.push(
                  `/module/${module?.id}`,
                  `/module/${module?.id}?chunkIdx=${chunkIdx + 1}`,
                  {
                    shallow: true,
                  }
                );
              }
            }}
            disabled={isChunkLoading}
          >
            {module?.chunks.length && chunkIdx === module?.chunks.length - 1
              ? "Selesai"
              : "Lanjut"}
          </button>
        </div>
      </div>
    </>
  );
}
