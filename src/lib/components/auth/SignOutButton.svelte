<script lang="ts">
	import { signOut } from '$lib/auth-client';
	import { userStore } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	let showModal = $state(false);

	function openConfirmModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	async function confirmSignOut() {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					$userStore = null;
					goto('/login');
				}
			}
		});
	}

	function handleModalClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
		if (event.key === 'Enter' || event.key === ' ') {
			if (event.target === event.currentTarget) {
				closeModal();
			}
		}
	}
</script>

<button
	onclick={openConfirmModal}
	class="w-full cursor-pointer border border-[#950101] bg-[#3D0000] px-4 py-2 text-[#FF0000] transition-colors duration-200 hover:bg-[#810000] focus:outline-none"
>
	Log Out
</button>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
		onclick={handleModalClick}
		onkeydown={handleKeydown}
		tabindex="0"
		role="dialog"
		aria-labelledby="Confirm Log Out"
		aria-modal="true"
	>
		<div class="max-w-sm space-y-4 border border-[#2E2B2B] bg-[#212125] p-8">
			<h2 id="modal-title" class="text-lg font-semibold">Confirm Log Out</h2>
			<p class="text-[#7A7A73]">
				Are you sure you want to Log out? You'll need to log in again to access your account.
			</p>

			<div class="flex justify-between gap-4">
				<button
					onclick={closeModal}
					class="cursor-pointer border border-[#2E2B2B] px-4 py-2 transition-colors duration-200 hover:bg-[#000000]/10"
					type="button"
				>
					Cancel
				</button>
				<button
					onclick={confirmSignOut}
					class="cursor-pointer border border-[#950101] bg-[#3D0000] px-4 py-2 text-[#FF0000] transition-colors duration-200 hover:bg-[#810000]"
					type="button"
				>
					Confirm
				</button>
			</div>
		</div>
	</div>
{/if}
