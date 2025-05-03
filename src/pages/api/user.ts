import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  try {
    const user = await context.locals?.currentUser?.();
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract and format the user data to return
    const userData = {
      userId: user.id,
      userEmail: user.emailAddresses?.[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      username: user.username,
      // Add any other properties you need
    };

    // Return the user data as JSON
    return new Response(
      JSON.stringify(userData),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('User API Error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};