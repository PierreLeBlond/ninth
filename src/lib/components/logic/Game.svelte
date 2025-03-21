<script lang="ts">
	import { prepare } from '$lib/game/prepare';
	import type { GameState } from '$lib/types/GameState';
	import Board from './Board.svelte';
	import Card from './Card.svelte';
	import Debug from './Debug.svelte';
	import Deck from './Deck.svelte';
	import EndTurn from './EndTurn.svelte';
	import Info from './Info.svelte';
	import { cn } from '$lib/utils/cn';

	let gameState = $state(prepare());

	const updateGameState = (updatedGameState: GameState) => {
		// TODO: Check gamestate validity
		gameState = updatedGameState;
		// TODO: End game if necessary
	};

	// This is one of a player's hand cards
	let selectedCardIndex = $state<number | null>(null);
</script>

<div class="grid w-full grid-cols-5 grid-rows-6 gap-2 p-2 lg:grid-cols-11 lg:grid-rows-6 lg:p-8">
	<div class="col-start-5">
		<Card
			cardName={gameState.currentPlayer === 0 ? gameState.pickedCard : null}
			onChoose={() => {}}
			disabled={true}
			variant={'primary'}
		/>
	</div>

	<div class="row-start-5">
		<Card
			cardName={gameState.currentPlayer === 1 ? gameState.pickedCard : null}
			onChoose={() => {}}
			disabled={true}
			variant={'secondary'}
		/>
	</div>

	<div class="col-start-1 row-start-1 lg:row-start-6">
		<Deck cards={gameState.players[0].wonCards} variant={'primary'} />
	</div>
	<div class="col-start-5 row-start-5 lg:col-start-11 lg:row-start-6">
		<Deck cards={gameState.players[1].wonCards} variant={'secondary'} />
	</div>

	<div class="row-start-3 lg:col-start-11 lg:row-start-6">
		<Deck cards={gameState.remainingCards} />
	</div>

	<div class="col-start-3 row-start-1 lg:row-start-2">
		<Deck
			cards={gameState.players[0].hand}
			choosable={gameState.pickedCard !== null}
			onChoose={(index) => (selectedCardIndex = index)}
			variant={'primary'}
		/>
	</div>

	<div class="col-start-3 row-start-5">
		<Deck
			cards={gameState.players[1].hand}
			choosable={gameState.pickedCard !== null}
			onChoose={(index) => (selectedCardIndex = index)}
			variant={'secondary'}
		/>
	</div>

	<div
		class="col-span-3 col-start-2 row-span-3 row-start-2 grid grid-cols-subgrid grid-rows-subgrid lg:col-start-5 lg:row-start-2"
	>
		<Board {gameState} {updateGameState} handCardIndex={selectedCardIndex} />
	</div>

	<div
		class="col-span-3 row-start-6 flex items-center justify-center text-xl font-bold lg:col-span-3 lg:col-start-5 lg:row-start-1"
	>
		<Info {gameState} variant={gameState.currentPlayer === 0 ? 'primary' : 'secondary'} />
	</div>

	<div class="col-span-2 col-start-4 row-start-6 flex items-center justify-center">
		<EndTurn
			{gameState}
			{updateGameState}
			variant={gameState.currentPlayer === 0 ? 'primary' : 'secondary'}
		/>
	</div>
</div>

<Debug {gameState} {updateGameState} />
