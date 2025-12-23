<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { userStore } from '$lib/stores/user';

	let { children, data } = $props();

	$effect(() => {
		$userStore = data.user!;
	});
</script>

<svelte:head>
	<title>Teker</title>
	<meta
		name="description"
		content="India's np. 1 tech marketplace. Find all products from smartphones, laptops, home audio and much more."
	/>
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

{@render children()}
