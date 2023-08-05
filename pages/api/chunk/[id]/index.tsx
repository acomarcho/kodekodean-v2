import type { NextApiRequest, NextApiResponse } from "next";
import type {
  Chunk,
  GetSingleChunkResponse,
  ErrorResponse,
} from "@/lib/constants/responses";
import { prisma, redis } from "@/lib/db";
import { checkAuth } from "@/lib/utils";
import fs from "fs/promises";
import path from "path";
import { DEFAULT_EXPIRATION } from "@/lib/constants/redis";

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

    const redisClient = await redis.getInstance();
    const redisKey = `chunk:${id}`;
    const cachedData = await redisClient.get(redisKey);
    let chunk: Chunk | null;

    if (!cachedData) {
      chunk = await prisma.chunk.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!chunk) {
        await redisClient.setEx(
          redisKey,
          DEFAULT_EXPIRATION,
          JSON.stringify(chunk)
        );
        return res.status(200).json({ chunk: null });
      }

      const fileContent = await fs.readFile(
        path.resolve("./public", "content", chunk.content),
        "utf-8"
      );

      chunk.content = fileContent;

      await redisClient.setEx(
        redisKey,
        DEFAULT_EXPIRATION,
        JSON.stringify(chunk)
      );
    } else {
      chunk = JSON.parse(cachedData);
    }

    return res.status(200).json({ chunk });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
