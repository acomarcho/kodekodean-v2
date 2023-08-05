import { PrismaClient } from "@prisma/client";
import { RedisClientType, createClient } from "redis";

class RedisConnection {
  instance: RedisClientType | undefined;

  async getInstance() {
    if (!this.instance) {
      this.instance = createClient();
      await this.instance.connect();
    }
    return this.instance;
  }
}

const globalForDB = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  redis: RedisConnection | undefined;
};

export const prisma = globalForDB.prisma ?? new PrismaClient();
export const redis = globalForDB.redis ?? new RedisConnection();

if (process.env.NODE_ENV !== "production") globalForDB.prisma = prisma;
if (process.env.NODE_ENV !== "production") globalForDB.redis = redis;
