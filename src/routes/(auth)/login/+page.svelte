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

	<!-- Login Card centered -->
	<div
		class="w-full max-w-md space-y-6 rounded-[20px] border border-[#DCDCDC] bg-white p-4 text-center"
	>
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
				class="w-full rounded-full border border-[#DCDCDC] bg-[#fafafa] p-2.25 pl-4 text-sm focus:border-[#b7b7b7] focus:outline-none"
			/>
			<div class="relative w-full">
				<input
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					placeholder="Password"
					required
					class="w-full rounded-full border border-[#DCDCDC] bg-[#fafafa] p-2.25 pl-4 text-sm focus:border-[#b7b7b7] focus:outline-none"
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
							x="0px"
							y="0px"
							width="16px"
							height="16px"
							viewBox="0 0 18 18"
							><path
								d="M15.008,6.083l.881-1.441c.216-.354,.105-.815-.248-1.031-.354-.215-.815-.105-1.031,.248l-.907,1.482c-.678-.331-1.388-.588-2.124-.769l.333-1.655c.082-.406-.182-.802-.587-.883-.405-.078-.802,.181-.883,.587l-.339,1.685c-.364-.037-.732-.057-1.103-.057s-.739,.02-1.103,.057l-.339-1.685c-.082-.406-.48-.666-.883-.587-.406,.082-.669,.477-.587,.883l.333,1.655c-.736,.181-1.446,.438-2.124,.769l-.907-1.482c-.215-.353-.677-.463-1.031-.248-.353,.216-.464,.678-.248,1.031l.881,1.441c-.594,.402-1.154,.867-1.668,1.392-.29,.295-.285,.771,.011,1.061,.295,.29,.77,.285,1.061-.011,1.754-1.789,4.1-2.774,6.605-2.774s4.851,.985,6.605,2.774c.147,.15,.341,.225,.536,.225,.189,0,.379-.071,.525-.214,.296-.29,.301-.765,.011-1.061-.515-.525-1.074-.99-1.668-1.392Z"
								fill="rgba(112, 112, 112, 1)"
							></path><circle
								cx="9"
								cy="10.5"
								r="3.5"
								fill="rgba(112, 112, 112, 1)"
								data-color="color-2"
							></circle></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="16px"
							height="16px"
							viewBox="0 0 18 18"
							><path
								d="M16.666,6.734c-.295-.29-.77-.285-1.061,.011-1.754,1.789-4.1,2.774-6.605,2.774s-4.851-.985-6.605-2.774c-.29-.295-.765-.3-1.061-.011-.296,.29-.301,.765-.011,1.061,.515,.525,1.074,.99,1.669,1.393l-.881,1.441c-.216,.353-.105,.815,.249,1.031,.122,.075,.257,.11,.391,.11,.252,0,.499-.127,.64-.359l.906-1.482c.678,.331,1.388,.588,2.124,.769l-.333,1.655c-.082,.406,.182,.802,.587,.883,.05,.01,.1,.015,.149,.015,.35,0,.663-.246,.734-.602l.339-1.685c.364,.037,.732,.057,1.103,.057s.739-.02,1.103-.057l.339,1.685c.072,.356,.385,.602,.734,.602,.049,0,.099-.005,.149-.015,.406-.082,.669-.477,.587-.883l-.333-1.655c.736-.181,1.446-.438,2.124-.769l.906,1.482c.141,.231,.388,.359,.64,.359,.134,0,.269-.036,.391-.11,.354-.216,.465-.678,.249-1.031l-.881-1.441c.594-.403,1.154-.867,1.669-1.393,.29-.295,.285-.771-.011-1.061Z"
								fill="rgba(112, 112, 112, 1)"
							></path></svg
						>
					{/if}
				</button>
			</div>
			<button
				type="submit"
				class="w-full rounded-full border-2 border-[#eb6d6d] bg-[#E62727] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#e43737]"
			>
				Login
			</button>
		</form>

		<div></div>

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
