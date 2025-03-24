<script lang="ts">
	import { getWinner } from '$lib/game/getWinner';
	import { prepare } from '$lib/game/prepare';
	import type { GameState } from '$lib/types/GameState';
	import Deck from './Deck.svelte';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
	};

	let { gameState, updateGameState }: Props = $props();

	const winner = $derived(getWinner(gameState));
</script>

<div class="flex h-full flex-col items-center justify-center">
	<h1>Game Over</h1>
	<Deck cards={gameState.players[0].wonCards} variant={'primary'} />
	{#if winner}
		<h2>The winner is player {winner}</h2>
	{:else}
		<h2>It's a draw</h2>
	{/if}
	<Deck cards={gameState.players[1].wonCards} variant={'secondary'} />
	<button
		onclick={() => {
			updateGameState(prepare());
		}}
	>
		Play again
	</button>
</div>
