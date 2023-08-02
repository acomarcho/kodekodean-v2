import type { NextApiRequest, NextApiResponse } from "next";
import type {
  GetSingleChunkResponse,
  ErrorResponse,
} from "@/lib/constants/responses";
import { prisma } from "@/lib/db";
import { checkAuth } from "@/lib/utils";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSingleChunkResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method tidak diperbolehkan." });
  }

  const headers = req.headers;
  if (!headers.authorization) {
    return res.status(401).json({ message: "Identitas Anda salah." });
  }

  try {
    const user = await checkAuth(headers.authorization);

    const id = req.query.id as string;

    if (!user) {
      return res.status(401).json({ message: "Identitas Anda salah." });
    }

    const chunk = await prisma.chunk.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!chunk) {
      return res.status(200).json({ chunk: null });
    }

    const fileContent = await fs.readFile(
      path.resolve("./public", "content", chunk.content),
      "utf-8"
    );

    chunk.content = fileContent;

    return res.status(200).json({ chunk });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
