import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { brands } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const item = await db.select().from(brands);

	return {
		brands: item
	};
};
