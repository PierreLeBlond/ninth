<script lang="ts">
	import { getAlignments } from '$lib/game/getAlignments';
	import { pickAlignment } from '$lib/player/pickAlignment';
	import { pickCard } from '$lib/player/pickCard';
	import { putCard } from '$lib/player/putCard';
	import type { GameState } from '$lib/types/GameState';
	import { cn } from '$lib/utils/cn';
	import Card from '$lib/components/ui/Card.svelte';
	import EmptyCard from '$lib/components/ui/EmptyCard.svelte';

	type Props = {
		gameState: GameState;
		hand: { drawnCardIndex: number | null; undrawCard: () => void };
		updateGameState: (gameState: GameState) => void;
	};

	let { gameState, hand, updateGameState }: Props = $props();

	let canPick = $derived(gameState.pickedCard === null);
	let canAlignment = $derived(gameState.pickedCard !== null);
	let canPut = $derived(gameState.pickedCard !== null && hand.drawnCardIndex !== null);

	const possibleAlignementElements = [
		{
			class: 'col-start-1 row-start-1 col-span-3',
			cardIndexes: [0, 1, 2]
		},
		{
			class: 'col-start-1 row-start-2 col-span-3',
			cardIndexes: [3, 4, 5]
		},
		{
			class: 'col-start-1 row-start-3 col-span-3',
			cardIndexes: [6, 7, 8]
		},
		{
			class: 'col-start-1 row-start-1 row-span-3',
			cardIndexes: [0, 3, 6]
		},
		{
			class: 'col-start-2 row-start-1 row-span-3',
			cardIndexes: [1, 4, 7]
		},
		{
			class: 'col-start-3 row-start-1 row-span-3',
			cardIndexes: [2, 5, 8]
		}
	];

	const alignmentElements = $derived.by(() => {
		const alignments = getAlignments(gameState);
		const alignmentElements = alignments.map((alignement) => {
			const alignmentElement = possibleAlignementElements.find((possibleAlignement) =>
				possibleAlignement.cardIndexes.every((index) => alignement.includes(index))
			);
			if (!alignmentElement) {
				throw new Error('Alignment element not found');
			}
			return alignmentElement;
		});
		return alignmentElements;
	});

	const handlePickAlignment = (cardIndexes: number[]) => {
		const newGameState = pickAlignment($state.snapshot(gameState), cardIndexes);
		updateGameState(newGameState);
	};

	const handlePutCard = (index: number) => {
		if (!canPut || hand.drawnCardIndex === null) {
			return;
		}
		const newGameState = putCard($state.snapshot(gameState), index, hand.drawnCardIndex);
		// Do not forget to undraw the card from player hand. this shouldn't be the board responsibility though.
		hand.undrawCard();
		updateGameState(newGameState);
	};

	const handlePickCard = (index: number) => {
		if (!canPick) {
			return;
		}
		const newGameState = pickCard($state.snapshot(gameState), index);
		updateGameState(newGameState);
	};
</script>

<div class="grid grid-cols-3 grid-rows-3 gap-2">
	{#each gameState.board as card, index (index)}
		{#if card !== null}
			<Card onclick={() => handlePickCard(index)} disabled={!canPick}>
				{card}
			</Card>
		{:else}
			<EmptyCard onclick={() => handlePutCard(index)} disabled={!canPut} />
		{/if}
	{/each}
</div>

{#if canAlignment}
	<div class="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2">
		{#each alignmentElements as alignmentElement}
			<button
				aria-label="Take alignment"
				class={cn(
					alignmentElement.class,
					'hover:shadow-highlight-md not-disabled:shadow-highlight-sm pointer-events-auto scale-110 rounded-md border-2 transition-shadow',
					gameState.currentPlayer === 0
						? 'border-primary-foreground shadow-primary-foreground'
						: 'border-secondary-foreground shadow-secondary-foreground'
				)}
				onclick={() => handlePickAlignment(alignmentElement.cardIndexes)}
			></button>
		{/each}
	</div>
{/if}
