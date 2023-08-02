import { prisma } from "../db";
import jwt from "jwt-simple";
import type { User } from "../constants/responses";

export const extractToken = (authHeader: string) => {
  return authHeader.split(" ")[1];
};

export const checkAuth = async (authHeader: string) => {
  const token = extractToken(authHeader);

  let decodedJwt: User;
  try {
    decodedJwt = jwt.decode(token, process.env.JWT_SECRET || "kodekodean");
  } catch (error) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: decodedJwt!.email,
    },
  });
  if (!user) {
    return null;
  }

  return decodedJwt;
};
