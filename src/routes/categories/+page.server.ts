import { category } from '$lib/db/schema';
import { db } from '$lib/db';
import { isNull, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Create alias for self-join
	const childCategory = alias(category, 'child_category');

	// Fetch parent categories with their children
	const categoriesWithChildren = await db
		.select({
			id: category.id,
			name: category.name,
			slug: category.slug,
			icon: category.icon,
			description: category.description,
			displayOrder: category.displayOrder,
			childId: childCategory.id,
			childName: childCategory.name,
			childSlug: childCategory.slug,
			childDisplayOrder: childCategory.displayOrder
		})
		.from(category)
		.leftJoin(childCategory, eq(childCategory.parentId, category.id))
		.where(isNull(category.parentId))
		.orderBy(category.displayOrder, childCategory.displayOrder);

	// Group children under their parent categories
	const categoriesMap = new Map();

	for (const row of categoriesWithChildren) {
		if (!categoriesMap.has(row.id)) {
			categoriesMap.set(row.id, {
				id: row.id,
				name: row.name,
				slug: row.slug,
				icon: row.icon,
				description: row.description,
				displayOrder: row.displayOrder,
				children: []
			});
		}

		if (row.childId) {
			categoriesMap.get(row.id).children.push({
				id: row.childId,
				name: row.childName,
				slug: row.childSlug,
				displayOrder: row.childDisplayOrder
			});
		}
	}

	const categories = Array.from(categoriesMap.values());

	return {
		categories
	};
};
