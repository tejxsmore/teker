<script lang="ts">
	const data = $props();
	const { form } = data;
	let showPassword = $state(false);
</script>

<div class="flex min-h-screen w-full items-center justify-center p-3 lg:px-20 xl:px-40">
	<!-- Back button -->
	<a
		href="/"
		aria-label="Back to home"
		class="absolute top-3 left-3 rounded-xl border border-[#DCDCDC] p-2.25 lg:mx-20 xl:mx-40"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="20px"
			height="20px"
			viewBox="0 0 18 18"
			><path
				d="M11.5,16c-.192,0-.384-.073-.53-.22l-6.25-6.25c-.293-.293-.293-.768,0-1.061L10.97,2.22c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-5.72,5.72,5.72,5.72c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"
				fill="rgba(43, 42, 42, 1)"
			></path></svg
		>
	</a>

	<!-- Register Card centered -->
	<div
		class="w-full max-w-md space-y-12 rounded-2xl border border-[#DCDCDC] bg-white p-6 text-center"
	>
		<div class="p space-y-2">
			<a href="/" class="text-xl font-semibold focus:outline-none">TEKER</a>
			<p class="text-[#707070]">Create a new account</p>
		</div>

		<form method="POST" class="space-y-2">
			<div class="grid grid-cols-2 gap-2">
				<input
					type="text"
					name="firstname"
					id="firstname"
					placeholder="First name"
					required
					class="w-full rounded-xl border border-[#DCDCDC] bg-[#f1f0f0] p-[7.5px] pl-4 font-medium focus:border-[#2B2A2A] focus:outline-none"
				/>
				<input
					type="text"
					name="lastname"
					id="lastname"
					placeholder="Last name"
					required
					class="w-full rounded-xl border border-[#DCDCDC] bg-[#f1f0f0] p-[7.5px] pl-4 font-medium focus:border-[#2B2A2A] focus:outline-none"
				/>
			</div>

			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				required
				class="w-full rounded-xl border border-[#DCDCDC] bg-[#f1f0f0] p-[7.5px] pl-4 font-medium focus:border-[#2B2A2A] focus:outline-none"
			/>

			<div class="relative w-full">
				<input
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					placeholder="Password"
					required
					class="w-full rounded-xl border border-[#DCDCDC] bg-[#f1f0f0] p-[7.5px] pl-4 font-medium focus:border-[#2B2A2A] focus:outline-none"
				/>
				<button
					type="button"
					class="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer transition-colors duration-200 focus:outline-none"
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

			{#if form?.errorMessage}
				<p class="pl-1 text-start text-sm font-medium text-[#ff0000]">
					{form.errorMessage}
				</p>
			{/if}

			<button
				type="submit"
				class="w-full cursor-pointer rounded-xl border-2 border-[#fc758b] bg-[#F21B3F] px-4 py-1.5 font-semibold text-white transition-colors duration-200 hover:bg-[#f73253]"
			>
				Sign Up
			</button>
		</form>

		<div class="relative w-full">
			<div class="h-px w-full bg-[#DCDCDC]"></div>
			<span
				class="absolute -top-2.75 left-1/2 -translate-x-1/2 bg-white px-3 text-sm tracking-wide text-[#707070]"
			>
				or continue with
			</span>
		</div>

		<div class="space-y-2">
			<button
				aria-label="Apple Signin"
				class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#DCDCDC] px-4 py-1.5 font-medium text-[#707070] transition-colors duration-200 hover:bg-[#f3f2f2]"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="20"
					height="20"
					viewBox="0 0 30 30"
				>
					<path
						d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"
					></path>
				</svg> Apple
			</button>
			<button
				aria-label="Google Signin"
				class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#DCDCDC] px-4 py-1.5 font-medium text-[#707070] transition-colors duration-200 hover:bg-[#f3f2f2]"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="20"
					height="20"
					viewBox="0 0 48 48"
				>
					<path
						fill="#FFC107"
						d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
					></path><path
						fill="#FF3D00"
						d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
					></path><path
						fill="#4CAF50"
						d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
					></path><path
						fill="#1976D2"
						d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
					></path>
				</svg>
				Google
			</button>
		</div>

		<p class="text-sm font-medium text-[#707070]">
			No acount? <span
				class="pl-1 text-[#2B2A2A] underline transition-colors duration-200 hover:text-[#F21B3F]"
				><a href="/auth/signin">Sign In</a></span
			>
		</p>
	</div>
</div>
