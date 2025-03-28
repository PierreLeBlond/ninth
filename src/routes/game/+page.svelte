<script lang="ts">
	import { page } from '$app/state';
	import Game from '$lib/components/logic/Game.svelte';
	import { onMount } from 'svelte';

	let roomId: string | null = $state(null);
	let playerId: number | null = $state(null);
	let debug = $state(false);

	onMount(() => {
		const player = page.url.searchParams.get('player');
		playerId = player ? Number(player) : null;
		roomId = page.url.searchParams.get('room') ?? null;
		debug = page.url.searchParams.has('debug');
	});
</script>

{#if roomId === null}
	<p>Waiting for room...</p>
{:else}
	<Game {playerId} {roomId} {debug} />
{/if}
