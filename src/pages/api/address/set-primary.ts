import type { APIRoute } from 'astro';
import { getSupabase } from '@/lib/supabase';

export const PATCH: APIRoute = async (context) => {
  try {
    const user = await context.locals?.currentUser?.();
    const userId = user?.id;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id: newPrimaryId } = await context.request.json();

    if (!newPrimaryId) {
      return new Response(JSON.stringify({ error: 'Missing address ID' }), { status: 400 });
    }

    const supabase = getSupabase();

    // Step 1: Unmark previous primary address
    const { error: unmarkError } = await supabase
      .from('addresses')
      .update({ is_primary: false })
      .eq('user_id', userId)
      .eq('is_primary', true);

    if (unmarkError) {
      console.error('Unmark error:', unmarkError);
      return new Response(JSON.stringify({ error: 'Failed to unmark previous primary' }), { status: 500 });
    }

    // Step 2: Mark new address as primary
    const { error: setError } = await supabase
      .from('addresses')
      .update({ is_primary: true })
      .match({ address_id: newPrimaryId, user_id: userId });

    if (setError) {
      console.error('Set primary error:', setError);
      return new Response(JSON.stringify({ error: 'Failed to set primary address' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Server Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};