<script lang="ts">
	const { data } = $props();
	const { items } = data;
</script>

<div class="p-4">
	{#each items as item}
		<a href={`/products/${item.slug}`}>
			<h1>{item.name}</h1>
		</a>
	{/each}
</div>
