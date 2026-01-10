<script lang="ts">
	import { userStore } from '$lib/stores/user';
	import { signOut } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let isDropdownOpen = $state(false);
	let isCategoriesOpen = $state(false);
	let isBrandsOpen = $state(false);

	const categories = {
		'Consumer Electronics': ['Smartphones', 'Tablets', 'Smartwatches', 'E-Readers'],
		'Computer & Accessories': ['Laptops', 'Desktops', 'Monitors', 'Keyboards', 'Mice', 'Webcams'],
		'Home Audio': ['Headphones', 'Earbuds', 'Speakers', 'Soundbars', 'Home Theater'],
		Photography: ['Cameras', 'Lenses', 'Tripods', 'Camera Accessories', 'Drones'],
		'Storage & Networking': [
			'External Drives',
			'SSDs',
			'NAS',
			'Routers',
			'Modems',
			'WiFi Extenders'
		],
		Wearables: ['Fitness Trackers', 'Smart Glasses', 'Smart Rings'],
		Gaming: [
			'Gaming Consoles',
			'Controllers',
			'Gaming Headsets',
			'Gaming Keyboards',
			'Gaming Mice'
		],
		'Smart Home': [
			'Smart Displays',
			'Security Cameras',
			'Smart Lights',
			'Smart Locks',
			'Thermostats'
		]
	};

	const brands = [
		'Apple',
		'Samsung',
		'Sony',
		'Dell',
		'HP',
		'Lenovo',
		'Asus',
		'LG',
		'Microsoft',
		'Google',
		'OnePlus',
		'Xiaomi',
		'Razer',
		'Canon',
		'Nikon',
		'Bose',
		'JBL',
		'Logitech'
	];

	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const closeDropdown = () => {
		isDropdownOpen = false;
	};

	const handleClickOutside = (event: any) => {
		const dropdown = document.getElementById('profile-dropdown');
		const button = document.getElementById('profile-button');

		if (dropdown && button && !dropdown.contains(event.target) && !button.contains(event.target)) {
			closeDropdown();
		}
	};

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					$userStore = null;
					goto('/auth/signin');
				}
			}
		});
	};
</script>

<svelte:window on:click={handleClickOutside} />

<nav
	class="flex items-center justify-between border-[#DCDCDC] bg-white px-3 pt-3 md:border-b md:p-3 lg:px-20 xl:px-40"
