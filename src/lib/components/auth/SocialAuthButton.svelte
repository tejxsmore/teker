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
	class="flex w-full cursor-pointer items-center justify-center gap-2 border
	border-[#495057] bg-transparent px-4 py-2 hover:bg-[#343a40]"
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
