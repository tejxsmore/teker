<script lang="ts">
	const data = $props();
	const { form } = data;
	let showPassword = $state(false);
</script>

<div class="flex min-h-screen w-full items-center justify-center p-4 lg:px-20 xl:px-40">
	<!-- Back button -->
	<a
		href="/"
		class="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#e3e3e3] px-3 py-1 text-start text-sm font-semibold text-[#707070]"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="12px"
			height="12px"
			viewBox="0 0 12 12"
		>
			<path
				d="m7.75,11c-.192,0-.384-.073-.53-.22L2.97,6.53c-.293-.293-.293-.768,0-1.061L7.22,1.22c.293-.293.768-.293,1.061,0s.293.768,0,1.061l-3.72,3.72,3.72,3.72c.293.293.293.768,0,1.061-.146.146-.338.22-.53.22Z"
				stroke-width="0"
				fill="rgba(112, 112, 112, 1)"
			></path>
		</svg>
		<span>Back</span>
	</a>

	<!-- Register Card centered -->
	<div
		class="w-full max-w-md space-y-6 rounded-[20px] border border-[#DCDCDC] bg-white p-4 text-center"
	>
		<div class="py-3">
			<h2 class="text-2xl font-semibold">Create Account</h2>
			<p class="mt-1 text-sm text-[#777777]">Join us to get started</p>
		</div>

		<form method="POST" class="space-y-2">
			<div class="grid grid-cols-2 gap-2">
				<input
					type="text"
					name="firstname"
					id="firstname"
					placeholder="First name"
					required
					class="w-full rounded-full border border-[#DCDCDC] bg-[#fafafa] px-4 py-2 text-sm focus:border-[#b7b7b7] focus:outline-none"
				/>
				<input
					type="text"
					name="lastname"
					id="lastname"
					placeholder="Last name"
					required
					class="w-full rounded-full border border-[#DCDCDC] bg-[#fafafa] px-4 py-2 text-sm focus:border-[#b7b7b7] focus:outline-none"
				/>
			</div>

			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				required
				class="w-full rounded-full border border-[#DCDCDC] bg-[#fafafa]
				px-4 py-2 text-sm focus:border-[#b7b7b7] focus:outline-none"
			/>

			<div class="relative w-full">
				<input
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					placeholder="Password"
					required
					class="w-full rounded-full border border-[#DCDCDC] bg-[#fafafa] px-4 py-2 text-sm focus:border-[#b7b7b7] focus:outline-none"
				/>
				<button
					type="button"
					class="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#777777] transition-colors duration-200 hover:text-[#6d6d6d] focus:outline-none"
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
				class="w-full rounded-full border-2 border-[#eb6d6d] bg-[#E62727] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#e43737]"
			>
				Register
			</button>
		</form>

		<div class="space-y-3">
			<p class="text-center text-[#606060]">
				Already have an account?
				<a href="/login" class="pl-1 underline transition-colors duration-200 hover:text-[#222222]"
					>Login</a
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
