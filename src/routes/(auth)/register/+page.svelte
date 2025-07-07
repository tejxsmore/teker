<script lang="ts">
	const data = $props();
	const { form } = data;

	import { Eye, EyeOff, AlertCircle } from '@lucide/svelte';
	import SocialAuthButton from '$lib/components/auth/SocialAuthButton.svelte';

	let showPassword = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div
		class="w-full max-w-md space-y-8 border border-[#495057]
	bg-[#212529] p-8"
	>
		<div class="text-center">
			<a href="/"> <i class="text-2xl font-bold">TE<span class="text-[#ffd500]">K</span>ER</i></a>
			<p class="text-md pt-2">Create a new account</p>
		</div>
		<form method="POST" class=" space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<div class="">
					<input
						type="text"
						name="firstname"
						id="firstname"
						placeholder="First name"
						required
						class="w-full border border-[#495057] bg-[#343a40] p-2 px-4 focus:outline-none"
					/>
				</div>
				<div class="">
					<input
						type="text"
						name="lastname"
						id="lastname"
						placeholder="Last name"
						required
						class="w-full border border-[#495057] bg-[#343a40] p-2 px-4 focus:outline-none"
					/>
				</div>
			</div>

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
						<EyeOff class="h-4 w-4 " />
					{:else}
						<Eye class="h-4 w-4" />
					{/if}
				</button>
			</div>

			<button
				type="submit"
				class="w-full cursor-pointer gap-2 border border-[#fdc500] bg-[#ffd500] p-2 px-4 text-[#212529]"
			>
				Register
			</button>

			<div class="relative">
				<hr class="border-[#495057]" />
				<span
					class="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-[#212529] px-2 text-sm text-[#495057]"
				>
					or
				</span>
			</div>
			<SocialAuthButton provider="google" />
		</form>

		<div class="space-y-4 text-center">
			<p class="text-[#adb5bd]">
				<span>Already have an account?</span>
				<a href="/login" class="pl-2 hover:text-[#ffd500]"> Login </a>
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
