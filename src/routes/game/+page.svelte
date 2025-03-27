<script lang="ts">
	import { page } from '$app/state';
	import Game from '$lib/components/logic/Game.svelte';
	import { onMount } from 'svelte';

	let roomId: string | null = $state(null);
	let playerId: number | null = $state(null);

	onMount(() => {
		playerId = Number(page.url.searchParams.get('player')) ?? null;
		roomId = page.url.searchParams.get('room') ?? null;
	});
</script>

{#if roomId === null}
	<p>Waiting for room...</p>
{:else if playerId === null}
	<p>Waiting for player...</p>
{:else}
	<Game {playerId} {roomId} />
{/if}
