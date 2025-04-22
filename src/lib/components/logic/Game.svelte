<script lang="ts">
	import GamePlaying from './GamePlaying.svelte';
	import GameOver from './GameOver.svelte';
	import { onDestroy } from 'svelte';
	import { useGameStateManager } from '$lib/hooks/useGameStateManager.svelte';

	type Props = {
		playerId: number | null;
		debug?: boolean;
		roomId: string;
	};

	const { playerId, roomId, debug = false }: Props = $props();

	const gameStateManager = useGameStateManager({
		roomId
	});

	onDestroy(() => {
		gameStateManager.destroy();
	});

	let reverse = $derived(playerId === 1);

	let controllablePlayers = $derived(debug ? [0, 1] : playerId !== null ? [playerId] : []);
</script>

{#if gameStateManager.gameOver}
	<GameOver
		gameState={gameStateManager.gameState}
		updateGameState={gameStateManager.updateGameState}
		{playerId}
	/>
{:else}
	<GamePlaying
		gameState={gameStateManager.gameState}
		updateGameState={gameStateManager.updateGameState}
		{controllablePlayers}
		{reverse}
	/>
{/if}
<!--History {...history} /-->
