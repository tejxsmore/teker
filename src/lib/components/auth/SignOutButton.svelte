<script lang="ts">
	import { signOut } from '$lib/auth-client';
	import { userStore } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	async function handleSignOut() {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					$userStore = null;
					goto('/auth/signin');
				}
			}
		});
	}
</script>

<button
	onclick={handleSignOut}
	class="inline-flex cursor-pointer rounded-xl border-2 px-4 py-1.5 font-semibold whitespace-nowrap text-[#ff0000]"
>
	Sign Out
</button>
