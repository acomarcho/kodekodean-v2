import { useState, useContext } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import Unauthorized from "../unauthorized";
import { LoadingOverlay } from "@mantine/core";
import { useSingleModule } from "@/lib/hooks/module/use-single-module";
import { useSingleChunk } from "@/lib/hooks/chunk/use-single-chunk";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../navbar";

export default function SingleModule() {
  const router = useRouter();
  const user = useContext(UserContext);
  const { module, isLoading: isModuleLoading } = useSingleModule(
    router.query.id as string
  );
  const [chunkId, setChunkId] = useState(1);
  const { chunk, isLoading: isChunkLoading } = useSingleChunk(
    chunkId.toString()
  );

  if (!user.isLoading && user.id === -1) {
    return (
      <>
        <Navbar />
        <Unauthorized />;
      </>
    );
  }

  const loadingFlag = user.isLoading || isModuleLoading || isChunkLoading;

  return (
    <div className="wrapper">
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <p className="paragraph text-white">{JSON.stringify(module)}</p>
      <p className="paragraph text-white">{JSON.stringify(chunk)}</p>
    </div>
  );
}
