<script lang="ts">
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import MobileNav from '$lib/components/nav/MobileNav.svelte';

	const { data } = $props();
	const { categories } = data;
</script>

<Navbar />
<MobileNav />

<div class="grid grid-cols-2 gap-3 p-3 md:grid-cols-4">
	{#each categories as { name, slug, icon }}
		<a
			href="/category/{slug}"
			class="flex justify-between rounded-xl border border-[#DCDCDC] bg-white p-3 text-start"
		>
			<p class="text-sm font-medium">{name}</p>
			<img src={icon} alt={name} class="h-10 w-10" />
		</a>
	{/each}
</div>
