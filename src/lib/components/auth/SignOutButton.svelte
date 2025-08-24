<script lang="ts">
	import { signOut } from '$lib/auth-client';
	import { userStore } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	async function handleSignOut() {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					$userStore = null;
					goto('/login');
				}
			}
		});
	}
</script>

<button
	onclick={handleSignOut}
	class="cursor-pointer rounded-[10px] border border-red-400 bg-red-400/40 px-5 py-2.5"
>
	Sign Out
</button>
