<script>
	import { userStore } from '$lib/stores/user';
	let wishlistItems = $state(0);
</script>

<nav
	class="flex items-center justify-between border-[#DCDCDC] bg-white px-3 pt-3 md:border-b md:p-3 lg:px-20 xl:px-40"
>
	<div class="flex items-center gap-6">
		<a href="/" class="text-xl font-semibold focus:outline-none">TEKER</a>

		<div class="hidden items-center font-medium text-[#707070] md:flex">
			<a href="/categories" class="px-4 transition-colors duration-200 hover:text-[#2B2A2A]"
				>Categories
			</a>
			<a href="/brands" class="h-full px-4 transition-colors duration-200 hover:text-[#2B2A2A]"
				>Brands</a
			>
			<a href="/feed" class="px-4 transition-colors duration-200 hover:text-[#2B2A2A]">Feed</a>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<div class="flex items-center gap-5 p-2.25">
			<a href="/wishlist" aria-label="Wishlist icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="20px"
					height="20px"
					viewBox="0 0 18 18"
					><path
						d="M8.529,15.222c.297,.155,.644,.155,.941,0,1.57-.819,6.529-3.787,6.529-8.613,.008-2.12-1.704-3.846-3.826-3.859-1.277,.016-2.464,.66-3.173,1.72-.71-1.06-1.897-1.704-3.173-1.72-2.123,.013-3.834,1.739-3.826,3.859,0,4.826,4.959,7.794,6.529,8.613Z"
						fill="none"
						stroke="rgba(43, 42, 42, 1)"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
					></path></svg
				>
			</a>
			<a href="/cart" aria-label="Cart icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="20px"
					height="20px"
					viewBox="0 0 18 18"
					><path
						d="M6.75,4.75v-1.75c0-1.243,1.007-2.25,2.25-2.25h0c1.243,0,2.25,1.007,2.25,2.25v1.75"
						fill="none"
						stroke="rgba(43, 42, 42, 1)"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						data-color="color-2"
					></path><path
						d="M5.334,4.75h7.333c1.037,0,1.903,.793,1.992,1.827l.652,7.5c.102,1.169-.82,2.173-1.992,2.173H4.681c-1.173,0-2.094-1.005-1.992-2.173l.652-7.5c.09-1.034,.955-1.827,1.992-1.827Z"
						fill="none"
						stroke="rgba(43, 42, 42, 1)"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
					></path></svg
				>
			</a>
		</div>
		<div
			class="hidden w-full items-center rounded-xl border border-[#DCDCDC] bg-[#f1f0f0] p-1.75 pl-4 focus:border-[#2B2A2A] focus:outline-none md:flex"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="16px"
				height="16px"
				viewBox="0 0 18 18"
				class="mt-px"
				><path
					d="M15.75 15.75L11.6386 11.6386"
					stroke="#afafaf"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					data-color="color-2"
					fill="none"
				></path>
				<path
					d="M7.75 13.25C10.7875 13.25 13.25 10.7875 13.25 7.75C13.25 4.7125 10.7875 2.25 7.75 2.25C4.7125 2.25 2.25 4.7125 2.25 7.75C2.25 10.7875 4.7125 13.25 7.75 13.25Z"
					stroke="#afafaf"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				></path></svg
			>
			<input
				type="text"
				placeholder="Samsung s25 ultra"
				class="ml-4 w-full rounded-r-full font-medium placeholder:text-[#afafaf] focus:outline-none"
			/>
		</div>
		{#if $userStore}
			<button
				class="hidden cursor-pointer rounded-xl border-2 border-[#fc758b] bg-[#F21B3F] p-2.25 font-semibold text-white transition-colors duration-200 hover:bg-[#f73253] md:flex"
				aria-label="User profile icon"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="20px"
					height="20px"
					viewBox="0 0 18 18"
					><path
						d="M2.60518 13.1674C3.69058 10.7157 6.14168 9 8.99999 9C11.7634 9 14.1462 10.6037 15.2822 12.9257C15.3564 13.0774 15.4289 13.2326 15.4797 13.3894C15.8649 14.5805 15.1811 15.8552 13.9874 16.2313C12.705 16.6354 11.0072 17 8.99999 17C6.99283 17 5.29503 16.6354 4.01259 16.2313C2.74425 15.8317 2.05162 14.4186 2.60518 13.1674Z"
						fill="rgba(255, 255, 255, 1)"
					></path>
					<path
						d="M9 7.50049C10.7952 7.50049 12.25 6.04543 12.25 4.25049C12.25 2.45554 10.7952 1.00049 9 1.00049C7.20482 1.00049 5.75 2.45554 5.75 4.25049C5.75 6.04543 7.20482 7.50049 9 7.50049Z"
						fill="rgba(255, 255, 255, 1)"
						data-color="color-2"
					></path></svg
				>
			</button>
		{:else}
			<a
				href="/auth/signin"
				class="inline-flex cursor-pointer rounded-xl border-2 border-[#fc758b] bg-[#F21B3F] px-4 py-1.5 font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#f73253]"
			>
				Sign In</a
			>
		{/if}
	</div>
</nav>

<div
	class="sticky top-0 flex border-b border-[#DCDCDC] bg-white p-3 md:hidden md:border-b-0 md:px-20 lg:px-40 xl:px-60"
>
	<div
		class=" flex w-full items-center rounded-xl border border-[#DCDCDC] bg-[#f1f0f0] p-1.75 pl-4 focus:border-[#2B2A2A] focus:outline-none md:hidden"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="16px"
			height="16px"
			viewBox="0 0 18 18"
			class="mt-px"
			><path
				d="M15.75 15.75L11.6386 11.6386"
				stroke="#afafaf"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				data-color="color-2"
				fill="none"
			></path>
			<path
				d="M7.75 13.25C10.7875 13.25 13.25 10.7875 13.25 7.75C13.25 4.7125 10.7875 2.25 7.75 2.25C4.7125 2.25 2.25 4.7125 2.25 7.75C2.25 10.7875 4.7125 13.25 7.75 13.25Z"
				stroke="#afafaf"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
			></path></svg
		>
		<input
			type="text"
			placeholder="Samsung s25 ultra"
			class="ml-4 w-full rounded-r-full font-medium placeholder:text-[#afafaf] focus:outline-none"
		/>
	</div>
</div>
