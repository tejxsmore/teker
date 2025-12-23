import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export async function handle({ event, resolve }) {
	if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
		return new Response(null, { status: 204 });
	}

	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	return svelteKitHandler({ event, resolve, auth });
}
