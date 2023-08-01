import type { NextApiRequest, NextApiResponse } from "next";
import type { LoginRequest } from "@/lib/constants/requests";
import type { LoginResponse, ErrorResponse } from "@/lib/constants/responses";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method tidak diperbolehkan." });
  }

  const request: LoginRequest = req.body;
  if (!request.email) {
    return res.status(400).json({ message: "Email wajib diisi." });
  }
  if (!request.password) {
    return res.status(400).json({ message: "Password wajib diisi." });
  }

  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Identitas Anda salah." });
    }

    const isAuthenticated = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isAuthenticated) {
      return res.status(401).json({ message: "Identitas Anda salah." });
    }

    return res.status(200).json({ token: "Test token" });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
