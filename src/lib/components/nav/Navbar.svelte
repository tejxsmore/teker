<script>
	import { userStore } from '$lib/stores/user';
</script>

<div class="flex items-center justify-between p-4">
	<div>
		<a href="/"> <i class="text-4xl font-bold">TE<span class="text-[#ffd500]">K</span>ER</i></a>
	</div>
	<div>
		{#if $userStore}
			<a href="/profile" class="">Profile</a>
		{:else}
			<a href="/login" class="border border-[#fdc500] bg-[#ffd500] p-2 px-4 text-[#212529]">Login</a
			>
		{/if}
	</div>
</div>
