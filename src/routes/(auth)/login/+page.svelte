<script lang="ts">
	const data = $props();
	const { form } = data;

	import { Eye, EyeOff, AlertCircle, ArrowLeft, LogIn } from '@lucide/svelte';
	import SocialAuthButton from '$lib/components/auth/SocialAuthButton.svelte';

	let showPassword = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div
		class="w-full max-w-md space-y-8 border border-[#495057]
	bg-[#212529] p-8"
	>
		<div class="text-center">
			<a href="/"> <i class="text-4xl font-bold">TE<span class="text-[#ffd500]">K</span>ER</i></a>
			<p class="text-md pt-2">Sign in to you account</p>
		</div>
		<form method="POST" class="space-y-4">
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				required
				class="w-full border border-[#495057] bg-[#343a40] p-2 px-4 focus:outline-none"
			/>

			<div class="flex justify-between border border-[#495057] bg-[#343a40] p-2 px-4">
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
					class="ml-4 cursor-pointer text-[#6c757d] hover:text-[#adb5bd]"
					onclick={() => (showPassword = !showPassword)}
					tabindex="-1"
				>
					{#if showPassword}
						<EyeOff class="h-4 w-4" />
					{:else}
						<Eye class="h-4 w-4" />
					{/if}
				</button>
			</div>

			<button
				type="submit"
				class="w-full cursor-pointer gap-2 border border-[#fdc500] bg-[#ffd500] p-2 px-4 text-[#212529]"
			>
				Login
			</button>
		</form>

		<div class="space-y-4 text-center">
			<p>
				Don't have an account?
				<a href="/register" class="pl-2 hover:text-[#ffd500]"> Register </a>
			</p>
			{#if form?.errorMessage}
				<div class="">
					<p class="border bg-red-400/15 px-4 py-2 text-red-400">
						{form.errorMessage}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
