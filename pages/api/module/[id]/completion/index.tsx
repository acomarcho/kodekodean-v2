import type { NextApiRequest, NextApiResponse } from "next";
import type {
  PutCompletionResponse,
  ErrorResponse,
} from "@/lib/constants/responses";
import { prisma } from "@/lib/db";
import { checkAuth } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PutCompletionResponse | ErrorResponse>
) {
  if (req.method !== "PUT") {
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

    let completion = await prisma.completion.findUnique({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: parseInt(id),
        },
      },
    });

    if (completion) {
      return res.status(200).json({ completion });
    } else {
      completion = await prisma.completion.create({
        data: {
          userId: user.id,
          moduleId: parseInt(id),
        },
      });
      return res.status(200).json({ completion });
    }
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
