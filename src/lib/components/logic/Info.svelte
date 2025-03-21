<script lang="ts">
	import type { GameState } from '$lib/types/GameState';

	type Props = {
		gameState: GameState;
	};

	let { gameState }: Props = $props();
</script>

<div class="flex items-center justify-center text-xs">
	{#if gameState.pickedCard === null}
		Player {gameState.currentPlayer} pick a card
	{:else}
		Player {gameState.currentPlayer} put a card or end turn
	{/if}
</div>
