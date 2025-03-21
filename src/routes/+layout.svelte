<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-dvh w-screen flex-col items-center justify-center">
	{@render children()}
</div>
