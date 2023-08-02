import type { NextApiRequest, NextApiResponse } from "next";
import type {
  GetSingleUnitResponse,
  ErrorResponse,
} from "@/lib/constants/responses";
import { prisma } from "@/lib/db";
import { checkAuth } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSingleUnitResponse | ErrorResponse>
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

    const unit = await prisma.unit.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        modules: {
          orderBy: {
            rank: "asc",
          },
        },
      },
    });

    if (!unit) {
      return res.status(200).json({ unit: null });
    } else {
      return res.status(200).json({ unit });
    }
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
