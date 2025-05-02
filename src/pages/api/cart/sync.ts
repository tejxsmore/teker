// src/pages/api/cart/sync.ts
import type { APIRoute } from "astro";
import redis from '@/lib/redis'; // ✅ Import the singleton Redis client

export const GET: APIRoute = async ({ cookies }) => {
  const userId = cookies.get('user_id')?.value;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const redisCart = await redis.get(`cart:${userId}`);
    return new Response(redisCart || "[]", {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Redis fetch error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};