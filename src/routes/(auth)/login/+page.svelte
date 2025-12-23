<script lang="ts">
	const data = $props();
	const { form } = data;
	let showPassword = $state(false);
</script>

<div class="flex min-h-screen">
	<div class="flex w-full flex-col items-center justify-between p-4 py-8">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-4 text-center">
			<p class="mt-0.5 text-xl font-bold">Teker</p>
		</a>

		<!-- Login Card -->
		<div class="w-full max-w-md space-y-6 rounded-[18px] border border-[#eee] p-2 text-center">
			<div class="py-3">
				<h2 class="text-2xl font-semibold">Welcome Back!</h2>
				<p class="mt-1 text-sm text-[#777777]">Please login to continue</p>
			</div>
			<form method="POST" class="space-y-2">
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					required
					class="w-full rounded-xl border border-[#eee] bg-[#f6f6f6] px-4 py-2 focus:border-[#ccc]
					focus:outline-none"
				/>
				<div class="relative w-full">
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						id="password"
						placeholder="Password"
						required
						class="w-full rounded-xl border border-[#eee] bg-[#f6f6f6] px-4 py-2 focus:border-[#ccc]
						focus:outline-none"
					/>
					<button
						type="button"
						class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#777777] transition-colors duration-200 hover:text-[#6d6d6d] focus:outline-none"
						onclick={() => (showPassword = !showPassword)}
						tabindex="-1"
					>
						{#if showPassword}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-eye-closed-icon lucide-eye-closed"
								><path d="m15 18-.722-3.25" /><path d="M2 8a10.645 10.645 0 0 0 20 0" /><path
									d="m20 15-1.726-2.05"
								/><path d="m4 15 1.726-2.05" /><path d="m9 18 .722-3.25" /></svg
							>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-eye-icon lucide-eye"
								><path
									d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
								/><circle cx="12" cy="12" r="3" /></svg
							>
						{/if}
					</button>
				</div>
				<button
					type="submit"
					class="w-full cursor-pointer rounded-xl bg-[#21825C] px-4 py-2 text-center font-medium text-white transition-colors duration-200 hover:bg-[#2f966d]"
				>
					Login
				</button>
			</form>
		</div>

		<!-- Register Section -->
		<div class="space-y-3">
			<p class="text-center text-[#606060]">
				Don't have an account?
				<a
					href="/register"
					class="pl-1 underline transition-colors duration-200 hover:text-[#222222]">Register</a
				>
			</p>
			{#if form?.errorMessage}
				<div class="text-[#fc3636]">
					{form.errorMessage}
				</div>
			{/if}
		</div>
	</div>
</div>
