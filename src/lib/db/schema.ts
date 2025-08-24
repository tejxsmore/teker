import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
	decimal,
	jsonb,
	serial,
	uuid,
	real,
	pgEnum,
	varchar,
	type AnyPgColumn
} from 'drizzle-orm/pg-core';

// Enums for better type safety and performance
export const userStatusEnum = pgEnum('user_status', ['active', 'inactive', 'suspended']);
export const addressTypeEnum = pgEnum('address_type', ['shipping', 'billing', 'both']);
export const attributeTypeEnum = pgEnum('attribute_type', [
	'color',
	'text',
	'number',
	'select',
	'boolean'
]);
export const productStatusEnum = pgEnum('product_status', [
	'active',
	'inactive',
	'draft',
	'archived'
]);
export const orderStatusEnum = pgEnum('order_status', [
	'pending',
	'confirmed',
	'processing',
	'shipped',
	'delivered',
	'cancelled',
	'refunded'
]);
export const paymentStatusEnum = pgEnum('payment_status', [
	'pending',
	'completed',
	'failed',
	'refunded',
	'partially_refunded'
]);
export const fulfillmentStatusEnum = pgEnum('fulfillment_status', [
	'unfulfilled',
	'partial',
	'fulfilled',
	'shipped',
	'delivered'
]);
export const couponTypeEnum = pgEnum('coupon_type', [
	'percentage',
	'fixed_amount',
	'free_shipping'
]);
export const shippingTypeEnum = pgEnum('shipping_type', [
	'standard',
	'express',
	'overnight',
	'free'
]);
export const paymentMethodTypeEnum = pgEnum('payment_method_type', [
	'card',
	'wallet',
	'bank_transfer',
	'crypto'
]);
export const transactionStatusEnum = pgEnum('transaction_status', [
	'pending',
	'completed',
	'failed',
	'refunded',
	'cancelled'
]);
export const transactionTypeEnum = pgEnum('transaction_type', [
	'payment',
	'refund',
	'partial_refund'
]);
export const returnStatusEnum = pgEnum('return_status', [
	'pending',
	'approved',
	'rejected',
	'completed',
	'cancelled'
]);
export const returnTypeEnum = pgEnum('return_type', ['return', 'exchange', 'refund']);
export const inventoryTransactionTypeEnum = pgEnum('inventory_transaction_type', [
	'sale',
	'return',
	'adjustment',
	'restock',
	'damage',
	'transfer'
]);
export const stockAlertTypeEnum = pgEnum('stock_alert_type', [
	'low_stock',
	'out_of_stock',
	'overstock'
]);

