<script>
	import { userStore } from '$lib/stores/user';
</script>

<div
	class="flex items-center gap-2 bg-[#21825C] p-2 text-sm font-medium text-white lg:px-20 xl:px-40"
>
	Announcements <span
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-megaphone-icon lucide-megaphone"
			><path
				d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
			/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" /><path
				d="M8 6v8"
			/></svg
		></span
	>
</div>
<nav
	class="flex items-center justify-between border-[#eee] p-2
	md:border-b lg:px-20 xl:px-40"
>
	<div>
		<a href="/" class="text-xl font-semibold">Teker</a>
	</div>

	<div class="flex items-center gap-2">
		<div class="flex items-center gap-6 p-2.5 text-[#404040]">
			<a href="/wishlist" aria-label="Wishlist icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-heart-icon lucide-heart"
					><path
						d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
					/></svg
				>
			</a>
			<a href="/cart" aria-label="Cart icon" class="hidden md:flex">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-shopping-cart-icon lucide-shopping-cart"
					><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path
						d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
					/></svg
				>
			</a>
		</div>
		<div
			class="hidden w-full items-center rounded-xl border border-[#eee] bg-[#f6f6f6] px-4 py-2 focus:border-[#ccc] focus:outline-none md:flex"
		>
			<span
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#777777"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-search-icon lucide-search"
					><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg
				></span
			>
			<input type="text" placeholder="Samsung s25 ultra" class="w-full px-4 focus:outline-none" />
		</div>
		{#if $userStore}
			<button
				class="hidden cursor-pointer rounded-xl bg-[#21825C] p-2.5 text-center font-medium text-white transition-colors duration-200 hover:bg-[#2f966d] md:flex"
				aria-label="User profile icon"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-icon lucide-user"
					><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle
						cx="12"
						cy="7"
						r="4"
					/></svg
				>
			</button>
		{:else}
			<a
				href="/login"
				class="rounded-xl bg-[#21825C] px-5 py-2 font-medium text-white
		    transition-colors duration-200 hover:bg-[#2f966d]">Login</a
			>
		{/if}
	</div>
</nav>
<div class="border-b border-[#eee] p-2 pt-0 md:border-b-0 md:px-20 lg:px-40 xl:px-60">
	<div
		class="flex w-full items-center rounded-xl border border-[#eee] bg-[#f6f6f6] px-4 py-2 focus:border-[#ccc] focus:outline-none md:hidden"
	>
		<span
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#777777"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-search-icon lucide-search"
				><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg
			></span
		>
		<input type="text" placeholder="Samsung s25 ultra" class="w-full px-4 focus:outline-none" />
	</div>
</div>
