<script>
	import { userStore } from '$lib/stores/user';
</script>

<div class="flex justify-between p-3">
	<div>
		<h1 class="text-2xl font-bold">Teker</h1>
	</div>
	<div>
		{#if $userStore}
			<a href="/profile" class="">Profile</a>
		{:else}
			<a href="/login" class="">Login</a>
		{/if}
	</div>
</div>
