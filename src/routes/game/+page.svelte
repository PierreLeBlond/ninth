<script lang="ts">
	import { page } from '$app/state';
	import Game from '$lib/components/logic/Game.svelte';
	import { onMount } from 'svelte';

	let roomName: string | null = $state(null);
	let player: number | null = $state(null);

	onMount(() => {
		player = Number(page.url.searchParams.get('player')) ?? null;
		roomName = page.url.searchParams.get('room') ?? null;
	});
</script>

{#if roomName === null}
	<p>Waiting for room...</p>
{:else if player === null}
	<p>Waiting for player...</p>
{:else}
	<Game {player} {roomName} />
{/if}
