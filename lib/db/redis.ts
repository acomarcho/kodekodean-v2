import { RedisClientType, createClient } from "redis";

export class RedisConnection {
  static instance: RedisClientType | undefined;

  static async getInstance() {
    if (!this.instance) {
      this.instance = createClient();
      await this.instance.connect();
    }
    return this.instance;
  }
}
