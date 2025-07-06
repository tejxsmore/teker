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
	class="flex w-full items-center justify-center gap-2 border border-[#495057]
	bg-[#adb5bd] px-4 py-2"
	onclick={async () => {
		await signIn.social({
			provider,
			callbackURL
		});
	}}
>
	Sign in with Google
	<img src={`/${provider}.png`} alt={`${provider} logo`} class="h-6 w-6" />
</button>
