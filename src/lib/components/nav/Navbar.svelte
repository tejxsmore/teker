<script>
	import MobileNav from './MobileNav.svelte';
</script>

<div class="flex items-center justify-between p-4">
	<div class="flex items-center gap-8">
		<a href="/" aria-label="TEKER Home">
			<i class="text-2xl font-bold">TE<span class="text-[#ffd500]">K</span>ER</i>
		</a>
		<div class="hidden md:block">
			<div class="flex gap-8">
				<a href="/products" class="hover:text-[#ffd500]">Products</a>
				<a href="/brands" class="hover:text-[#ffd500]">Brands</a>
			</div>
		</div>
	</div>
	<div class="flex items-center gap-6 md:gap-8">
		<div class="hidden md:block">
			<div class="flex w-full items-center gap-4 border border-[#495057] bg-[#343a40] px-4 py-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="#6c757d"
					class="size-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					/>
				</svg>

				<input type="text" placeholder="iPhone 16 Pro" class="w-full focus:outline-none" />
			</div>
		</div>
		<a
			href="/wishlist"
			aria-label="View Wishlist"
			class="transition-all duration-200 hover:text-[#ffd500]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
				/>
			</svg>
		</a>
		<a
			href="/cart"
			aria-label="View Shopping Cart"
			class="transition-all duration-200 hover:text-[#ffd500]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
				/>
			</svg>
		</a>
	</div>
</div>
<div class="block px-4 md:hidden">
	<div
		class="flex w-full items-center gap-4 border
	border-[#495057] bg-[#343a40] px-4 py-2"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="#6c757d"
			class="size-4"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>

		<input type="text" placeholder="iPhone 16 Pro" class="w-full focus:outline-none" />
	</div>
</div>

<MobileNav />
