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
	class="inline-flex cursor-pointer rounded-xl border-2 border-[#f73253] bg-[#fde0e6] px-4 py-1.5 font-semibold whitespace-nowrap text-[#f73253] transition-colors duration-200 hover:bg-[#fdd8e1]"
>
	Sign Out
</button>
