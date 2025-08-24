<script lang="ts">
	const data = $props();
	const { form } = data;

	import SocialAuthButton from '$lib/components/auth/SocialAuthButton.svelte';

	let showPassword = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div
		class="w-full max-w-md space-y-8 rounded-[8px] border
	border-[#DDDAD0] bg-[#EEEDEB] p-8"
	>
		<div class="text-center">
			<a href="/"> <i class="text-2xl font-bold">TEKER</i></a>
			<p class="text-md pt-2 text-[#3D3B40]">Sign in to you account</p>
		</div>
		<form method="POST" class="space-y-4">
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				required
				class="w-full rounded-[4px] border border-[#DDDAD0] bg-[#F2F2F2] p-2 px-4 focus:outline-none"
			/>

			<div class="flex justify-between rounded-[4px] border border-[#DDDAD0] bg-[#F2F2F2] p-2 px-4">
				<input
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					placeholder="Password"
					required
					class="w-full focus:outline-none"
				/>
				<button
					type="button"
					class="ml-4 cursor-pointer text-[#c9c6bb]
					hover:text-[#b2afa6]"
					onclick={() => (showPassword = !showPassword)}
					tabindex="-1"
				>
					{#if showPassword}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					{/if}
				</button>
			</div>

			<button
				type="submit"
				class="w-full cursor-pointer gap-2 rounded-[4px] border border-[#C62300] bg-[#FC4100] p-2 px-4 text-[#fff]"
			>
				Login
			</button>

			<div class="relative">
				<hr class="border-[#DDDAD0]" />
				<span
					class="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-[#EEEDEB] px-2 text-sm text-[#DDDAD0]"
				>
					or
				</span>
			</div>
			<SocialAuthButton provider="google" />
		</form>

		<div class="space-y-4 text-center">
			<p class="text-[#3D3B40]">
				Don't have an account?
				<a href="/register" class="pl-2 hover:text-[#FC4100]"> Register </a>
			</p>
			{#if form?.errorMessage}
				<p
					class="rounded-[4px] border bg-red-400/15 px-4 py-2
					text-red-400"
				>
					{form.errorMessage}
				</p>
			{/if}
		</div>
	</div>
</div>
