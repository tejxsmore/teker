import { relations } from 'drizzle-orm';
import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
	decimal,
	jsonb,
	index,
	uniqueIndex,
	pgEnum,
	serial
} from 'drizzle-orm/pg-core';

// ============ ENUMS ============
export const orderStatusEnum = pgEnum('order_status', [
	'pending',
	'confirmed',
	'processing',
	'shipped',
	'out_for_delivery',
	'delivered',
	'cancelled',
	'refunded',
	'returned'
]);

export const paymentStatusEnum = pgEnum('payment_status', [
	'pending',
	'processing',
	'completed',
	'failed',
	'refunded',
	'partially_refunded'
]);

export const paymentMethodEnum = pgEnum('payment_method', [
	'cod',
	'upi',
	'card',
	'netbanking',
	'wallet',
	'emi'
]);

export const returnStatusEnum = pgEnum('return_status', [
	'requested',
	'approved',
	'rejected',
	'picked_up',
	'completed',
	'cancelled'
]);

export const userRoleEnum = pgEnum('user_role', ['customer', 'admin', 'vendor', 'support']);

export const notificationTypeEnum = pgEnum('notification_type', [
	'order_update',
	'order_delivered',
	'order_cancelled',
	'payment_success',
	'payment_failed',
	'offer',
	'product_back_in_stock',
	'price_drop',
	'review_reminder',
	'return_update',
	'general'
]);

// ============ USER & AUTH TABLES ============
export const user = pgTable(
	'user',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(),
		email: text('email').notNull().unique(),
		emailVerified: boolean('email_verified').default(false).notNull(),
		image: text('image'),
		phone: text('phone'),
		phoneVerified: boolean('phone_verified').default(false),
		role: userRoleEnum('role').default('customer').notNull(),
		isActive: boolean('is_active').default(true).notNull(),
		lastLoginAt: timestamp('last_login_at'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('user_email_idx').on(table.email),
		index('user_phone_idx').on(table.phone),
		index('user_role_idx').on(table.role)
	]
);

export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at').notNull(),
		token: text('token').notNull().unique(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' })
	},
	(table) => [
		index('session_userId_idx').on(table.userId),
		index('session_token_idx').on(table.token)
	]
);

export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at'),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
		scope: text('scope'),
		password: text('password'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('account_userId_idx').on(table.userId),
		uniqueIndex('account_provider_accountId_unique').on(table.providerId, table.accountId)
	]
);

export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)]
);

// ============ CATEGORY & BRAND TABLES ============
export const category = pgTable(
	'category',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(),
		slug: text('slug').notNull().unique(),
		description: text('description'),
		image: text('image'),
		icon: text('icon'),
		parentId: text('parent_id'),
		isActive: boolean('is_active').default(true).notNull(),
		displayOrder: integer('display_order').default(0).notNull(),
		metaTitle: text('meta_title'),
		metaDescription: text('meta_description'),
		metaKeywords: text('meta_keywords').array(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('category_parentId_idx').on(table.parentId),
		index('category_slug_idx').on(table.slug),
		index('category_isActive_idx').on(table.isActive),
		index('category_displayOrder_idx').on(table.displayOrder)
	]
);

export const brand = pgTable(
	'brand',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull().unique(),
		slug: text('slug').notNull().unique(),
		logo: text('logo'),
		banner: text('banner'),
		description: text('description'),
		website: text('website'),
		isActive: boolean('is_active').default(true).notNull(),
		isFeatured: boolean('is_featured').default(false).notNull(),
		displayOrder: integer('display_order').default(0).notNull(),
		metaTitle: text('meta_title'),
		metaDescription: text('meta_description'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('brand_slug_idx').on(table.slug),
		index('brand_isActive_idx').on(table.isActive),
		index('brand_isFeatured_idx').on(table.isFeatured)
	]
);

// ============ PRODUCT TABLES ============
export const product = pgTable(
	'product',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(),
		slug: text('slug').notNull().unique(),
		description: text('description'),
		shortDescription: text('short_description'),
		brandId: text('brand_id').references(() => brand.id, {
			onDelete: 'set null'
		}),

		// Pricing
		basePrice: decimal('base_price', { precision: 12, scale: 2 }).notNull(),
		sellingPrice: decimal('selling_price', { precision: 12, scale: 2 }).notNull(),
		costPrice: decimal('cost_price', { precision: 12, scale: 2 }),
		discountPercentage: integer('discount_percentage').default(0),

		// Inventory
		sku: text('sku').notNull().unique(),
		stock: integer('stock').default(0).notNull(),
		lowStockThreshold: integer('low_stock_threshold').default(10).notNull(),
		trackInventory: boolean('track_inventory').default(true).notNull(),

		// Media
		thumbnailImage: text('thumbnail_image'),
		images: jsonb('images').$type<string[]>().default([]),
		videos: jsonb('videos').$type<string[]>().default([]),

		// Specifications (flexible JSON for different product types)
		specifications: jsonb('specifications').$type<Record<string, any>>().default({}),

		// Additional Info
		highlights: text('highlights').array(),
		whatsInBox: text('whats_in_box').array(),

		// SEO & Marketing
		metaTitle: text('meta_title'),
		metaDescription: text('meta_description'),
		metaKeywords: text('meta_keywords').array(),

		// Features
		isFeatured: boolean('is_featured').default(false).notNull(),
		isNewArrival: boolean('is_new_arrival').default(false).notNull(),
		isBestseller: boolean('is_bestseller').default(false).notNull(),
		isTrending: boolean('is_trending').default(false).notNull(),

		// Status
		isActive: boolean('is_active').default(true).notNull(),
		isPublished: boolean('is_published').default(false).notNull(),
		publishedAt: timestamp('published_at'),

		// Ratings
		averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default('0'),
		totalReviews: integer('total_reviews').default(0).notNull(),
		totalRatings: integer('total_ratings').default(0).notNull(),

		// Warranty & Support
		warrantyPeriod: integer('warranty_period'), // in months
		warrantyDetails: text('warranty_details'),
		returnPeriod: integer('return_period').default(7).notNull(), // in days
		replacementPeriod: integer('replacement_period').default(7).notNull(), // in days

		// Sales tracking
		totalSold: integer('total_sold').default(0).notNull(),
		viewCount: integer('view_count').default(0).notNull(),

		// Dimensions & Weight (for shipping)
		weight: decimal('weight', { precision: 8, scale: 2 }), // in kg
		length: decimal('length', { precision: 8, scale: 2 }), // in cm
		width: decimal('width', { precision: 8, scale: 2 }), // in cm
		height: decimal('height', { precision: 8, scale: 2 }), // in cm

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('product_slug_idx').on(table.slug),
		index('product_sku_idx').on(table.sku),
		index('product_brandId_idx').on(table.brandId),
		index('product_isActive_idx').on(table.isActive),
		index('product_isPublished_idx').on(table.isPublished),
		index('product_isFeatured_idx').on(table.isFeatured),
		index('product_sellingPrice_idx').on(table.sellingPrice),
		index('product_averageRating_idx').on(table.averageRating),
		index('product_totalSold_idx').on(table.totalSold),
		index('product_createdAt_idx').on(table.createdAt)
	]
);

