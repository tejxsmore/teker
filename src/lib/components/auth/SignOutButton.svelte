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
	class="cursor-pointer items-center justify-center rounded-xl border border-[#B80000] bg-[#E52020]/30 px-4.5 py-1.5 text-white transition-all duration-300 hover:bg-[#C40C0C]/40 disabled:cursor-not-allowed disabled:opacity-50"
>
	Sign Out
</button>
