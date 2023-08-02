import type { NextApiRequest, NextApiResponse } from "next";
import type { LoginRequest } from "@/lib/constants/requests";
import type { LoginResponse, ErrorResponse } from "@/lib/constants/responses";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { verify } from "hcaptcha";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method tidak diperbolehkan." });
  }

  const request: LoginRequest = req.body;
  if (!request.email) {
    return res.status(400).json({ message: "Email wajib diisi." });
  }
  if (!request.password) {
    return res.status(400).json({ message: "Password wajib diisi." });
  }
  if (!request.token) {
    return res.status(400).json({ message: "Token wajib diisi." });
  }

  try {
    const { success } = await verify(
      process.env.HCAPTCHA_SECRET || "kodekodean",
      request.token
    );
    if (!success) {
      return res.status(400).json({ message: "Token hCaptcha tidak valid." });
    }

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

    const token = jwt.encode(user, process.env.JWT_SECRET || "kodekodean");

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
