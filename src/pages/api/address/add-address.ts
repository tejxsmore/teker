import type { APIRoute } from 'astro';
import { getSupabase } from '@/lib/supabase';

export const POST: APIRoute = async (context) => {
  try {
    const user = await context.locals?.currentUser?.();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await context.request.json();
    const { title, line1, line2, city, state, pincode } = body;

    if (!title || !line1 || !city || !state || !pincode) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const supabase = getSupabase();

    // Check if user already exists in 'users' table
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (userError) {
      console.error('Supabase User Query Error:', userError);
      return new Response(JSON.stringify({ error: 'Database Query Failed' }), { status: 500 });
    }

    // Insert user if not exists
    if (!existingUser) {
      const { error: insertUserError } = await supabase.from('users').insert([
        {
          user_id: user.id,
          username: user.username ?? null,
          email: user.emailAddresses?.[0]?.emailAddress ?? null,
          first_name: user.firstName ?? null,
          last_name: user.lastName ?? null,
          phone_number: user.phoneNumbers?.[0]?.phoneNumber ?? null,
        },
      ]);

      if (insertUserError) {
        console.error('Supabase User Insert Error:', insertUserError);
        return new Response(JSON.stringify({ error: 'User Insert Failed' }), { status: 500 });
      }
    }

    // Insert address
    const { error: insertAddressError } = await supabase.from('addresses').insert([
      {
        user_id: user.id,
        address_title: title,
        address_line1: line1,
        address_line2: line2 ?? null,
        city,
        state,
        pincode,
      },
    ]);

    if (insertAddressError) {
      console.error('Supabase Insert Address Error:', insertAddressError);
      return new Response(JSON.stringify({ error: 'Database Insert Failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Server Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};