// User Management
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	status: userStatusEnum('status').default('active').notNull(),
	lastLoginAt: timestamp('last_login_at'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: varchar('ip_address', { length: 45 }),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable('account', {
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
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const userProfiles = pgTable('user_profiles', {
	id: serial('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
		.unique(),
	phoneNumber: varchar('phone_number', { length: 20 }),
	phoneVerified: boolean('phone_verified').default(false),
	dateOfBirth: timestamp('date_of_birth'),
	gender: varchar('gender', { length: 10 }),
	preferredLanguage: varchar('preferred_language', { length: 5 }).default('en'),
	timezone: varchar('timezone', { length: 50 }),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const userAddresses = pgTable('user_addresses', {
	id: serial('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	type: addressTypeEnum('type').notNull(),
	isDefault: boolean('is_default').default(false),
	firstName: varchar('first_name', { length: 100 }).notNull(),
	lastName: varchar('last_name', { length: 100 }).notNull(),
	company: varchar('company', { length: 100 }),
	addressLine1: varchar('address_line_1', { length: 255 }).notNull(),
	addressLine2: varchar('address_line_2', { length: 255 }),
	city: varchar('city', { length: 100 }).notNull(),
	state: varchar('state', { length: 100 }).notNull(),
	postalCode: varchar('postal_code', { length: 20 }).notNull(),
	country: varchar('country', { length: 2 }).notNull(),
	phoneNumber: varchar('phone_number', { length: 20 }),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// Product Catalog
export const categories = pgTable('categories', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: text('description'),
	parentId: integer('parent_id').references((): AnyPgColumn => categories.id, {
		onDelete: 'set null'
	}),
	image: text('image'),
	metaTitle: varchar('meta_title', { length: 255 }),
	metaDescription: text('meta_description'),
	sortOrder: integer('sort_order').default(0),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const brands = pgTable('brands', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: text('description'),
	logo: text('logo'),
	website: text('website'),
	metaTitle: varchar('meta_title', { length: 255 }),
	metaDescription: text('meta_description'),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const productTypes = pgTable('product_types', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.id, { onDelete: 'cascade' }),
	attributeSchema: jsonb('attribute_schema'),
	specificationSchema: jsonb('specification_schema'),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const productAttributes = pgTable('product_attributes', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	type: attributeTypeEnum('type').notNull(),
	unit: varchar('unit', { length: 50 }),
	isRequired: boolean('is_required').default(false),
	isFilterable: boolean('is_filterable').default(true),
	sortOrder: integer('sort_order').default(0),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow()
});

export const attributeValues = pgTable('attribute_values', {
	id: serial('id').primaryKey(),
	attributeId: integer('attribute_id')
		.notNull()
		.references(() => productAttributes.id, { onDelete: 'cascade' }),
	value: varchar('value', { length: 255 }).notNull(),
	displayValue: varchar('display_value', { length: 255 }),
	hexColor: varchar('hex_color', { length: 7 }),
	sortOrder: integer('sort_order').default(0),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow()
});

export const products = pgTable('products', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: text('description'),
	shortDescription: text('short_description'),
	sku: varchar('sku', { length: 100 }).notNull().unique(),
	brandId: integer('brand_id')
		.notNull()
		.references(() => brands.id, { onDelete: 'restrict' }),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.id, { onDelete: 'restrict' }),
	productTypeId: integer('product_type_id')
		.notNull()
		.references(() => productTypes.id, { onDelete: 'restrict' }),
	basePrice: decimal('base_price', { precision: 12, scale: 2 }).notNull(),
	salePrice: decimal('sale_price', { precision: 12, scale: 2 }),
	costPrice: decimal('cost_price', { precision: 12, scale: 2 }),
	specifications: jsonb('specifications'),
	features: jsonb('features'),
	metaTitle: varchar('meta_title', { length: 255 }),
	metaDescription: text('meta_description'),
	avgRating: real('avg_rating').default(0),
	reviewCount: integer('review_count').default(0),
	minPrice: decimal('min_price', { precision: 12, scale: 2 }),
	maxPrice: decimal('max_price', { precision: 12, scale: 2 }),
	totalStock: integer('total_stock').default(0),
	totalSold: integer('total_sold').default(0),
	viewCount: integer('view_count').default(0),
	status: productStatusEnum('status').default('active'),
	isActive: boolean('is_active').default(true),
	isFeatured: boolean('is_featured').default(false),
	hasVariants: boolean('has_variants').default(false),
	publishedAt: timestamp('published_at'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const productVariants = pgTable('product_variants', {
	id: serial('id').primaryKey(),
	productId: integer('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	sku: varchar('sku', { length: 100 }).notNull().unique(),
	name: varchar('name', { length: 255 }),
	price: decimal('price', { precision: 12, scale: 2 }).notNull(),
	salePrice: decimal('sale_price', { precision: 12, scale: 2 }),
	costPrice: decimal('cost_price', { precision: 12, scale: 2 }),
	stock: integer('stock').default(0),
	reservedStock: integer('reserved_stock').default(0),
	lowStockThreshold: integer('low_stock_threshold').default(5),
	weight: decimal('weight', { precision: 8, scale: 2 }),
	dimensions: jsonb('dimensions'),
	specifications: jsonb('specifications'),
	reorderPoint: integer('reorder_point').default(10),
	reorderQuantity: integer('reorder_quantity').default(50),
	isActive: boolean('is_active').default(true),
	isDefault: boolean('is_default').default(false),
	sortOrder: integer('sort_order').default(0),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const variantAttributes = pgTable('variant_attributes', {
	id: serial('id').primaryKey(),
	variantId: integer('variant_id')
		.notNull()
		.references(() => productVariants.id, { onDelete: 'cascade' }),
	attributeId: integer('attribute_id')
		.notNull()
		.references(() => productAttributes.id, { onDelete: 'cascade' }),
	valueId: integer('value_id')
		.notNull()
		.references(() => attributeValues.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').defaultNow()
});

export const productImages = pgTable('product_images', {
	id: serial('id').primaryKey(),
	productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }),
	variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }),
	url: text('url').notNull(),
	altText: varchar('alt_text', { length: 255 }),
	title: varchar('title', { length: 255 }),
	type: varchar('type', { length: 50 }).default('product'),
	isPrimary: boolean('is_primary').default(false),
	sortOrder: integer('sort_order').default(0),
	fileSize: integer('file_size'),
	width: integer('width'),
	height: integer('height'),
	createdAt: timestamp('created_at').defaultNow()
});

// Shopping Cart
export const cart = pgTable('cart', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
	sessionId: varchar('session_id', { length: 255 }),
	subtotal: decimal('subtotal', { precision: 12, scale: 2 }).default('0'),
	tax: decimal('tax', { precision: 12, scale: 2 }).default('0'),
	shipping: decimal('shipping', { precision: 12, scale: 2 }).default('0'),
	discount: decimal('discount', { precision: 12, scale: 2 }).default('0'),
	total: decimal('total', { precision: 12, scale: 2 }).default('0'),
	itemCount: integer('item_count').default(0),
	currency: varchar('currency', { length: 3 }).default('USD'),
	couponId: integer('coupon_id').references(() => coupons.id, { onDelete: 'set null' }),
	shippingMethodId: integer('shipping_method_id').references(() => shippingMethods.id, {
		onDelete: 'set null'
	}),
	status: varchar('status', { length: 20 }).default('active'),
	expiresAt: timestamp('expires_at'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const cartItems = pgTable('cart_items', {
	id: serial('id').primaryKey(),
	cartId: uuid('cart_id')
		.notNull()
		.references(() => cart.id, { onDelete: 'cascade' }),
	productId: integer('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }),
	quantity: integer('quantity').notNull().default(1),
	unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
	totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
	productSnapshot: jsonb('product_snapshot'),
	variantSnapshot: jsonb('variant_snapshot'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// Orders
export const orders = pgTable('orders', {
	id: serial('id').primaryKey(),
	orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
	userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 20 }),
	subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
	tax: decimal('tax', { precision: 12, scale: 2 }).default('0'),
	shipping: decimal('shipping', { precision: 12, scale: 2 }).default('0'),
	discount: decimal('discount', { precision: 12, scale: 2 }).default('0'),
	total: decimal('total', { precision: 12, scale: 2 }).notNull(),
	currency: varchar('currency', { length: 3 }).default('USD'),
	status: orderStatusEnum('status').default('pending'),
	paymentStatus: paymentStatusEnum('payment_status').default('pending'),
	fulfillmentStatus: fulfillmentStatusEnum('fulfillment_status').default('unfulfilled'),
	shippingAddress: jsonb('shipping_address'),
	billingAddress: jsonb('billing_address'),
	notes: text('notes'),
	internalNotes: text('internal_notes'),
	trackingNumber: varchar('tracking_number', { length: 100 }),
	trackingUrl: text('tracking_url'),
	processedAt: timestamp('processed_at'),
	couponId: integer('coupon_id').references(() => coupons.id, { onDelete: 'set null' }),
	shippingMethodId: integer('shipping_method_id').references(() => shippingMethods.id, {
		onDelete: 'set null'
	}),
	shippedAt: timestamp('shipped_at'),
	deliveredAt: timestamp('delivered_at'),
	cancelledAt: timestamp('cancelled_at'),
	cancellationReason: text('cancellation_reason'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const orderItems = pgTable('order_items', {
	id: serial('id').primaryKey(),
	orderId: integer('order_id')
		.notNull()
		.references(() => orders.id, { onDelete: 'cascade' }),
	productId: integer('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'restrict' }),
	variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'restrict' }),
	quantity: integer('quantity').notNull(),
	unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
	totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
	productSnapshot: jsonb('product_snapshot'),
	variantSnapshot: jsonb('variant_snapshot'),
	fulfillmentStatus: fulfillmentStatusEnum('fulfillment_status').default('unfulfilled'),
	createdAt: timestamp('created_at').defaultNow()
});

// Reviews
export const reviews = pgTable('reviews', {
	id: serial('id').primaryKey(),
	productId: integer('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	orderId: integer('order_id').references(() => orders.id, { onDelete: 'set null' }),
	rating: integer('rating').notNull(),
	title: varchar('title', { length: 255 }),
	content: text('content'),
	pros: text('pros'),
	cons: text('cons'),
	isVerified: boolean('is_verified').default(false),
	isApproved: boolean('is_approved').default(true),
	helpfulCount: integer('helpful_count').default(0),
	images: jsonb('images'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// Wishlist
export const wishlist = pgTable('wishlist', {
	id: serial('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	productId: integer('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }),
	notes: text('notes'),
	createdAt: timestamp('created_at').defaultNow()
});

// Inventory Management
export const inventoryTransactions = pgTable('inventory_transactions', {
	id: serial('id').primaryKey(),
	productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }),
	variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }),
	type: inventoryTransactionTypeEnum('type').notNull(),
	quantity: integer('quantity').notNull(),
	previousStock: integer('previous_stock').notNull(),
	newStock: integer('new_stock').notNull(),
	reference: varchar('reference', { length: 255 }),
	reason: text('reason'),
	notes: text('notes'),
	performedBy: text('performed_by'),
	createdAt: timestamp('created_at').defaultNow()
});

// Coupons & Discounts
export const coupons = pgTable('coupons', {
	id: serial('id').primaryKey(),
	code: varchar('code', { length: 50 }).notNull().unique(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	type: couponTypeEnum('type').notNull(),
	value: decimal('value', { precision: 12, scale: 2 }).notNull(),
	minOrderAmount: decimal('min_order_amount', { precision: 12, scale: 2 }),
	maxDiscountAmount: decimal('max_discount_amount', { precision: 12, scale: 2 }),
	usageLimit: integer('usage_limit'),
	usageCount: integer('usage_count').default(0),
	userUsageLimit: integer('user_usage_limit').default(1),
	startsAt: timestamp('starts_at').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const couponUsage = pgTable('coupon_usage', {
	id: serial('id').primaryKey(),
	couponId: integer('coupon_id')
		.notNull()
		.references(() => coupons.id, { onDelete: 'cascade' }),
	userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
	orderId: integer('order_id').references(() => orders.id, { onDelete: 'cascade' }),
	discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }).notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

// Shipping Methods
export const shippingMethods = pgTable('shipping_methods', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	code: varchar('code', { length: 50 }).notNull().unique(),
	description: text('description'),
	carrier: varchar('carrier', { length: 50 }),
	type: shippingTypeEnum('type').notNull(),
	baseRate: decimal('base_rate', { precision: 12, scale: 2 }).notNull(),
	ratePerKg: decimal('rate_per_kg', { precision: 12, scale: 2 }).default('0'),
	freeShippingThreshold: decimal('free_shipping_threshold', { precision: 12, scale: 2 }),
	minDeliveryDays: integer('min_delivery_days').notNull(),
	maxDeliveryDays: integer('max_delivery_days').notNull(),
	maxWeight: decimal('max_weight', { precision: 8, scale: 2 }),
	isActive: boolean('is_active').default(true),
	sortOrder: integer('sort_order').default(0),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const shippingZones = pgTable('shipping_zones', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	countries: jsonb('countries').notNull(),
	states: jsonb('states'),
	shippingMethodId: integer('shipping_method_id')
		.notNull()
		.references(() => shippingMethods.id, { onDelete: 'cascade' }),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow()
});

// Payment Methods
export const paymentMethods = pgTable('payment_methods', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	code: varchar('code', { length: 50 }).notNull().unique(),
	type: paymentMethodTypeEnum('type').notNull(),
	provider: varchar('provider', { length: 50 }).notNull(),
	isActive: boolean('is_active').default(true),
	settings: jsonb('settings'),
	sortOrder: integer('sort_order').default(0),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const userPaymentMethods = pgTable('user_payment_methods', {
	id: serial('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	paymentMethodId: integer('payment_method_id')
		.notNull()
		.references(() => paymentMethods.id, { onDelete: 'cascade' }),
	providerCustomerId: varchar('provider_customer_id', { length: 255 }),
	providerPaymentMethodId: varchar('provider_payment_method_id', { length: 255 }),
	cardLast4: varchar('card_last_4', { length: 4 }),
	cardBrand: varchar('card_brand', { length: 50 }),
	cardExpMonth: integer('card_exp_month'),
	cardExpYear: integer('card_exp_year'),
	isDefault: boolean('is_default').default(false),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const paymentTransactions = pgTable('payment_transactions', {
	id: serial('id').primaryKey(),
	orderId: integer('order_id')
		.notNull()
		.references(() => orders.id, { onDelete: 'cascade' }),
	paymentMethodId: integer('payment_method_id')
		.notNull()
		.references(() => paymentMethods.id, { onDelete: 'restrict' }),
	providerTransactionId: varchar('provider_transaction_id', { length: 255 }),
	amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
	currency: varchar('currency', { length: 3 }).default('USD'),
	status: transactionStatusEnum('status').notNull(),
	type: transactionTypeEnum('type').notNull(),
	gatewayResponse: jsonb('gateway_response'),
	failureReason: text('failure_reason'),
	processedAt: timestamp('processed_at'),
	createdAt: timestamp('created_at').defaultNow()
});

// Returns & Refunds
export const returnReasons = pgTable('return_reasons', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	requiresApproval: boolean('requires_approval').default(false),
	isActive: boolean('is_active').default(true),
	sortOrder: integer('sort_order').default(0),
	createdAt: timestamp('created_at').defaultNow()
});

export const returnRequests = pgTable('return_requests', {
	id: serial('id').primaryKey(),
	returnNumber: varchar('return_number', { length: 50 }).notNull().unique(),
	orderId: integer('order_id')
		.notNull()
		.references(() => orders.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	reasonId: integer('reason_id')
		.notNull()
		.references(() => returnReasons.id, { onDelete: 'restrict' }),
	status: returnStatusEnum('status').default('pending'),
	type: returnTypeEnum('type').notNull(),
	customerNotes: text('customer_notes'),
	adminNotes: text('admin_notes'),
	refundAmount: decimal('refund_amount', { precision: 12, scale: 2 }),
	restockingFee: decimal('restocking_fee', { precision: 12, scale: 2 }).default('0'),
	approvedAt: timestamp('approved_at'),
	completedAt: timestamp('completed_at'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const returnItems = pgTable('return_items', {
	id: serial('id').primaryKey(),
	returnId: integer('return_id')
		.notNull()
		.references(() => returnRequests.id, { onDelete: 'cascade' }),
	orderItemId: integer('order_item_id')
		.notNull()
		.references(() => orderItems.id, { onDelete: 'cascade' }),
	quantity: integer('quantity').notNull(),
	condition: varchar('condition', { length: 50 }),
	reason: text('reason'),
	refundAmount: decimal('refund_amount', { precision: 12, scale: 2 }),
	createdAt: timestamp('created_at').defaultNow()
});

// Enhanced Inventory Management
export const suppliers = pgTable('suppliers', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	code: varchar('code', { length: 50 }).notNull().unique(),
	contactEmail: varchar('contact_email', { length: 255 }),
	contactPhone: varchar('contact_phone', { length: 20 }),
	address: jsonb('address'),
	paymentTerms: varchar('payment_terms', { length: 100 }),
	leadTimeDays: integer('lead_time_days').default(7),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const productSuppliers = pgTable('product_suppliers', {
	id: serial('id').primaryKey(),
	productId: integer('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	supplierId: integer('supplier_id')
		.notNull()
		.references(() => suppliers.id, { onDelete: 'cascade' }),
	supplierSku: varchar('supplier_sku', { length: 100 }),
	costPrice: decimal('cost_price', { precision: 12, scale: 2 }),
	minOrderQuantity: integer('min_order_quantity').default(1),
	leadTimeDays: integer('lead_time_days').default(7),
	isPrimary: boolean('is_primary').default(false),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const stockAlerts = pgTable('stock_alerts', {
	id: serial('id').primaryKey(),
	productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }),
	variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }),
	type: stockAlertTypeEnum('type').notNull(),
	threshold: integer('threshold').notNull(),
	currentStock: integer('current_stock').notNull(),
	isResolved: boolean('is_resolved').default(false),
	resolvedAt: timestamp('resolved_at'),
	createdAt: timestamp('created_at').defaultNow()
});

// Type exports
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type UserAddress = typeof userAddresses.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type ProductType = typeof productTypes.$inferSelect;
export type ProductAttribute = typeof productAttributes.$inferSelect;
export type AttributeValue = typeof attributeValues.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type VariantAttribute = typeof variantAttributes.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type Cart = typeof cart.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type WishlistItem = typeof wishlist.$inferSelect;
export type InventoryTransaction = typeof inventoryTransactions.$inferSelect;
export type Coupon = typeof coupons.$inferSelect;
export type CouponUsage = typeof couponUsage.$inferSelect;
export type ShippingMethod = typeof shippingMethods.$inferSelect;
export type ShippingZone = typeof shippingZones.$inferSelect;
export type PaymentMethod = typeof paymentMethods.$inferSelect;
export type UserPaymentMethod = typeof userPaymentMethods.$inferSelect;
export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type ReturnReason = typeof returnReasons.$inferSelect;
export type ReturnRequest = typeof returnRequests.$inferSelect;
export type ReturnItem = typeof returnItems.$inferSelect;
export type Supplier = typeof suppliers.$inferSelect;
export type ProductSupplier = typeof productSuppliers.$inferSelect;
export type StockAlert = typeof stockAlerts.$inferSelect;

// Insert types
export type NewProduct = typeof products.$inferInsert;
export type NewProductVariant = typeof productVariants.$inferInsert;
export type NewOrder = typeof orders.$inferInsert;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type NewCartItem = typeof cartItems.$inferInsert;
export type NewReview = typeof reviews.$inferInsert;
