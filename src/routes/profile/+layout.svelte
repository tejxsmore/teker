<script lang="ts">
	let { children, data } = $props();
	import Navbar from '$lib/components/nav/Navbar.svelte';
</script>

<Navbar />
{@render children()}
