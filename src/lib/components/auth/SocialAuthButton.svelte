<script lang="ts">
	import { signIn } from '$lib/auth-client';

	let {
		provider,
		callbackURL = '/'
	}: {
		provider: 'google';
		callbackURL?: string;
	} = $props();
</script>

<button
	type="button"
	class="flex w-full cursor-pointer items-center justify-center gap-2
	border border-[#2E2B2B] bg-transparent px-4 py-2 transition-colors duration-200 hover:bg-[#000000]/10"
	onclick={async () => {
		await signIn.social({
			provider,
			callbackURL
		});
	}}
>
	<img src={`/${provider}.png`} alt={`${provider} logo`} class="h-6 w-6" />
	Google
</button>
