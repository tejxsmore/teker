import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) {
		throw redirect(302, '/auth/signin');
	}
	const userId = session.user.id;
};
