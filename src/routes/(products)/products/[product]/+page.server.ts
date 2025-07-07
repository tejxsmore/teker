import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { products } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const { product } = params;
	const item = await db.select().from(products).where(eq(products.slug, product));

	return {
		item: item[0]
	};
};
