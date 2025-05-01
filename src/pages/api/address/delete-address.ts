import type { APIRoute } from 'astro';
import { getSupabase } from '@/lib/supabase';

export const DELETE: APIRoute = async (context) => {
  try {
    const user = await context.locals?.currentUser?.();
    const userId = user?.id;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = await context.request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing address ID' }), { status: 400 });
    }

    const supabase = getSupabase();

    // Step 1: Fetch the address to check if it's primary
    const { data: address, error: fetchError } = await supabase
      .from('addresses')
      .select('is_primary')
      .eq('address_id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !address) {
      console.error('Address fetch error:', fetchError);
      return new Response(JSON.stringify({ error: 'Address not found' }), { status: 404 });
    }

    if (address.is_primary) {
      return new Response(
        JSON.stringify({ error: 'Primary address cannot be deleted' }),
        { status: 400 }
      );
    }

    // Step 2: Delete the address if it's not primary
    const { error: deleteError } = await supabase
      .from('addresses')
      .delete()
      .match({ address_id: id, user_id: userId });

    if (deleteError) {
      console.error('Supabase Delete Error:', deleteError);
      return new Response(JSON.stringify({ error: 'Failed to delete address' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Server Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};