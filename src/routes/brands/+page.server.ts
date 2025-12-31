import { brand } from '$lib/db/schema';
import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const brands = await db
		.select({
			id: brand.id,
			name: brand.name,
			slug: brand.slug
		})
		.from(brand);

	return {
		brands
	};
};
