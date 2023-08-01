import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ErrorResponse,
  User,
  GetUserResponse,
} from "@/lib/constants/responses";
import jwt from "jwt-simple";
import { extractToken } from "@/lib/utils";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method tidak diperbolehkan." });
  }

  const headers = req.headers;
  if (!headers.authorization) {
    return res.status(401).json({ message: "Identitas Anda salah." });
  }

  try {
    const token = extractToken(headers.authorization);

    let decodedJwt: User;
    try {
      decodedJwt = jwt.decode(token, process.env.JWT_SECRET || "kodekodean");
    } catch (error) {
      return res.status(401).json({ message: "Identitas Anda salah." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: decodedJwt!.email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Identitas Anda salah." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
