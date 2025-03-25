<script lang="ts">
	import type { GameState } from '$lib/types/GameState';
	import Board from './Board.svelte';
	import Card from '../ui/Card.svelte';
	import Deck from './Deck.svelte';
	import EndTurn from './EndTurn.svelte';
	import Info from './Info.svelte';
	import EmptyCard from '$lib/components/ui/EmptyCard.svelte';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
	};

	let { gameState, updateGameState }: Props = $props();

	// This is one of a player's hand cards
	let selectedCardIndex = $state<number | null>(null);
</script>

<div class="grid w-full grid-cols-5 grid-rows-7 gap-2 p-2 lg:grid-cols-11 lg:grid-rows-6 lg:p-8">
	<div class="col-start-5">
		{#if gameState.currentPlayer === 0 && gameState.pickedCard !== null}
			<Card onclick={() => {}} disabled={true} variant={'primary'}>
				{gameState.pickedCard}
			</Card>
		{:else}
			<EmptyCard disabled={true} variant={'primary'} />
		{/if}
	</div>

	<div class="row-start-6">
		{#if gameState.currentPlayer === 1 && gameState.pickedCard !== null}
			<Card onclick={() => {}} disabled={true} variant={'secondary'}>
				{gameState.pickedCard}
			</Card>
		{:else}
			<EmptyCard disabled={true} variant={'secondary'} />
		{/if}
	</div>

	<div class="col-start-1 row-start-2 lg:row-start-6">
		<Deck cards={gameState.players[0].wonCards} variant={'primary'} />
	</div>
	<div class="col-start-5 row-start-6 lg:col-start-11 lg:row-start-6">
		<Deck cards={gameState.players[1].wonCards} variant={'secondary'} />
	</div>

	<div class="row-start-4 lg:col-start-11 lg:row-start-6">
		<Deck cards={gameState.remainingCards} />
	</div>

	<div class="col-start-3 row-start-2 lg:row-start-2">
		<Deck
			cards={gameState.players[0].hand}
			choosable={gameState.pickedCard !== null}
			onChoose={(index) => (selectedCardIndex = index)}
			variant={'primary'}
		/>
	</div>

	<div class="col-start-3 row-start-6">
		<Deck
			cards={gameState.players[1].hand}
			choosable={gameState.pickedCard !== null}
			onChoose={(index) => (selectedCardIndex = index)}
			variant={'secondary'}
		/>
	</div>

	<div class="relative col-span-3 col-start-2 row-span-3 row-start-3 lg:col-start-5 lg:row-start-2">
		<Board {gameState} {updateGameState} handCardIndex={selectedCardIndex} />
	</div>

	<div
		class="col-span-3 col-start-3 row-start-1 flex rotate-180 items-center justify-center text-xl font-bold lg:col-span-3 lg:col-start-5 lg:row-start-1"
	>
		<Info {gameState} variant={'primary'} player={0} />
	</div>

	<div
		class="col-span-3 col-start-1 row-start-7 flex items-center justify-center text-xl font-bold lg:col-span-3 lg:col-start-5 lg:row-start-1"
	>
		<Info {gameState} variant={'secondary'} player={1} />
	</div>

	<div class="col-span-2 col-start-1 row-start-1 flex rotate-180 items-center justify-center">
		<EndTurn {gameState} {updateGameState} variant={'primary'} player={0} />
	</div>

	<div class="col-span-2 col-start-4 row-start-7 flex items-center justify-center">
		<EndTurn {gameState} {updateGameState} variant={'secondary'} player={1} />
	</div>
</div>
