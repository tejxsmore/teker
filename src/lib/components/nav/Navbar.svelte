<script>
	import MobileNav from './MobileNav.svelte';

	import { Search, Heart, ShoppingCart } from '@lucide/svelte';
</script>

<div class="flex items-center justify-between p-4">
	<div class="flex items-center gap-8">
		<a href="/"> <i class="text-2xl font-bold">TE<span class="text-[#ffd500]">K</span>ER</i></a>
		<div class="hidden md:block">
			<div class="flex gap-8">
				<a href="/products" class="hover:text-[#ffd500]">Products</a>
				<a href="/brands" class="hover:text-[#ffd500]">Brands</a>
			</div>
		</div>
	</div>
	<div class="flex gap-8">
		<a href="/wishlist" class="">
			<Heart size="20" />
		</a>
		<a href="/cart" class="">
			<ShoppingCart size="20" />
		</a>
	</div>
</div>

<MobileNav />
