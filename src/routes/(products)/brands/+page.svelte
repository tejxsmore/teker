<script lang="ts">
	const { data } = $props();
	const { brands } = data;
</script>

<div class="p-4">
	{#each brands as brand}
		<div>
			<h1>{brand.name}</h1>
		</div>
	{/each}
</div>
