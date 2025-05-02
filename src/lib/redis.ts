// src/lib/redis.ts
import { createClient } from 'redis';

const redis = createClient({
  url: import.meta.env.REDIS_URL,
  password: import.meta.env.REDIS_PASSWORD,
});

redis.on('error', (err) => console.error('Redis Client Error', err));

await redis.connect();

export default redis;