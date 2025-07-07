import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { products } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
	const items = await db.select().from(products);

	return {
		items
	};
};
