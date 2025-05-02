import type { APIRoute } from 'astro';
import redis from '@/lib/redis';

// Define types for Cart Item and Request Body
interface CartItem {
  id: string;
  name: string;
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
  console.log('1. Received request to update cart.');
  try {
    console.log('2. Attempting to parse request body.');
    const body: RequestBody = await request.json();
    const { itemId, action, userId, userEmail } = body;
    console.log('3. Request body parsed successfully:', { itemId, action, userId, userEmail });

    // Validate action type
    if (!['increase', 'decrease', 'remove'].includes(action)) {
      console.log('4. Invalid action:', action);
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log('5. Action is valid:', action);

    // Validate userId and userEmail (basic check)
    if (!userId || !userEmail) {
      console.log('6. Missing userId or userEmail:', { userId, userEmail });
      return new Response(JSON.stringify({ error: 'Missing userId or userEmail' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log('7. userId and userEmail are present.');

    // Get the cart from Redis
    const key = `cart:${userId}:${userEmail}`;
    console.log('8. Redis key generated:', key);
    let cartItems: CartItem[] = [];
    try {
      console.log('9. Attempting to fetch cart from Redis.');
      const redisCart = await redis.get(key);
      console.log('10. Result from Redis get:', redisCart);
      if (redisCart) {
        console.log('11. Cart data found in Redis. Attempting to parse.');
        try {
          cartItems = JSON.parse(redisCart) as CartItem[];
          console.log('12. Cart data parsed successfully:', cartItems);
        } catch (parseError) {
          console.error('13. Error parsing cart from Redis:', parseError);
          return new Response(
            JSON.stringify({ error: 'Error parsing cart data' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } else {
        console.log('14. No cart found in Redis. Initializing an empty cart.');
        cartItems = [];
      }
    } catch (redisError) {
      console.error('15. Error fetching cart from Redis:', redisError);
      return new Response(
        JSON.stringify({ error: 'Error fetching cart data' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the item index in the cart
    console.log('16. Searching for item in cart with itemId:', itemId);
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    console.log('17. Item index found:', itemIndex);

    // Handle actions
    if (action === 'increase') {
      console.log('18. Performing "increase" action.');
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += 1;
        console.log('19. Item quantity increased. Updated cart:', cartItems);
      } else {
        console.log('20. Item not found in cart for increase.');
        return new Response(
          JSON.stringify({ error: 'Item not found in cart for increase' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else if (action === 'decrease') {
      console.log('21. Performing "decrease" action.');
      if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity > 1) {
          cartItems[itemIndex].quantity -= 1;
          console.log('22. Item quantity decreased. Updated cart:', cartItems);
        } else {
          cartItems.splice(itemIndex, 1);
          console.log('23. Item removed due to quantity reaching 1. Updated cart:', cartItems);
        }
      } else {
        console.log('24. Item not found in cart for decrease.');
        return new Response(
          JSON.stringify({ error: 'Item not found in cart for decrease' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else if (action === 'remove') {
      console.log('25. Performing "remove" action.');
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        console.log('26. Item removed from cart. Updated cart:', cartItems);
      } else {
        console.log('27. Item not found in cart for remove.');
        return new Response(
          JSON.stringify({ error: 'Item not found in cart for remove' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Save the updated cart to Redis
    console.log('28. Attempting to save updated cart to Redis:', cartItems);
    try {
      await redis.set(key, JSON.stringify(cartItems));
      console.log('29. Cart saved to Redis successfully.');
      return new Response(
        JSON.stringify({ message: 'Cart updated successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (saveError) {
      console.error('30. Error saving cart to Redis:', saveError);
      return new Response(
        JSON.stringify({ error: 'Error saving updated cart' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('31. Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};