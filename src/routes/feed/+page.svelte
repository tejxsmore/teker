<!-- src/routes/feed/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import MobileNav from '$lib/components/nav/MobileNav.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Track current image index for each post
	let currentImageIndices = $state<Record<string, number>>({});

	function toggleLike(postId: string) {
		const post = data.posts.find((p) => p.id === postId);
		if (post) {
			post.isLiked = !post.isLiked;
			post.likeCount += post.isLiked ? 1 : -1;
		}
	}

	function toggleSave(postId: string) {
		const post = data.posts.find((p) => p.id === postId);
		if (post) {
			post.isSaved = !post.isSaved;
		}
	}

	function nextImage(postId: string, totalImages: number) {
		const current = currentImageIndices[postId] || 0;
		currentImageIndices[postId] = (current + 1) % totalImages;
	}

	function prevImage(postId: string, totalImages: number) {
		const current = currentImageIndices[postId] || 0;
		currentImageIndices[postId] = current === 0 ? totalImages - 1 : current - 1;
	}

	function formatTimeAgo(date: Date) {
		const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

		if (seconds < 60) return `${seconds}s`;
		if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
		if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
		if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
		return `${Math.floor(seconds / 604800)}w`;
	}

	function formatCount(count: number): string {
		if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
		if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
		return count.toString();
	}
</script>

<Navbar />
<MobileNav />

