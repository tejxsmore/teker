<script>
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import MobileNav from '$lib/components/nav/MobileNav.svelte';
	import SignOutButton from '$lib/components/auth/SignOutButton.svelte';
</script>

<Navbar />
<MobileNav />
<div class="p-3">
	<SignOutButton />
</div>
