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

		<a href="/feed" aria-label="feed icon" class="flex flex-col items-center gap-1 text-sm">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="20px"
				height="20px"
				viewBox="0 0 18 18"
				><path
					d="M3.474,2.784L14.897,6.958c.481,.176,.467,.861-.021,1.018l-5.228,1.673-1.673,5.228c-.156,.488-.842,.502-1.018,.021L2.784,3.474c-.157-.43,.26-.847,.69-.69Z"
					fill={isActive('/feed') ? '#FEE2E2' : 'none'}
					stroke={isActive('/feed') ? '#E62727' : 'rgba(112, 112, 112, 1)'}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
				></path></svg
			>
			<span
				class="mt-0.5 text-xs font-semibold"
				class:text-[#E62727]={isActive('/feed')}
				class:text-[#707070]={!isActive('/feed')}>Feed</span
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
