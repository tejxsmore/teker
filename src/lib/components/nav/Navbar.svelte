<script>
	import MobileNav from './MobileNav.svelte';
</script>

<div class="flex items-center justify-between p-4 lg:px-16">
	<div class="flex items-center gap-16">
		<a href="/" aria-label="TEKER Home">
			<i class="text-2xl font-bold">TEKER</i>
		</a>
		<div class="hidden font-medium md:block">
			<div class="flex gap-8 text-[#3D3B40]">
				<a href="/products" class="transition-colors duration-200 hover:text-[#FC4100]">Products</a>
				<a href="/brands" class="transition-colors duration-200 hover:text-[#FC4100]">Brands</a>
			</div>
		</div>
	</div>
	<div class="flex items-center gap-6 md:gap-8">
		<div class="hidden md:block">
			<div
				class="flex w-full items-center gap-4 rounded-[4px] border
				border-[#DDDAD0] bg-[#F2F2F2] px-4 py-2"
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
		<a
			href="/wishlist"
			aria-label="View Wishlist"
			class="transition-colors duration-200 hover:text-[#FC4100]"
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
			href="/bag"
			aria-label="View Shopping Bag"
			class="transition-colors duration-200 hover:text-[#FC4100]"
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
					d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
				/>
			</svg>
		</a>
	</div>
</div>
<div class="block px-4 md:hidden">
	<div
		class="flex w-full items-center gap-4 rounded-[4px]
	border border-[#DDDAD0] bg-[#F2F2F2] px-4 py-2"
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