export const productCategory = pgTable(
	'product_category',
	{
		id: text('id').primaryKey(),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		categoryId: text('category_id')
			.notNull()
			.references(() => category.id, { onDelete: 'cascade' }),
		isPrimary: boolean('is_primary').default(false).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		uniqueIndex('product_category_unique').on(table.productId, table.categoryId),
		index('product_category_productId_idx').on(table.productId),
		index('product_category_categoryId_idx').on(table.categoryId)
	]
);

// Product variants (for different colors, storage, RAM, etc.)
export const productVariant = pgTable(
	'product_variant',
	{
		id: text('id').primaryKey(),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		name: text('name').notNull(), // e.g., "128GB Blue"
		sku: text('sku').notNull().unique(),

		// Pricing
		price: decimal('price', { precision: 12, scale: 2 }).notNull(),
		compareAtPrice: decimal('compare_at_price', { precision: 12, scale: 2 }),
		costPrice: decimal('cost_price', { precision: 12, scale: 2 }),

		// Inventory
		stock: integer('stock').default(0).notNull(),

		// Variant attributes (color, size, storage, etc.)
		attributes: jsonb('attributes').$type<Record<string, string>>().default({}), // {color: "blue", storage: "128GB"}

		// Media
		images: jsonb('images').$type<string[]>().default([]),

		// Status
		isActive: boolean('is_active').default(true).notNull(),
		isDefault: boolean('is_default').default(false).notNull(),

		// Weight (if different from main product)
		weight: decimal('weight', { precision: 8, scale: 2 }),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('product_variant_productId_idx').on(table.productId),
		index('product_variant_sku_idx').on(table.sku),
		index('product_variant_isActive_idx').on(table.isActive)
	]
);

// ============ ADDRESS MANAGEMENT ============
export const address = pgTable(
	'address',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		fullName: text('full_name').notNull(),
		phone: text('phone').notNull(),
		alternatePhone: text('alternate_phone'),
		email: text('email'),
		addressLine1: text('address_line1').notNull(),
		addressLine2: text('address_line2'),
		landmark: text('landmark'),
		city: text('city').notNull(),
		state: text('state').notNull(),
		pincode: text('pincode').notNull(),
		country: text('country').default('India').notNull(),
		addressType: text('address_type').notNull(), // home, work, other
		isDefault: boolean('is_default').default(false).notNull(),
		latitude: decimal('latitude', { precision: 10, scale: 8 }),
		longitude: decimal('longitude', { precision: 11, scale: 8 }),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('address_userId_idx').on(table.userId),
		index('address_pincode_idx').on(table.pincode),
		index('address_isDefault_idx').on(table.isDefault)
	]
);

// ============ CART & WISHLIST ============
export const cart = pgTable(
	'cart',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		variantId: text('variant_id').references(() => productVariant.id, {
			onDelete: 'cascade'
		}),
		quantity: integer('quantity').default(1).notNull(),

		// Price snapshot (in case price changes)
		addedPrice: decimal('added_price', { precision: 12, scale: 2 }),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		uniqueIndex('cart_user_product_variant_unique').on(
			table.userId,
			table.productId,
			table.variantId
		),
		index('cart_userId_idx').on(table.userId),
		index('cart_productId_idx').on(table.productId)
	]
);

export const wishlist = pgTable(
	'wishlist',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		uniqueIndex('wishlist_user_product_unique').on(table.userId, table.productId),
		index('wishlist_userId_idx').on(table.userId),
		index('wishlist_productId_idx').on(table.productId)
	]
);

// ============ ORDER MANAGEMENT ============
export const order = pgTable(
	'order',
	{
		id: text('id').primaryKey(),
		orderNumber: text('order_number').notNull().unique(), // ORD-2024-001234
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'restrict' }),

		// Pricing
		subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
		discount: decimal('discount', { precision: 12, scale: 2 }).default('0').notNull(),
		couponDiscount: decimal('coupon_discount', { precision: 12, scale: 2 }).default('0').notNull(),
		shippingCharges: decimal('shipping_charges', { precision: 12, scale: 2 })
			.default('0')
			.notNull(),
		tax: decimal('tax', { precision: 12, scale: 2 }).default('0').notNull(),
		taxBreakup: jsonb('tax_breakup').$type<Record<string, any>>(), // {cgst: 100, sgst: 100}
		total: decimal('total', { precision: 12, scale: 2 }).notNull(),

		// Applied Coupon
		couponId: text('coupon_id').references(() => coupon.id, {
			onDelete: 'set null'
		}),
		couponCode: text('coupon_code'),

		// Status
		status: orderStatusEnum('status').default('pending').notNull(),
		paymentStatus: paymentStatusEnum('payment_status').default('pending').notNull(),
		paymentMethod: paymentMethodEnum('payment_method'),

		// Delivery
		shippingAddressId: text('shipping_address_id')
			.notNull()
			.references(() => address.id, { onDelete: 'restrict' }),
		billingAddressId: text('billing_address_id')
			.notNull()
			.references(() => address.id, { onDelete: 'restrict' }),

		// Shipping snapshot (in case address changes later)
		shippingAddress: jsonb('shipping_address').$type<Record<string, any>>(),
		billingAddress: jsonb('billing_address').$type<Record<string, any>>(),

		// Tracking
		trackingNumber: text('tracking_number'),
		trackingUrl: text('tracking_url'),
		courierPartner: text('courier_partner'),
		shippedAt: timestamp('shipped_at'),
		estimatedDelivery: timestamp('estimated_delivery'),
		deliveredAt: timestamp('delivered_at'),

		// Additional Info
		customerNotes: text('customer_notes'),
		adminNotes: text('admin_notes'),
		cancellationReason: text('cancellation_reason'),
		cancelledAt: timestamp('cancelled_at'),
		cancelledBy: text('cancelled_by'), // user, admin, system

		// Invoice
		invoiceNumber: text('invoice_number'),
		invoiceUrl: text('invoice_url'),
		invoiceGeneratedAt: timestamp('invoice_generated_at'),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('order_userId_idx').on(table.userId),
		index('order_orderNumber_idx').on(table.orderNumber),
		index('order_status_idx').on(table.status),
		index('order_paymentStatus_idx').on(table.paymentStatus),
		index('order_createdAt_idx').on(table.createdAt),
		index('order_deliveredAt_idx').on(table.deliveredAt)
	]
);

