<script lang="ts">
	import '../app.css';
	let { children, data } = $props();

	import { userStore } from '$lib/stores/user';
	$userStore = data.user!;
</script>

{@render children()}
