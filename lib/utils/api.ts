import { prisma } from "../db";
import jwt from "jwt-simple";
import type { User } from "../constants/responses";
import { RedisConnection } from "@/lib/db/redis";
import { DEFAULT_EXPIRATION } from "@/lib/constants/redis";

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

  const redisClient = await RedisConnection.getInstance();
  const redisKey = `user:${decodedJwt.email}`;
  const cachedData = await redisClient.get(redisKey);

  let user: User | null;

  if (!cachedData) {
    user = await prisma.user.findUnique({
      where: {
        email: decodedJwt!.email,
      },
    });
    await redisClient.setEx(redisKey, DEFAULT_EXPIRATION, JSON.stringify(user));
  } else {
    user = JSON.parse(cachedData);
  }

  if (!user) {
    return null;
  }

  return user;
};