<div class="min-h-screen">
	<!-- Three Column Layout -->
	<div
		class="mx-auto grid w-full grid-cols-1 gap-0 pt-0 md:grid-cols-12 md:p-3 md:pt-0 lg:px-20 xl:px-40"
	>
		<!-- Left Sidebar - Hidden on mobile/tablet -->
		<aside class="hidden h-fit md:sticky md:top-0 md:col-span-3 md:block">
			<div class="py-6">
				<h2 class="mb-3 text-lg font-bold text-[#2B2A2A]">Trending Topics</h2>
				<div class="space-y-1.5">
					{#each ['#iPhone15Pro', '#GamingSetup', '#TechReview', '#Unboxing', '#MacBook'] as tag}
						<button
							class="block w-full rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-[#faf9f9]"
						>
							<span class="font-medium text-[#F21B3F]">{tag}</span>
							<span class="block text-sm text-[#707070]">12.5K posts</span>
						</button>
					{/each}
				</div>
			</div>
		</aside>

		<!-- Main Feed - Center -->
		<main class="md:col-span-6">
			{#each data.posts as post}
				{@const currentIndex = currentImageIndices[post.id] || 0}
				<article
					class="overflow-hidden border-t-0 border-b border-[#DCDCDC] bg-white md:border md:border-t-0"
				>
					<!-- Post Header -->
					<div class="flex items-center justify-between p-4">
						<div class="flex items-center gap-3">
							<img src={post.user.image} alt={post.user.name} class="h-10 w-10 rounded-full" />
							<div>
								<div class="flex items-center gap-1">
									<span class="text-sm font-semibold text-[#2B2A2A]">{post.user.name}</span>
									{#if post.user.isVerified}
										<svg class="h-4 w-4 text-[#F21B3F]" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd"
											/>
										</svg>
									{/if}
								</div>
								<span class="text-xs text-[#707070]">{formatTimeAgo(post.createdAt)}</span>
							</div>
						</div>
						<button
							aria-label="More options"
							class="rounded-full p-2 transition-colors duration-200 hover:bg-[#faf9f9]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#707070"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle
									cx="12"
									cy="19"
									r="1"
								/>
							</svg>
						</button>
					</div>

					<!-- Post Images -->
					<div class="relative aspect-square w-full bg-[#f1f0f0]">
						{#each post.images as image, idx}
							{#if idx === currentIndex}
								<img src={image} alt="Post content" class="h-full w-full object-cover" />
							{/if}
						{/each}

						<!-- Image Navigation -->
						{#if post.images.length > 1}
							<button
								onclick={() => prevImage(post.id, post.images.length)}
								aria-label="Previous image"
								class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors duration-200 hover:bg-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#2B2A2A"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="15 18 9 12 15 6" />
								</svg>
							</button>
							<button
								onclick={() => nextImage(post.id, post.images.length)}
								aria-label="Next image"
								class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors duration-200 hover:bg-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#2B2A2A"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="9 18 15 12 9 6" />
								</svg>
							</button>

							<!-- Image Indicators -->
							<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
								{#each post.images as _, idx}
									<div
										class="h-1.5 w-1.5 rounded-full transition-all {idx === currentIndex
											? 'w-6 bg-white'
											: 'bg-white/50'}"
									></div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Post Actions -->
					<div class="space-y-3 p-4">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<button
									onclick={() => toggleLike(post.id)}
									aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
									class="transition-transform active:scale-90"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										width="20px"
										height="20px"
										viewBox="0 0 18 18"
										><path
											d="M8.529,15.222c.297,.155,.644,.155,.941,0,1.57-.819,6.529-3.787,6.529-8.613,.008-2.12-1.704-3.846-3.826-3.859-1.277,.016-2.464,.66-3.173,1.72-.71-1.06-1.897-1.704-3.173-1.72-2.123,.013-3.834,1.739-3.826,3.859,0,4.826,4.959,7.794,6.529,8.613Z"
											fill={post.isLiked ? '#F21B3F' : 'none'}
											stroke={post.isLiked ? '#F21B3F' : '#2B2A2A'}
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
										></path>
									</svg>
								</button>
								<button aria-label="Comment on post" class="transition-transform active:scale-90">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										width="20px"
										height="20px"
										viewBox="0 0 18 18"
										><path
											d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z"
											fill="none"
											stroke="rgba(43, 42, 42, 1)"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
										></path><path
											d="M9,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"
											fill="rgba(43, 42, 42, 1)"
											opacity=".75"
											data-color="color-2"
											data-stroke="none"
										></path><path
											d="M5.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"
											fill="rgba(43, 42, 42, 1)"
											data-color="color-2"
											data-stroke="none"
										></path><path
											d="M12.5,10c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"
											fill="rgba(43, 42, 42, 1)"
											opacity=".5"
											data-color="color-2"
											data-stroke="none"
										></path></svg
									>
								</button>
								<button aria-label="Share post" class="transition-transform active:scale-90">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										width="20px"
										height="20px"
										viewBox="0 0 18 18"
										><line
											x1="15.813"
											y1="2.187"
											x2="7.657"
											y2="10.343"
											fill="none"
											stroke="rgba(43, 42, 42, 1)"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											data-color="color-2"
										></line><path
											d="M15.947,2.73l-4.154,12.923c-.142,.443-.743,.509-.977,.106l-3.159-5.416L2.241,7.184c-.402-.235-.337-.835,.106-.977L15.27,2.053c.417-.134,.811,.26,.677,.677Z"
											fill="none"
											stroke="rgba(43, 42, 42, 1)"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
										></path></svg
									>
								</button>
							</div>
							<button
								onclick={() => toggleSave(post.id)}
								aria-label={post.isSaved ? 'Unsave post' : 'Save post'}
								class="transition-transform active:scale-90"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="20px"
									height="20px"
									viewBox="0 0 18 18"
									><path
										d="M14.25,16.25l-5.25-3.5-5.25,3.5V3.75c0-1.105,.895-2,2-2h6.5c1.105,0,2,.895,2,2v12.5Z"
										fill="none"
										stroke="rgba(43, 42, 42, 1)"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
									></path></svg
								>
							</button>
						</div>

						<!-- Like Count -->
						<button
							class="text-sm font-semibold text-[#2B2A2A] transition-colors duration-200 hover:text-[#707070]"
						>
							{formatCount(post.likeCount)} likes
						</button>

						<!-- Caption -->
						<div class="text-sm text-[#2B2A2A]">
							<span class="mr-2 font-semibold">{post.user.name}</span>
							<span>{post.content}</span>
						</div>

						<!-- Product Tag (if exists) -->
						{#if post.product}
							<button
								class="flex w-full items-center gap-2 rounded-lg bg-[#faf9f9] p-2 transition-colors duration-200 hover:bg-[#efeded]"
							>
								<img
									src={post.product.thumbnailImage}
									alt={post.product.name}
									class="h-12 w-12 rounded object-cover"
								/>
								<div class="text-left">
									<p class="text-sm font-medium text-[#2B2A2A]">{post.product.name}</p>
									<p class="text-xs text-[#707070]">View product</p>
								</div>
							</button>
						{/if}

						<!-- Comments Link -->
						{#if post.commentCount > 0}
							<button
								class="text-sm text-[#707070] transition-colors duration-200 hover:text-[#2B2A2A]"
							>
								View all {post.commentCount} comments
							</button>
						{/if}
					</div>
				</article>
			{/each}

			<!-- Load More -->
			<div class="py-8 text-center">
				<button
					class="rounded-xl border-2 border-[#fc758b] bg-[#F21B3F] px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#f73253]"
				>
					Load More Posts
				</button>
			</div>
		</main>

		<!-- Right Sidebar - Hidden on mobile/tablet -->
		<aside class="hidden h-fit md:sticky md:top-0 md:col-span-3 md:block">
			<div class="p-6 pr-0">
				<h2 class="mb-3 text-lg font-bold text-[#2B2A2A]">Suggested Users</h2>
				<div class="space-y-4">
					{#each [{ name: 'Tech Reviewer', handle: '@techguru', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech' }, { name: 'Gadget Zone', handle: '@gadgetzone', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gadget' }, { name: 'Mobile Hub', handle: '@mobilehub', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mobile' }] as user}
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<img src={user.image} alt={user.name} class="h-10 w-10 rounded-full" />
								<div>
									<p class="text-sm font-semibold text-[#2B2A2A]">{user.name}</p>
									<p class="text-xs text-[#707070]">{user.handle}</p>
								</div>
							</div>
							<button
								class="cursor-pointer rounded-lg border border-[#fc758b] bg-[#F21B3F] px-3 py-1 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#f73253]"
							>
								Follow
							</button>
						</div>
					{/each}
				</div>
			</div>
		</aside>
	</div>
</div>