export const orderItem = pgTable(
	'order_item',
	{
		id: text('id').primaryKey(),
		orderId: text('order_id')
			.notNull()
			.references(() => order.id, { onDelete: 'cascade' }),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'restrict' }),
		variantId: text('variant_id').references(() => productVariant.id, {
			onDelete: 'restrict'
		}),

		// Snapshot of product details at time of order
		productName: text('product_name').notNull(),
		productImage: text('product_image'),
		brandName: text('brand_name'),
		sku: text('sku').notNull(),
		variantAttributes: jsonb('variant_attributes').$type<Record<string, string>>(),

		// Pricing
		price: decimal('price', { precision: 12, scale: 2 }).notNull(),
		quantity: integer('quantity').notNull(),
		discount: decimal('discount', { precision: 12, scale: 2 }).default('0').notNull(),
		tax: decimal('tax', { precision: 12, scale: 2 }).default('0').notNull(),
		total: decimal('total', { precision: 12, scale: 2 }).notNull(),

		// Status (for individual item tracking)
		status: orderStatusEnum('status').default('pending').notNull(),

		// Return/Refund tracking for this item
		isReturnable: boolean('is_returnable').default(true).notNull(),
		isRefunded: boolean('is_refunded').default(false).notNull(),
		refundedAmount: decimal('refunded_amount', { precision: 12, scale: 2 }),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('order_item_orderId_idx').on(table.orderId),
		index('order_item_productId_idx').on(table.productId),
		index('order_item_status_idx').on(table.status)
	]
);

export const orderStatusHistory = pgTable(
	'order_status_history',
	{
		id: text('id').primaryKey(),
		orderId: text('order_id')
			.notNull()
			.references(() => order.id, { onDelete: 'cascade' }),
		status: orderStatusEnum('status').notNull(),
		notes: text('notes'),
		location: text('location'),
		updatedBy: text('updated_by'), // user_id or 'system'
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('order_status_history_orderId_idx').on(table.orderId),
		index('order_status_history_createdAt_idx').on(table.createdAt)
	]
);

// ============ PAYMENT ============
export const payment = pgTable(
	'payment',
	{
		id: text('id').primaryKey(),
		orderId: text('order_id')
			.notNull()
			.references(() => order.id, { onDelete: 'cascade' }),
		amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
		currency: text('currency').default('INR').notNull(),
		method: paymentMethodEnum('method').notNull(),
		status: paymentStatusEnum('status').default('pending').notNull(),

		// Payment Gateway Details
		transactionId: text('transaction_id'),
		gatewayOrderId: text('gateway_order_id'), // Razorpay order_id, etc.
		gatewayPaymentId: text('gateway_payment_id'),
		gatewaySignature: text('gateway_signature'),
		gatewayResponse: jsonb('gateway_response').$type<Record<string, any>>(),

		// EMI Details (if applicable)
		emiTenure: integer('emi_tenure'), // in months
		emiAmount: decimal('emi_amount', { precision: 12, scale: 2 }),
		emiInterestRate: decimal('emi_interest_rate', { precision: 5, scale: 2 }),

		// Card Details (masked)
		cardLast4: text('card_last4'),
		cardBrand: text('card_brand'), // Visa, Mastercard, etc.
		cardNetwork: text('card_network'),

		// UPI Details
		upiId: text('upi_id'),

		// Failure Details
		failureReason: text('failure_reason'),
		errorCode: text('error_code'),
		errorDescription: text('error_description'),

		paidAt: timestamp('paid_at'),
		failedAt: timestamp('failed_at'),
		refundedAt: timestamp('refunded_at'),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('payment_orderId_idx').on(table.orderId),
		index('payment_transactionId_idx').on(table.transactionId),
		index('payment_status_idx').on(table.status),
		index('payment_createdAt_idx').on(table.createdAt)
	]
);

