<script>
	let { data } = $props();
	const { brands } = data;

	import Navbar from '$lib/components/nav/Navbar.svelte';
	import MobileNav from '$lib/components/nav/MobileNav.svelte';
</script>

<Navbar />
<MobileNav />
<div class="min-h-screen p-3">
	{#each brands as { name, slug }}
		<div>
			<a href={`/${slug}`}>{name}</a>
		</div>
	{/each}
</div>
