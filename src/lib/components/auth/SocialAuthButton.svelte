<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import type { Snippet } from 'svelte';

	let {
		children,
		provider,
		callbackURL = '/jobs'
	}: {
		children: Snippet;
		provider: 'google';
		callbackURL?: string;
	} = $props();
</script>

<button
	class="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#393E46] p-2.5"
	onclick={async () => {
		await signIn.social({
			provider,
			callbackURL
		});
	}}
>
	<img src="/google.png" alt="google logo" class="h-5 w-5" />
	{@render children()}
</button>
