<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Button from '$lib/components/ui/Button.svelte';

	let roomName: string | null = $state(null);

	onMount(() => {
		roomName = page.url.searchParams.get('room') ?? null;
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 p-2">
	{#if roomName === null}
		<p>No room name provided</p>
	{:else}
		<Button
			href={`${PUBLIC_BASE_URL}/game?player=0&room=${roomName}`}
			variant="primary"
			class="w-32"
		>
			PLAYER I
		</Button>
		<div class="size-2 rounded-full bg-white"></div>
		<Button
			href={`${PUBLIC_BASE_URL}/game?player=1&room=${roomName}`}
			variant="secondary"
			class="w-32"
		>
			PLAYER II
		</Button>
		<div class="my-8 h-[1px] w-32 bg-white"></div>
		<Button href={`${PUBLIC_BASE_URL}/game?room=${roomName}`} variant="neutral" class="w-32">
			SPECTATOR
		</Button>
	{/if}
</div>
