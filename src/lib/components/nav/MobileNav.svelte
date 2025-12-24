<script lang="ts">
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;

	function isActive(path: string): boolean {
		if (path === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(path);
	}
</script>

<div class="fixed bottom-0 w-full border-t border-[#DCDCDC] bg-white md:hidden">
	<div class="flex justify-around p-4">
		<a href="/" aria-label="home icon" class="flex flex-col items-center gap-1 text-sm">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="20px"
				height="20px"
				viewBox="0 0 12 12"
			>
				<path
					d="m1.685,3.5L5.435.934c.34-.233.789-.233,1.129,0l3.75,2.566c.272.186.435.495.435.825v4.425c0,1.105-.895,2-2,2H3.25c-1.105,0-2-.895-2-2v-4.425c0-.33.163-.639.435-.825Z"
					fill={isActive('/') ? '#FEE2E2' : 'none'}
					stroke={isActive('/') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
				></path>
				<line
					x1="6"
					y1="10.75"
					x2="6"
					y2="8"
					fill="none"
					stroke={isActive('/') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					data-color="color-2"
				></line>
			</svg>
			<span
				class="mt-0.5 text-xs font-semibold"
				class:text-[#E62727]={isActive('/')}
				class:text-[#707070]={!isActive('/')}>Home</span
			>
		</a>

		<a
			href="/categories"
			aria-label="categories icon"
			class="flex flex-col items-center gap-1 text-sm"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="20px"
				height="20px"
				viewBox="0 0 24 24"
			>
				<rect
					x="3"
					y="3"
					width="7"
					height="7"
					rx="2.5"
					ry="2.5"
					fill={isActive('/categories') ? '#FEE2E2' : 'none'}
					stroke={isActive('/categories') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="square"
					stroke-miterlimit="10"
					stroke-width="2"
				></rect>
				<rect
					x="3"
					y="14"
					width="7"
					height="7"
					rx="2.5"
					ry="2.5"
					fill={isActive('/categories') ? '#FEE2E2' : 'none'}
					stroke={isActive('/categories') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="square"
					stroke-miterlimit="10"
					stroke-width="2"
					data-color="color-2"
				></rect>
				<rect
					x="14"
					y="3"
					width="7"
					height="7"
					rx="2.5"
					ry="2.5"
					fill={isActive('/categories') ? '#FEE2E2' : 'none'}
					stroke={isActive('/categories') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="square"
					stroke-miterlimit="10"
					stroke-width="2"
					data-color="color-2"
				></rect>
				<rect
					x="14"
					y="14"
					width="7"
					height="7"
					rx="2.5"
					ry="2.5"
					fill={isActive('/categories') ? '#FEE2E2' : 'none'}
					stroke={isActive('/categories') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="square"
					stroke-miterlimit="10"
					stroke-width="2"
				></rect>
			</svg>
			<span
				class="mt-0.5 text-xs font-semibold"
				class:text-[#E62727]={isActive('/categories')}
				class:text-[#707070]={!isActive('/categories')}>Categories</span
			>
		</a>

		<a href="/bag" aria-label="bag icon" class="flex flex-col items-center gap-1 text-sm">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="20px"
				height="20px"
				viewBox="0 0 18 18"
			>
				<path
					d="M6.75,4.75v-1.75c0-1.243,1.007-2.25,2.25-2.25h0c1.243,0,2.25,1.007,2.25,2.25v1.75"
					fill="none"
					stroke={isActive('/bag') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					data-color="color-2"
				></path>
				<path
					d="M5.334,4.75h7.333c1.037,0,1.903,.793,1.992,1.827l.652,7.5c.102,1.169-.82,2.173-1.992,2.173H4.681c-1.173,0-2.094-1.005-1.992-2.173l.652-7.5c.09-1.034,.955-1.827,1.992-1.827Z"
					fill={isActive('/bag') ? '#FEE2E2' : 'none'}
					stroke={isActive('/bag') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
				></path>
			</svg>
			<span
				class="mt-0.5 text-xs font-semibold"
				class:text-[#E62727]={isActive('/bag')}
				class:text-[#707070]={!isActive('/bag')}>Bag</span
			>
		</a>

		<a href="/user/profile" aria-label="user profile icon" class="flex flex-col items-center gap-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="20px"
				height="20px"
				viewBox="0 0 18 18"
			>
				<circle
					cx="9"
					cy="4.5"
					r="2.75"
					fill={isActive('/user') ? '#FEE2E2' : 'none'}
					stroke={isActive('/user') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					data-color="color-2"
				></circle>
				<path
					d="M13.762,15.516c.86-.271,1.312-1.221,.947-2.045-.97-2.191-3.159-3.721-5.709-3.721s-4.739,1.53-5.709,3.721c-.365,.825,.087,1.774,.947,2.045,1.225,.386,2.846,.734,4.762,.734s3.537-.348,4.762-.734Z"
					fill={isActive('/user') ? '#FEE2E2' : 'none'}
					stroke={isActive('/user') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
				></path>
			</svg>
			<span
				class="mt-0.5 text-xs font-semibold"
				class:text-[#E62727]={isActive('/user')}
				class:text-[#707070]={!isActive('/user')}>Profile</span
			>
		</a>
	</div>
</div>