export const refund = pgTable(
	'refund',
	{
		id: text('id').primaryKey(),
		paymentId: text('payment_id')
			.notNull()
			.references(() => payment.id, { onDelete: 'cascade' }),
		orderId: text('order_id')
			.notNull()
			.references(() => order.id, { onDelete: 'cascade' }),
		amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
		reason: text('reason').notNull(),
		status: paymentStatusEnum('status').default('pending').notNull(),

		// Gateway Details
		refundId: text('refund_id'), // From payment gateway
		gatewayResponse: jsonb('gateway_response').$type<Record<string, any>>(),

		processedAt: timestamp('processed_at'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('refund_paymentId_idx').on(table.paymentId),
		index('refund_orderId_idx').on(table.orderId),
		index('refund_status_idx').on(table.status)
	]
);

// ============ REVIEWS & RATINGS ============
export const review = pgTable(
	'review',
	{
		id: text('id').primaryKey(),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		orderId: text('order_id').references(() => order.id, {
			onDelete: 'set null'
		}),
		orderItemId: text('order_item_id').references(() => orderItem.id, {
			onDelete: 'set null'
		}),

		rating: integer('rating').notNull(), // 1-5
		title: text('title'),
		comment: text('comment'),
		pros: text('pros').array(),
		cons: text('cons').array(),
		images: jsonb('images').$type<string[]>().default([]),
		videos: jsonb('videos').$type<string[]>().default([]),

		isVerifiedPurchase: boolean('is_verified_purchase').default(false).notNull(),
		isApproved: boolean('is_approved').default(false).notNull(),
		isFeatured: boolean('is_featured').default(false).notNull(),

		// Helpful votes
		helpfulCount: integer('helpful_count').default(0).notNull(),
		notHelpfulCount: integer('not_helpful_count').default(0).notNull(),

		// Admin moderation
		rejectionReason: text('rejection_reason'),
		moderatedBy: text('moderated_by'),
		moderatedAt: timestamp('moderated_at'),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('review_productId_idx').on(table.productId),
		index('review_userId_idx').on(table.userId),
		index('review_rating_idx').on(table.rating),
		index('review_isApproved_idx').on(table.isApproved),
		index('review_createdAt_idx').on(table.createdAt),
		uniqueIndex('review_user_product_order_unique').on(
			table.userId,
			table.productId,
			table.orderItemId
		)
	]
);

export const reviewHelpful = pgTable(
	'review_helpful',
	{
		id: text('id').primaryKey(),
		reviewId: text('review_id')
			.notNull()
			.references(() => review.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		isHelpful: boolean('is_helpful').notNull(), // true = helpful, false = not helpful
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		uniqueIndex('review_helpful_unique').on(table.reviewId, table.userId),
		index('review_helpful_reviewId_idx').on(table.reviewId)
	]
);

export const reviewResponse = pgTable(
	'review_response',
	{
		id: text('id').primaryKey(),
		reviewId: text('review_id')
			.notNull()
			.references(() => review.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		response: text('response').notNull(),
		isVendorResponse: boolean('is_vendor_response').default(false).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('review_response_reviewId_idx').on(table.reviewId),
		index('review_response_createdAt_idx').on(table.createdAt)
	]
);

// ============ PRODUCT Q&A ============
export const productQuestion = pgTable(
	'product_question',
	{
		id: text('id').primaryKey(),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		question: text('question').notNull(),
		isAnswered: boolean('is_answered').default(false).notNull(),
		isApproved: boolean('is_approved').default(false).notNull(),
		helpfulCount: integer('helpful_count').default(0).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('product_question_productId_idx').on(table.productId),
		index('product_question_userId_idx').on(table.userId),
		index('product_question_isAnswered_idx').on(table.isAnswered)
	]
);

export const productAnswer = pgTable(
	'product_answer',
	{
		id: text('id').primaryKey(),
		questionId: text('question_id')
			.notNull()
			.references(() => productQuestion.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		answer: text('answer').notNull(),
		isVendorAnswer: boolean('is_vendor_answer').default(false).notNull(),
		isApproved: boolean('is_approved').default(false).notNull(),
		helpfulCount: integer('helpful_count').default(0).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('product_answer_questionId_idx').on(table.questionId),
		index('product_answer_userId_idx').on(table.userId)
	]
);

// ============ RETURNS & REFUNDS ============
export const returnRequest = pgTable(
	'return_request',
	{
		id: text('id').primaryKey(),
		returnNumber: text('return_number').notNull().unique(),
		orderId: text('order_id')
			.notNull()
			.references(() => order.id, { onDelete: 'restrict' }),
		orderItemId: text('order_item_id')
			.notNull()
			.references(() => orderItem.id, { onDelete: 'restrict' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'restrict' }),

		returnType: text('return_type').notNull(), // return, exchange, replacement
		reason: text('reason').notNull(),
		reasonCategory: text('reason_category'), // defective, wrong_item, not_as_described, changed_mind
		description: text('description'),
		images: jsonb('images').$type<string[]>().default([]),
		videos: jsonb('videos').$type<string[]>().default([]),

		status: returnStatusEnum('status').default('requested').notNull(),

		// Refund Details
		refundAmount: decimal('refund_amount', { precision: 12, scale: 2 }).notNull(),
		refundMethod: text('refund_method'), // original_payment, bank_transfer, wallet, store_credit

		// Bank Details (if refund method is bank_transfer)
		bankAccountNumber: text('bank_account_number'),
		bankIfscCode: text('bank_ifsc_code'),
		bankAccountName: text('bank_account_name'),

		// Pickup Details
		pickupAddressId: text('pickup_address_id').references(() => address.id, {
			onDelete: 'set null'
		}),
		pickupAddress: jsonb('pickup_address').$type<Record<string, any>>(),
		pickupScheduledAt: timestamp('pickup_scheduled_at'),
		pickedUpAt: timestamp('picked_up_at'),

		// Quality Check
		qcStatus: text('qc_status'), // pending, passed, failed
		qcNotes: text('qc_notes'),
		qcCompletedAt: timestamp('qc_completed_at'),
		qcBy: text('qc_by'),

		// Completion
		completedAt: timestamp('completed_at'),
		rejectedAt: timestamp('rejected_at'),
		rejectionReason: text('rejection_reason'),

		// Admin Notes
		adminNotes: text('admin_notes'),
		internalNotes: text('internal_notes'),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('return_request_orderId_idx').on(table.orderId),
		index('return_request_userId_idx').on(table.userId),
		index('return_request_status_idx').on(table.status),
		index('return_request_returnNumber_idx').on(table.returnNumber),
		index('return_request_createdAt_idx').on(table.createdAt)
	]
);

export const returnStatusHistory = pgTable(
	'return_status_history',
	{
		id: text('id').primaryKey(),
		returnRequestId: text('return_request_id')
			.notNull()
			.references(() => returnRequest.id, { onDelete: 'cascade' }),
		status: returnStatusEnum('status').notNull(),
		notes: text('notes'),
		updatedBy: text('updated_by'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [index('return_status_history_returnRequestId_idx').on(table.returnRequestId)]
);

// ============ COUPONS & OFFERS ============
export const coupon = pgTable(
	'coupon',
	{
		id: text('id').primaryKey(),
		code: text('code').notNull().unique(),
		name: text('name').notNull(),
		description: text('description'),
		image: text('image'),

		discountType: text('discount_type').notNull(), // percentage, fixed, free_shipping
		discountValue: decimal('discount_value', { precision: 12, scale: 2 }).notNull(),

		// Conditions
		minOrderValue: decimal('min_order_value', { precision: 12, scale: 2 }),
		maxDiscount: decimal('max_discount', { precision: 12, scale: 2 }),

		// Usage Limits
		usageLimit: integer('usage_limit'), // total times can be used
		usagePerUser: integer('usage_per_user').default(1).notNull(),
		usedCount: integer('used_count').default(0).notNull(),

		// Validity
		validFrom: timestamp('valid_from').notNull(),
		validUntil: timestamp('valid_until').notNull(),

		// Status
		isActive: boolean('is_active').default(true).notNull(),
		isPublic: boolean('is_public').default(true).notNull(), // false = targeted coupon

		// Restrictions
		applicableCategories: jsonb('applicable_categories').$type<string[]>(),
		applicableProducts: jsonb('applicable_products').$type<string[]>(),
		applicableBrands: jsonb('applicable_brands').$type<string[]>(),
		excludedCategories: jsonb('excluded_categories').$type<string[]>(),
		excludedProducts: jsonb('excluded_products').$type<string[]>(),

		// User Targeting
		applicableUserIds: jsonb('applicable_user_ids').$type<string[]>(),
		applicableUserRoles: jsonb('applicable_user_roles').$type<string[]>(),
		firstOrderOnly: boolean('first_order_only').default(false).notNull(),

		// Payment Method Restriction
		applicablePaymentMethods: jsonb('applicable_payment_methods').$type<string[]>(),

		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('coupon_code_idx').on(table.code),
		index('coupon_isActive_idx').on(table.isActive),
		index('coupon_validFrom_idx').on(table.validFrom),
		index('coupon_validUntil_idx').on(table.validUntil)
	]
);

export const couponUsage = pgTable(
	'coupon_usage',
	{
		id: text('id').primaryKey(),
		couponId: text('coupon_id')
			.notNull()
			.references(() => coupon.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		orderId: text('order_id')
			.notNull()
			.references(() => order.id, { onDelete: 'cascade' }),
		discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('coupon_usage_couponId_idx').on(table.couponId),
		index('coupon_usage_userId_idx').on(table.userId),
		index('coupon_usage_orderId_idx').on(table.orderId)
	]
);

// ============ NOTIFICATIONS ============
export const notification = pgTable(
	'notification',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		type: notificationTypeEnum('type').notNull(),
		title: text('title').notNull(),
		message: text('message').notNull(),
		link: text('link'),
		image: text('image'),
		data: jsonb('data').$type<Record<string, any>>(), // additional metadata
		isRead: boolean('is_read').default(false).notNull(),
		readAt: timestamp('read_at'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('notification_userId_idx').on(table.userId),
		index('notification_isRead_idx').on(table.isRead),
		index('notification_type_idx').on(table.type),
		index('notification_createdAt_idx').on(table.createdAt)
	]
);

// ============ SEARCH & ANALYTICS ============
export const searchLog = pgTable(
	'search_log',
	{
		id: text('id').primaryKey(),
		userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
		query: text('query').notNull(),
		filters: jsonb('filters').$type<Record<string, any>>(),
		resultsCount: integer('results_count').default(0).notNull(),
		clickedProductId: text('clicked_product_id').references(() => product.id, {
			onDelete: 'set null'
		}),
		sessionId: text('session_id'),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('search_log_query_idx').on(table.query),
		index('search_log_userId_idx').on(table.userId),
		index('search_log_createdAt_idx').on(table.createdAt)
	]
);

export const productView = pgTable(
	'product_view',
	{
		id: text('id').primaryKey(),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
		sessionId: text('session_id'),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		referrer: text('referrer'),
		duration: integer('duration'), // time spent in seconds
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('product_view_productId_idx').on(table.productId),
		index('product_view_userId_idx').on(table.userId),
		index('product_view_createdAt_idx').on(table.createdAt)
	]
);

// ============ PRICE HISTORY ============
export const priceHistory = pgTable(
	'price_history',
	{
		id: text('id').primaryKey(),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		variantId: text('variant_id').references(() => productVariant.id, {
			onDelete: 'cascade'
		}),
		price: decimal('price', { precision: 12, scale: 2 }).notNull(),
		compareAtPrice: decimal('compare_at_price', { precision: 12, scale: 2 }),
		effectiveFrom: timestamp('effective_from').defaultNow().notNull(),
		effectiveUntil: timestamp('effective_until'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('price_history_productId_idx').on(table.productId),
		index('price_history_variantId_idx').on(table.variantId),
		index('price_history_effectiveFrom_idx').on(table.effectiveFrom)
	]
);

// ============ INVENTORY MANAGEMENT ============
export const inventoryLog = pgTable(
	'inventory_log',
	{
		id: text('id').primaryKey(),
		productId: text('product_id')
			.notNull()
			.references(() => product.id, { onDelete: 'cascade' }),
		variantId: text('variant_id').references(() => productVariant.id, {
			onDelete: 'cascade'
		}),
		type: text('type').notNull(), // purchase, sale, adjustment, return, damage
		quantity: integer('quantity').notNull(), // can be negative
		previousStock: integer('previous_stock').notNull(),
		newStock: integer('new_stock').notNull(),
		orderId: text('order_id').references(() => order.id, {
			onDelete: 'set null'
		}),
		notes: text('notes'),
		performedBy: text('performed_by'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('inventory_log_productId_idx').on(table.productId),
		index('inventory_log_variantId_idx').on(table.variantId),
		index('inventory_log_type_idx').on(table.type),
		index('inventory_log_createdAt_idx').on(table.createdAt)
	]
);

// ============ BANNER & PROMOTIONS ============
export const banner = pgTable(
	'banner',
	{
		id: text('id').primaryKey(),
		title: text('title').notNull(),
		description: text('description'),
		image: text('image').notNull(),
		mobileImage: text('mobile_image'),
		link: text('link'),
		buttonText: text('button_text'),
		placement: text('placement').notNull(), // homepage_hero, homepage_secondary, category_page, etc.
		displayOrder: integer('display_order').default(0).notNull(),
		isActive: boolean('is_active').default(true).notNull(),
		validFrom: timestamp('valid_from'),
		validUntil: timestamp('valid_until'),
		clickCount: integer('click_count').default(0).notNull(),
		viewCount: integer('view_count').default(0).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('banner_placement_idx').on(table.placement),
		index('banner_isActive_idx').on(table.isActive),
		index('banner_displayOrder_idx').on(table.displayOrder)
	]
);

// ============ NEWSLETTER ============
export const newsletter = pgTable(
	'newsletter',
	{
		id: text('id').primaryKey(),
		email: text('email').notNull().unique(),
		isSubscribed: boolean('is_subscribed').default(true).notNull(),
		source: text('source'), // footer, checkout, popup
		subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
		unsubscribedAt: timestamp('unsubscribed_at')
	},
	(table) => [
		index('newsletter_email_idx').on(table.email),
		index('newsletter_isSubscribed_idx').on(table.isSubscribed)
	]
);

// ============ CONTACT & SUPPORT ============
export const contactMessage = pgTable(
	'contact_message',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(),
		email: text('email').notNull(),
		phone: text('phone'),
		subject: text('subject').notNull(),
		message: text('message').notNull(),
		userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
		orderId: text('order_id').references(() => order.id, { onDelete: 'set null' }),
		status: text('status').default('pending').notNull(), // pending, in_progress, resolved, closed
		priority: text('priority').default('medium').notNull(), // low, medium, high, urgent
		assignedTo: text('assigned_to').references(() => user.id, {
			onDelete: 'set null'
		}),
		resolvedAt: timestamp('resolved_at'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('contact_message_email_idx').on(table.email),
		index('contact_message_status_idx').on(table.status),
		index('contact_message_createdAt_idx').on(table.createdAt)
	]
);

export const contactMessageReply = pgTable(
	'contact_message_reply',
	{
		id: text('id').primaryKey(),
		messageId: text('message_id')
			.notNull()
			.references(() => contactMessage.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		reply: text('reply').notNull(),
		attachments: jsonb('attachments').$type<string[]>().default([]),
		isCustomerReply: boolean('is_customer_reply').default(false).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('contact_message_reply_messageId_idx').on(table.messageId),
		index('contact_message_reply_createdAt_idx').on(table.createdAt)
	]
);

// ============ SETTINGS & CONFIGURATION ============
export const siteSettings = pgTable('site_settings', {
	id: text('id').primaryKey(),
	key: text('key').notNull().unique(),
	value: jsonb('value').$type<any>(),
	description: text('description'),
	updatedBy: text('updated_by').references(() => user.id, {
		onDelete: 'set null'
	}),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const shippingZone = pgTable(
	'shipping_zone',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(),
		pincodes: text('pincodes').array().notNull(), // array of pincodes
		states: text('states').array(), // array of state names
		baseFee: decimal('base_fee', { precision: 12, scale: 2 }).notNull(),
		perKgFee: decimal('per_kg_fee', { precision: 12, scale: 2 }).default('0').notNull(),
		freeShippingThreshold: decimal('free_shipping_threshold', {
			precision: 12,
			scale: 2
		}),
		estimatedDays: integer('estimated_days').notNull(), // delivery time in days
		isActive: boolean('is_active').default(true).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [index('shipping_zone_isActive_idx').on(table.isActive)]
);

export const taxRate = pgTable(
	'tax_rate',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(), // GST 18%, CGST 9%, SGST 9%
		rate: decimal('rate', { precision: 5, scale: 2 }).notNull(), // 18.00
		type: text('type').notNull(), // gst, cgst, sgst, igst, vat
		isActive: boolean('is_active').default(true).notNull(),
		applicableCategories: jsonb('applicable_categories').$type<string[]>(),
		applicableProducts: jsonb('applicable_products').$type<string[]>(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [index('tax_rate_isActive_idx').on(table.isActive)]
);

// ============ ALL RELATIONS ============
export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	addresses: many(address),
	orders: many(order),
	cart: many(cart),
	wishlist: many(wishlist),
	reviews: many(review),
	notifications: many(notification),
	returnRequests: many(returnRequest),
	searchLogs: many(searchLog),
	productViews: many(productView),
	questions: many(productQuestion),
	answers: many(productAnswer),
	contactMessages: many(contactMessage)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
	parent: one(category, {
		fields: [category.parentId],
		references: [category.id],
		relationName: 'category_hierarchy'
	}),
	children: many(category, { relationName: 'category_hierarchy' }),
	products: many(productCategory)
}));

export const brandRelations = relations(brand, ({ many }) => ({
	products: many(product)
}));

export const productRelations = relations(product, ({ one, many }) => ({
	brand: one(brand, {
		fields: [product.brandId],
		references: [brand.id]
	}),
	categories: many(productCategory),
	variants: many(productVariant),
	reviews: many(review),
	cartItems: many(cart),
	wishlistItems: many(wishlist),
	orderItems: many(orderItem),
	questions: many(productQuestion),
	views: many(productView),
	priceHistory: many(priceHistory),
	inventoryLogs: many(inventoryLog)
}));

export const productCategoryRelations = relations(productCategory, ({ one }) => ({
	product: one(product, {
		fields: [productCategory.productId],
		references: [product.id]
	}),
	category: one(category, {
		fields: [productCategory.categoryId],
		references: [category.id]
	})
}));

export const productVariantRelations = relations(productVariant, ({ one, many }) => ({
	product: one(product, {
		fields: [productVariant.productId],
		references: [product.id]
	}),
	cartItems: many(cart),
	orderItems: many(orderItem),
	priceHistory: many(priceHistory),
	inventoryLogs: many(inventoryLog)
}));

export const addressRelations = relations(address, ({ one, many }) => ({
	user: one(user, {
		fields: [address.userId],
		references: [user.id]
	}),
	ordersAsShipping: many(order, { relationName: 'shipping_address' }),
	ordersAsBilling: many(order, { relationName: 'billing_address' }),
	returnRequests: many(returnRequest)
}));

export const cartRelations = relations(cart, ({ one }) => ({
	user: one(user, {
		fields: [cart.userId],
		references: [user.id]
	}),
	product: one(product, {
		fields: [cart.productId],
		references: [product.id]
	}),
	variant: one(productVariant, {
		fields: [cart.variantId],
		references: [productVariant.id]
	})
}));

export const wishlistRelations = relations(wishlist, ({ one }) => ({
	user: one(user, {
		fields: [wishlist.userId],
		references: [user.id]
	}),
	product: one(product, {
		fields: [wishlist.productId],
		references: [product.id]
	})
}));

export const orderRelations = relations(order, ({ one, many }) => ({
	user: one(user, {
		fields: [order.userId],
		references: [user.id]
	}),
	shippingAddress: one(address, {
		fields: [order.shippingAddressId],
		references: [address.id],
		relationName: 'shipping_address'
	}),
	billingAddress: one(address, {
		fields: [order.billingAddressId],
		references: [address.id],
		relationName: 'billing_address'
	}),
	coupon: one(coupon, {
		fields: [order.couponId],
		references: [coupon.id]
	}),
	items: many(orderItem),
	payments: many(payment),
	statusHistory: many(orderStatusHistory),
	reviews: many(review),
	returnRequests: many(returnRequest),
	refunds: many(refund)
}));

export const orderItemRelations = relations(orderItem, ({ one, many }) => ({
	order: one(order, {
		fields: [orderItem.orderId],
		references: [order.id]
	}),
	product: one(product, {
		fields: [orderItem.productId],
		references: [product.id]
	}),
	variant: one(productVariant, {
		fields: [orderItem.variantId],
		references: [productVariant.id]
	}),
	reviews: many(review),
	returnRequests: many(returnRequest)
}));

export const orderStatusHistoryRelations = relations(orderStatusHistory, ({ one }) => ({
	order: one(order, {
		fields: [orderStatusHistory.orderId],
		references: [order.id]
	})
}));

export const paymentRelations = relations(payment, ({ one, many }) => ({
	order: one(order, {
		fields: [payment.orderId],
		references: [order.id]
	}),
	refunds: many(refund)
}));

export const refundRelations = relations(refund, ({ one }) => ({
	payment: one(payment, {
		fields: [refund.paymentId],
		references: [payment.id]
	}),
	order: one(order, {
		fields: [refund.orderId],
		references: [order.id]
	})
}));

// FINAL PART - Complete Relations

export const reviewRelations = relations(review, ({ one, many }) => ({
	product: one(product, {
		fields: [review.productId],
		references: [product.id]
	}),
	user: one(user, {
		fields: [review.userId],
		references: [user.id]
	}),
	order: one(order, {
		fields: [review.orderId],
		references: [order.id]
	}),
	orderItem: one(orderItem, {
		fields: [review.orderItemId],
		references: [orderItem.id]
	}),
	helpfulVotes: many(reviewHelpful),
	responses: many(reviewResponse)
}));

export const reviewHelpfulRelations = relations(reviewHelpful, ({ one }) => ({
	review: one(review, {
		fields: [reviewHelpful.reviewId],
		references: [review.id]
	}),
	user: one(user, {
		fields: [reviewHelpful.userId],
		references: [user.id]
	})
}));

export const reviewResponseRelations = relations(reviewResponse, ({ one }) => ({
	review: one(review, {
		fields: [reviewResponse.reviewId],
		references: [review.id]
	}),
	user: one(user, {
		fields: [reviewResponse.userId],
		references: [user.id]
	})
}));

export const productQuestionRelations = relations(productQuestion, ({ one, many }) => ({
	product: one(product, {
		fields: [productQuestion.productId],
		references: [product.id]
	}),
	user: one(user, {
		fields: [productQuestion.userId],
		references: [user.id]
	}),
	answers: many(productAnswer)
}));

export const productAnswerRelations = relations(productAnswer, ({ one }) => ({
	question: one(productQuestion, {
		fields: [productAnswer.questionId],
		references: [productQuestion.id]
	}),
	user: one(user, {
		fields: [productAnswer.userId],
		references: [user.id]
	})
}));

export const returnRequestRelations = relations(returnRequest, ({ one, many }) => ({
	order: one(order, {
		fields: [returnRequest.orderId],
		references: [order.id]
	}),
	orderItem: one(orderItem, {
		fields: [returnRequest.orderItemId],
		references: [orderItem.id]
	}),
	user: one(user, {
		fields: [returnRequest.userId],
		references: [user.id]
	}),
	pickupAddress: one(address, {
		fields: [returnRequest.pickupAddressId],
		references: [address.id]
	}),
	statusHistory: many(returnStatusHistory)
}));

export const returnStatusHistoryRelations = relations(returnStatusHistory, ({ one }) => ({
	returnRequest: one(returnRequest, {
		fields: [returnStatusHistory.returnRequestId],
		references: [returnRequest.id]
	})
}));

export const couponRelations = relations(coupon, ({ many }) => ({
	usages: many(couponUsage),
	orders: many(order)
}));

export const couponUsageRelations = relations(couponUsage, ({ one }) => ({
	coupon: one(coupon, {
		fields: [couponUsage.couponId],
		references: [coupon.id]
	}),
	user: one(user, {
		fields: [couponUsage.userId],
		references: [user.id]
	}),
	order: one(order, {
		fields: [couponUsage.orderId],
		references: [order.id]
	})
}));

export const notificationRelations = relations(notification, ({ one }) => ({
	user: one(user, {
		fields: [notification.userId],
		references: [user.id]
	})
}));

export const searchLogRelations = relations(searchLog, ({ one }) => ({
	user: one(user, {
		fields: [searchLog.userId],
		references: [user.id]
	}),
	clickedProduct: one(product, {
		fields: [searchLog.clickedProductId],
		references: [product.id]
	})
}));

export const productViewRelations = relations(productView, ({ one }) => ({
	product: one(product, {
		fields: [productView.productId],
		references: [product.id]
	}),
	user: one(user, {
		fields: [productView.userId],
		references: [user.id]
	})
}));

export const priceHistoryRelations = relations(priceHistory, ({ one }) => ({
	product: one(product, {
		fields: [priceHistory.productId],
		references: [product.id]
	}),
	variant: one(productVariant, {
		fields: [priceHistory.variantId],
		references: [productVariant.id]
	})
}));

export const inventoryLogRelations = relations(inventoryLog, ({ one }) => ({
	product: one(product, {
		fields: [inventoryLog.productId],
		references: [product.id]
	}),
	variant: one(productVariant, {
		fields: [inventoryLog.variantId],
		references: [productVariant.id]
	}),
	order: one(order, {
		fields: [inventoryLog.orderId],
		references: [order.id]
	})
}));

export const contactMessageRelations = relations(contactMessage, ({ one, many }) => ({
	user: one(user, {
		fields: [contactMessage.userId],
		references: [user.id]
	}),
	order: one(order, {
		fields: [contactMessage.orderId],
		references: [order.id]
	}),
	assignedToUser: one(user, {
		fields: [contactMessage.assignedTo],
		references: [user.id]
	}),
	replies: many(contactMessageReply)
}));

export const contactMessageReplyRelations = relations(contactMessageReply, ({ one }) => ({
	message: one(contactMessage, {
		fields: [contactMessageReply.messageId],
		references: [contactMessage.id]
	}),
	user: one(user, {
		fields: [contactMessageReply.userId],
		references: [user.id]
	})
}));

// ============================================
// EXAMPLE: How to Use This Schema
// ============================================

/*
// 1. Create a product with variants
const newProduct = await db.insert(product).values({
  id: generateId(),
  name: "iPhone 15 Pro",
  slug: "iphone-15-pro",
  brandId: appleBrandId,
  basePrice: "129900",
  sellingPrice: "129900",
  sku: "IPH15P",
  stock: 0, // No stock in main product
  specifications: {
    displaySize: "6.7 inches",
    processor: "A17 Pro",
    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
    // ... more specs
  },
  isPublished: true,
  publishedAt: new Date(),
});

// Add variants
await db.insert(productVariant).values([
  {
    id: generateId(),
    productId: newProduct.id,
    name: "128GB Natural Titanium",
    sku: "IPH15P-128-NAT",
    price: "129900",
    stock: 50,
    attributes: { color: "Natural Titanium", storage: "128GB" },
    isDefault: true,
  },
  {
    id: generateId(),
    productId: newProduct.id,
    name: "256GB Blue Titanium",
    sku: "IPH15P-256-BLU",
    price: "139900",
    stock: 30,
    attributes: { color: "Blue Titanium", storage: "256GB" },
  },
]);

// Add to categories
await db.insert(productCategory).values({
  id: generateId(),
  productId: newProduct.id,
  categoryId: smartphonesCategoryId,
  isPrimary: true,
});

// 2. Create an order
const newOrder = await db.insert(order).values({
  id: generateId(),
  orderNumber: `ORD-${Date.now()}`,
  userId: customerId,
  subtotal: "139900",
  tax: "25182", // 18% GST
  shippingCharges: "0",
  total: "165082",
  status: "pending",
  paymentStatus: "pending",
  shippingAddressId: addressId,
  billingAddressId: addressId,
  shippingAddress: addressSnapshot, // Save snapshot
  billingAddress: addressSnapshot,
});

// Add order items
await db.insert(orderItem).values({
  id: generateId(),
  orderId: newOrder.id,
  productId: productId,
  variantId: variantId,
  productName: "iPhone 15 Pro",
  sku: "IPH15P-256-BLU",
  price: "139900",
  quantity: 1,
  tax: "25182",
  total: "165082",
  variantAttributes: { color: "Blue Titanium", storage: "256GB" },
});

// Update inventory
await db.insert(inventoryLog).values({
  id: generateId(),
  productId: productId,
  variantId: variantId,
  type: "sale",
  quantity: -1,
  previousStock: 30,
  newStock: 29,
  orderId: newOrder.id,
});

// 3. Process payment
await db.insert(payment).values({
  id: generateId(),
  orderId: newOrder.id,
  amount: "165082",
  method: "upi",
  status: "completed",
  transactionId: "TXN123456",
  paidAt: new Date(),
});

// 4. Create review after delivery
await db.insert(review).values({
  id: generateId(),
  productId: productId,
  userId: customerId,
  orderId: newOrder.id,
  rating: 5,
  title: "Excellent phone!",
  comment: "Best iPhone yet. Camera is amazing!",
  isVerifiedPurchase: true,
  isApproved: true,
});

// 5. Query products with relations
const products = await db.query.product.findMany({
  with: {
    brand: true,
    categories: {
      with: {
        category: true,
      },
    },
    variants: true,
    reviews: {
      where: eq(review.isApproved, true),
      limit: 5,
      orderBy: desc(review.createdAt),
    },
  },
  where: eq(product.isPublished, true),
});
*/

// ============================================
// INDEXES SUMMARY FOR PERFORMANCE
// ============================================

/*
Key indexes already included:
- All foreign keys are indexed
- Email, phone for users
- Slug fields for products, categories, brands
- Order number, tracking number
- Status fields for filtering
- Created dates for sorting
- Composite unique indexes for cart, wishlist
- GIN index on JSONB fields (add in migration)

Additional indexes to add in migration:
CREATE INDEX CONCURRENTLY product_specifications_gin_idx ON product USING GIN (specifications);
CREATE INDEX CONCURRENTLY product_search_idx ON product USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX product_price_idx ON product (selling_price DESC);
CREATE INDEX order_user_created_idx ON "order" (user_id, created_at DESC);
*/

// ============================================
// MIGRATIONS CHECKLIST
// ============================================

/*
1. Create enums first
2. Create base tables (user, category, brand)
3. Create product tables
4. Create address, cart, wishlist
5. Create order tables
6. Create payment, refund tables
7. Create review, Q&A tables
8. Create return request tables
9. Create coupon tables
10. Create notification, analytics tables
11. Create support tables
12. Create settings tables
13. Add GIN indexes for JSONB fields
14. Add full-text search indexes
15. Add composite indexes for common queries
*/

export type Product = typeof product.$inferSelect;
export type ProductInsert = typeof product.$inferInsert;
export type Order = typeof order.$inferSelect;
export type OrderInsert = typeof order.$inferInsert;
export type User = typeof user.$inferSelect;
export type Review = typeof review.$inferSelect;
// ... add more types as needed
