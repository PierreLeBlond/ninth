<script lang="ts">
	import { getWinner } from '$lib/game/getWinner';
	import { prepare } from '$lib/game/prepare';
	import type { GameState } from '$lib/types/GameState';
	import Button from '$lib/components/ui/Button.svelte';
	import Deck from '$lib/components/ui/Deck.svelte';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
		playerId: number;
	};

	let { gameState, updateGameState, playerId }: Props = $props();

	const winner = $derived(getWinner(gameState));
</script>

<div class="flex h-full flex-col items-center justify-center gap-4">
	<h1 class="text-3xl font-bold">Game Over</h1>
	<div class="flex w-64 items-center gap-8">
		<Deck cards={gameState.players[0].wonCards} variant={'primary'} itemsDisabled disabled />
		VS
		<Deck cards={gameState.players[1].wonCards} variant={'secondary'} itemsDisabled disabled />
	</div>
	<h2 class="text-3xl font-bold">
		{#if !winner}
			It's a draw
		{:else if winner === playerId}
			You won !
		{:else}
			You lost...
		{/if}
	</h2>
	<Button
		onclick={() => {
			updateGameState(prepare());
		}}
	>
		Play again
	</Button>
</div>
