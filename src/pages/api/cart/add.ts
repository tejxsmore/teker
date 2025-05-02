import { randomUUID } from 'crypto';
import type { APIRoute } from 'astro';
import redis from '@/lib/redis';

export const POST: APIRoute = async (context) => {
  try {
    const user = await context.locals?.currentUser?.();
    const userId = user?.id;
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userId || !userEmail) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { product } = await context.request.json();

    if (!product || !product.slug) {
      return new Response(JSON.stringify({ error: 'Invalid product data' }), { status: 400 });
    }

    const key = `cart:${userId}:${userEmail}`;
    const existing = JSON.parse((await redis.get(key)) || '[]');
    const productId = product.id || randomUUID();  

    const index = existing.findIndex((p: any) => p.slug === product.slug);
    if (index > -1) {
      existing[index].quantity += 1;
    } else {
      existing.push({ ...product, id: productId, quantity: 1 }); 
    }

    await redis.set(key, JSON.stringify(existing));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Cart Add Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};