>
	<div class="flex items-center gap-6">
		<a href="/" class="text-xl font-semibold focus:outline-none">TEKER</a>

		<div class="hidden items-center font-medium text-[#707070] md:flex">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative"
				onmouseenter={() => (isCategoriesOpen = true)}
				onmouseleave={() => (isCategoriesOpen = false)}
			>
				<a
					href="/categories"
					class="block px-4 py-2 transition-colors duration-200 hover:text-[#2B2A2A] {isCategoriesOpen
						? 'text-[#2B2A2A]'
						: ''}"
				>
					Categories
				</a>

				<!-- Invisible hover extension area with cursor pointer -->
				<div class="absolute top-full left-0 h-4 w-full cursor-pointer"></div>

				{#if isCategoriesOpen}
					<div
						class="absolute top-full left-0 z-50 mt-2 w-180 rounded-xl border border-[#DCDCDC] bg-white shadow-sm"
					>
						<div class="grid grid-cols-3 gap-6 p-3">
							{#each Object.entries(categories) as [categoryName, items]}
								<div class="space-y-3">
									<h3 class="text-sm font-semibold tracking-wide text-[#2B2A2A] uppercase">
										{categoryName}
									</h3>
									<div class="space-y-0.5">
										{#each items as item}
											<a
												href="/categories/{item.toLowerCase().replace(/\s+/g, '-')}"
												class="block cursor-pointer py-0.5 text-sm font-medium transition-colors duration-200 hover:text-[#F21B3F]"
											>
												{item}
											</a>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative"
				onmouseenter={() => (isBrandsOpen = true)}
				onmouseleave={() => (isBrandsOpen = false)}
			>
				<a
					href="/brands"
					class="block px-4 py-2 transition-colors duration-200 hover:text-[#2B2A2A] {isBrandsOpen
						? 'text-[#2B2A2A]'
						: ''}"
				>
					Brands
				</a>

				<!-- Invisible hover extension area with cursor pointer -->
				<div class="absolute top-full left-0 h-4 w-full cursor-pointer"></div>

				{#if isBrandsOpen}
					<div
						class="absolute top-full left-0 z-50 mt-2 w-120 rounded-xl border border-[#DCDCDC] bg-white shadow-sm"
					>
						<div class="grid grid-cols-3 gap-1 p-3">
							{#each brands as brand}
								<a
									href="/brands/{brand.toLowerCase()}"
									class="block cursor-pointer py-0.5 text-sm font-medium transition-colors duration-200 hover:text-[#F21B3F]"
								>
									{brand}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<a href="/feed" class="px-4 py-2 transition-colors duration-200 hover:text-[#2B2A2A]">Feed</a>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<div class="">
			<a
				href="/cart"
				aria-label="Cart icon"
				class="hidden items-center gap-3 rounded-xl border border-[#DCDCDC] p-2.25 transition-colors duration-200 hover:bg-[#faf9f9] md:flex"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="20px"
					height="20px"
					viewBox="0 0 18 18"
					><path
						d="M6.75,4.75v-1.75c0-1.243,1.007-2.25,2.25-2.25h0c1.243,0,2.25,1.007,2.25,2.25v1.75"
						fill="#fedfe5"
						stroke="rgba(242, 27, 63, 1)"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						data-color="color-2"
					></path><path
						d="M5.334,4.75h7.333c1.037,0,1.903,.793,1.992,1.827l.652,7.5c.102,1.169-.82,2.173-1.992,2.173H4.681c-1.173,0-2.094-1.005-1.992-2.173l.652-7.5c.09-1.034,.955-1.827,1.992-1.827Z"
						fill="#fedfe5"
						stroke="rgba(242, 27, 63, 1)"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
					></path>
				</svg>
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
			<div class="relative">
				<button
					id="profile-button"
					onclick={toggleDropdown}
					class="cursor-pointer rounded-xl border-2 border-[#fc758b] bg-[#F21B3F] p-2.25 font-semibold text-white transition-colors duration-200 hover:bg-[#f73253]"
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

				{#if isDropdownOpen}
					<div
						id="profile-dropdown"
						class="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-[#DCDCDC] bg-white text-[#707070] shadow-sm"
					>
						<div class="p-1">
							<a
								href="/user/profile"
								class="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-[#faf9f9] hover:text-[#2B2A2A]"
								onclick={closeDropdown}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="16px"
									height="16px"
									viewBox="0 0 18 18"
									><circle
										cx="9"
										cy="4.5"
										r="2.75"
										fill="#DCDCDC"
										stroke="rgba(112, 112, 112, 1)"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										data-color="color-2"
									></circle><path
										d="M13.762,15.516c.86-.271,1.312-1.221,.947-2.045-.97-2.191-3.159-3.721-5.709-3.721s-4.739,1.53-5.709,3.721c-.365,.825,.087,1.774,.947,2.045,1.225,.386,2.846,.734,4.762,.734s3.537-.348,4.762-.734Z"
										fill="#DCDCDC"
										stroke="rgba(112, 112, 112, 1)"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
									></path>
								</svg>
								Profile
							</a>
							<a
								href="/orders"
								class="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-[#faf9f9] hover:text-[#2B2A2A]"
								onclick={closeDropdown}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="16px"
									height="16px"
									viewBox="0 0 18 18"
									><path
										d="M6.75,4.75v-1.75c0-1.243,1.007-2.25,2.25-2.25h0c1.243,0,2.25,1.007,2.25,2.25v1.75"
										fill="#DCDCDC"
										stroke="rgba(112, 112, 112, 1)"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										data-color="color-2"
									></path><path
										d="M5.334,4.75h7.333c1.037,0,1.903,.793,1.992,1.827l.652,7.5c.102,1.169-.82,2.173-1.992,2.173H4.681c-1.173,0-2.094-1.005-1.992-2.173l.652-7.5c.09-1.034,.955-1.827,1.992-1.827Z"
										fill="#DCDCDC"
										stroke="rgba(112, 112, 112, 1)"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
									></path>
								</svg>
								My Orders
							</a>
							<a
								href="/wishlist"
								class="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-[#faf9f9] hover:text-[#2B2A2A]"
								onclick={closeDropdown}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="16px"
									height="16px"
									fill="#DCDCDC"
									viewBox="0 0 18 18"
									><path
										d="M8.529,15.222c.297,.155,.644,.155,.941,0,1.57-.819,6.529-3.787,6.529-8.613,.008-2.12-1.704-3.846-3.826-3.859-1.277,.016-2.464,.66-3.173,1.72-.71-1.06-1.897-1.704-3.173-1.72-2.123,.013-3.834,1.739-3.826,3.859,0,4.826,4.959,7.794,6.529,8.613Z"
										fill="#DCDCDC"
										stroke="rgba(112, 112, 112, 1)"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
									></path>
								</svg>
								Wishlist
							</a>
							<a
								href="/user/settings"
								class="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-[#faf9f9] hover:text-[#2B2A2A]"
								onclick={closeDropdown}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill="#DCDCDC"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="#707070"
									width="16px"
									height="16px"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
								</svg>
								Settings
							</a>
							<div class="my-1 border-t border-[#DCDCDC]"></div>

							<button
								class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-1.5 text-left text-sm font-medium text-[#F21B3F] transition-colors duration-200 hover:bg-[#faeaed]"
								onclick={handleSignOut}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="16px"
									height="16px"
									viewBox="0 0 18 18"
									><path
										d="M11.75,11.5c-.414,0-.75,.336-.75,.75v2.5c0,.138-.112,.25-.25,.25H5.448l1.725-1.069c.518-.322,.827-.878,.827-1.487V5.557c0-.609-.31-1.166-.827-1.487l-1.725-1.069h5.302c.138,0,.25,.112,.25,.25v2.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75V3.25c0-.965-.785-1.75-1.75-1.75H4.25c-.965,0-1.75,.785-1.75,1.75V14.75c0,.965,.785,1.75,1.75,1.75h6.5c.965,0,1.75-.785,1.75-1.75v-2.5c0-.414-.336-.75-.75-.75Z"
										fill="rgba(242, 27, 63, 1)"
									></path><path
										d="M17.78,8.47l-2.75-2.75c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l1.47,1.47h-4.189c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h4.189l-1.47,1.47c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l2.75-2.75c.293-.293,.293-.768,0-1.061Z"
										fill="rgba(242, 27, 63, 1)"
										data-color="color-2"
									></path></svg
								>
								Sign Out
							</button>
						</div>
					</div>
				{/if}
			</div>
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
	class="sticky top-0 z-20 flex border-b border-[#DCDCDC] bg-white p-3 md:hidden md:border-b-0 md:px-20 lg:px-40 xl:px-60"
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
