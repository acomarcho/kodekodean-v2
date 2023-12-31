import type { NextApiRequest, NextApiResponse } from "next";
import type { RegisterRequest } from "@/lib/constants/requests";
import type {
  RegisterResponse,
  ErrorResponse,
} from "@/lib/constants/responses";
import bcrypt from "bcrypt";
import { verify } from "hcaptcha";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method tidak diperbolehkan." });
  }

  const request: RegisterRequest = req.body;
  if (!request.name) {
    return res.status(400).json({ message: "Nama wajib diisi." });
  }
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
    if (user) {
      return res.status(400).json({ message: "Email sudah digunakan." });
    }

    const encryptedPassword = await bcrypt.hash(request.password, 12);

    await prisma.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: encryptedPassword,
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan pada sistem." });
  }
}
