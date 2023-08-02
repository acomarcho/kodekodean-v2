import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ErrorResponse,
  GetCompletionsResponse,
} from "@/lib/constants/responses";
import { checkAuth } from "@/lib/utils";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetCompletionsResponse | ErrorResponse>
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

    const completions = await prisma.completion.findMany({
      where: {
        userId: user.id,
      },
    });

    res.status(200).json({ completions });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
