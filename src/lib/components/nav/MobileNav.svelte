<script lang="ts">
	import { Home, Package, BadgeCheck, User } from '@lucide/svelte';
	import { page } from '$app/state';

	const currentPath = $derived(page.url.pathname);

	const navItems = [
		{ id: 'home', label: 'Home', icon: Home, href: '/' },
		{ id: 'products', label: 'Products', icon: Package, href: '/products' },
		{ id: 'brands', label: 'Brands', icon: BadgeCheck, href: '/brands' },
		{ id: 'profile', label: 'Profile', icon: User, href: '/profile' }
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

<nav class="fixed right-0 bottom-0 left-0 z-50 border-t border-[#495057] bg-[#212529] md:hidden">
	<div class="flex h-16 items-center justify-around">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex h-full flex-1 flex-col items-center justify-center transition-colors duration-200 {isActive(
					item.href
				)
					? 'text-[#ffd500]'
					: 'text-[#6c757d] hover:text-[#adb5bd]'}"
				aria-label={item.label}
			>
				<item.icon class="mb-1 h-5 w-5" />
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
