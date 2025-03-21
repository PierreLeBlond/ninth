<script lang="ts">
	import { pickCard } from '$lib/player/pickCard';
	import { putCard } from '$lib/player/putCard';
	import type { GameState } from '$lib/types/GameState';
	import Card from './Card.svelte';

	type Props = {
		gameState: GameState;
		handCardIndex: number | null;
		updateGameState: (gameState: GameState) => void;
	};

	let { gameState, handCardIndex, updateGameState }: Props = $props();

	let canPick = $derived(gameState.pickedCard === null);
	let canPut = $derived(gameState.pickedCard !== null && handCardIndex !== null);

	$inspect({ canPick, canPut });

	const handleChooseCard = (index: number) => {
		if (canPick) {
			const newGameState = pickCard($state.snapshot(gameState), index);
			updateGameState(newGameState);
		}

		// TODO: Handle type error cause canPut should ensure handCardIndex is not null
		if (canPut && handCardIndex !== null) {
			const newGameState = putCard($state.snapshot(gameState), index, handCardIndex);
			updateGameState(newGameState);
		}
	};
</script>

{#each gameState.board as card, index (index)}
	{@const pickable = card !== null && canPick}
	{@const putable = card === null && canPut}
	<Card cardName={card} onChoose={() => handleChooseCard(index)} disabled={!pickable && !putable} />
{/each}
