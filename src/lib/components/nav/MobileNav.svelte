<script lang="ts">
	import { page } from '$app/state';
	const currentPath = $derived(page.url.pathname);

	const navItems = [
		{ id: 'home', label: 'Home', href: '/' },
		{ id: 'products', label: 'Products', href: '/products' },
		{ id: 'brands', label: 'Brands', href: '/brands' },
		{ id: 'profile', label: 'Profile', href: '/profile' }
	];

	// Function to determine if a nav item is active
	function isActive(href: string): boolean {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(href);
	}

	// Add/remove body class when component mounts/unmounts
	$effect(() => {
		document.body.classList.add('has-mobile-nav');
		return () => {
			document.body.classList.remove('has-mobile-nav');
		};
	});
</script>

<nav
	class="fixed right-0 bottom-0 left-0 z-50 border-t border-[#2E2B2B]
	bg-[#212125] md:hidden"
>
	<div class="flex h-16 items-center justify-around">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex h-full flex-1 flex-col items-center justify-center space-y-1 transition-colors duration-200 {isActive(
					item.href
				)
					? 'text-[#D3D5FD]'
					: 'text-[#929AAB] hover:text-[#D3D5FD]'}"
				aria-label={item.label}
			>
				{#if item.id === 'home'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill={isActive(item.href) ? '#D3D5FD' : 'none'}
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke={isActive(item.href) ? 'none' : 'currentColor'}
						class="size-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
						/>
					</svg>
				{:else if item.id === 'products'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class="size-5"
					>
						<!-- Top face -->
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 7.5-9-5.25L3 7.5l9 5.25z"
							fill={isActive(item.href) ? '#D3D5FD' : 'none'}
							stroke={isActive(item.href) ? 'none' : 'currentColor'}
						/>
						<!-- Left face -->
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 7.5v9l9 5.25v-9z"
							fill={isActive(item.href) ? '#929AAB' : 'none'}
							stroke={isActive(item.href) ? 'none' : 'currentColor'}
						/>
						<!-- Right face -->
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 7.5v9l-9 5.25v-9z"
							fill={isActive(item.href) ? '#474A56' : 'none'}
							stroke={isActive(item.href) ? 'none' : 'currentColor'}
						/>
					</svg>
				{:else if item.id === 'brands'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill={isActive(item.href) ? '#D3D5FD' : 'none'}
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class="size-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
							stroke={isActive(item.href) ? 'none' : 'currentColor'}
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75 11.25 15 15 9.75"
							stroke={isActive(item.href) ? '#212125' : 'currentColor'}
						/>
					</svg>
				{:else if item.id === 'profile'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill={isActive(item.href) ? '#D3D5FD' : 'none'}
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke={isActive(item.href) ? 'none' : 'currentColor'}
						class="size-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
				{/if}
				<span class="text-xs font-medium">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>

<style>
	:global(body.has-mobile-nav) {
		padding-bottom: 4rem;
	}
	@media (min-width: 768px) {
		:global(body.has-mobile-nav) {
			padding-bottom: 0;
		}
	}
</style>
