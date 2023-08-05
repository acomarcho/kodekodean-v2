import type { NextApiRequest, NextApiResponse } from "next";
import type {
  Course,
  GetCoursesResponse,
  ErrorResponse,
} from "@/lib/constants/responses";
import { prisma, redis } from "@/lib/db";
import { checkAuth } from "@/lib/utils";
import { DEFAULT_EXPIRATION } from "@/lib/constants/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetCoursesResponse | ErrorResponse>
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

    if (!user) {
      return res.status(401).json({ message: "Identitas Anda salah." });
    }

    const redisClient = await redis.getInstance();
    const cachedData = await redisClient.get("courses");
    let courses: Course[] = [];

    if (!cachedData) {
      courses = await prisma.course.findMany({
        orderBy: { rank: "asc" },
      });
      await redisClient.setEx(
        "courses",
        DEFAULT_EXPIRATION,
        JSON.stringify(courses)
      );
    } else {
      courses = JSON.parse(cachedData);
    }

    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
