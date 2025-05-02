import type { APIRoute } from 'astro';
import redis from '@/lib/redis';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

interface RequestBody {
  itemId: string;
  action: 'increase' | 'decrease' | 'remove';
  userId: string;
  userEmail: string;
}

export const post: APIRoute = async ({ request }) => {
  console.log('Received request to update cart.');
  
  try {
    // Parse request body
    const body: RequestBody = await request.json();
    const { itemId, action, userId, userEmail } = body;
    
    // Validate request data
    if (!itemId) {
      return new Response(JSON.stringify({ error: 'Missing itemId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (!['increase', 'decrease', 'remove'].includes(action)) {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (!userId || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing userId or userEmail' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Get current cart from Redis
    const cartKey = `cart:${userId}:${userEmail}`;
    let cartItems: CartItem[] = [];
    
    try {
      const redisCart = await redis.get(cartKey);
      if (redisCart) {
        cartItems = JSON.parse(redisCart) as CartItem[];
      }
    } catch (redisError) {
      console.error('Error fetching cart from Redis:', redisError);
      return new Response(JSON.stringify({ error: 'Failed to retrieve cart data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Find the item in the cart
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    
    if (itemIndex === -1) {
      return new Response(JSON.stringify({ error: 'Item not found in cart' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Update the cart based on the action
    switch (action) {
      case 'increase':
        cartItems[itemIndex].quantity += 1;
        break;
        
      case 'decrease':
        if (cartItems[itemIndex].quantity > 1) {
          cartItems[itemIndex].quantity -= 1;
        } else {
          // Remove item if quantity would be 0
          cartItems.splice(itemIndex, 1);
        }
        break;
        
      case 'remove':
        cartItems.splice(itemIndex, 1);
        break;
    }
    
    // Save updated cart back to Redis
    try {
      await redis.set(cartKey, JSON.stringify(cartItems));
      
      return new Response(
        JSON.stringify({ 
          message: 'Cart updated successfully',
          action,
          itemId,
          cartItems
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } catch (saveError) {
      console.error('Error saving cart to Redis:', saveError);
      return new Response(JSON.stringify({ error: 'Failed to save cart updates' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error processing cart update:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid request or server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};