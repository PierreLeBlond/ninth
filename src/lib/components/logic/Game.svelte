<script lang="ts">
	import { prepare } from '$lib/game/prepare';
	import type { GameState } from '$lib/types/GameState';
	import Board from './Board.svelte';
	import Card from './Card.svelte';
	import Deck from './Deck.svelte';
	import EndTurn from './EndTurn.svelte';
	import Info from './Info.svelte';

	let gameState = $state(prepare());
	let gameStates: GameState[] = $state([]);

	const updateGameState = (updatedGameState: GameState) => {
		// TODO: Check gamestate validity
		gameStates.push($state.snapshot(gameState));
		gameState = updatedGameState;
	};
</script>

<div class="grid w-full grid-cols-5 grid-rows-6 gap-2 p-2 lg:grid-cols-11 lg:grid-rows-6 lg:p-8">
	<div class="col-start-5">
		<Card
			cardName={gameState.currentPlayer === 0 ? gameState.pickedCard : null}
			onChoose={() => {}}
			disabled={true}
		/>
	</div>

	<div class="row-start-5">
		<Card
			cardName={gameState.currentPlayer === 1 ? gameState.pickedCard : null}
			onChoose={() => {}}
			disabled={true}
		/>
	</div>

	<div class="col-start-1 row-start-1 lg:row-start-6">
		<Deck size={gameState.players[0].wonCards.length} />
	</div>
	<div class="col-start-5 row-start-5 lg:col-start-11 lg:row-start-6">
		<Deck size={gameState.players[1].wonCards.length} />
	</div>

	<div class="row-start-3 lg:col-start-11 lg:row-start-6">
		<Deck size={gameState.remainingCards.length} />
	</div>

	<div class="col-start-3 row-start-1 lg:row-start-2">
		<Deck size={gameState.players[0].hand.length} />
	</div>

	<div class="col-start-3 row-start-5">
		<Deck size={gameState.players[1].hand.length} />
	</div>

	<div
		class="col-span-3 col-start-2 row-span-3 row-start-2 grid grid-cols-subgrid grid-rows-subgrid lg:col-start-5 lg:row-start-2"
	>
		<Board {gameState} {updateGameState} handCardIndex={null} />
	</div>

	<div
		class="col-span-3 row-start-6 flex items-center justify-center text-xl font-bold lg:col-span-3 lg:col-start-5 lg:row-start-1"
	>
		<Info {gameState} />
	</div>

	<div class="col-span-2 col-start-4 row-start-6 flex items-center justify-center">
		<EndTurn {gameState} {updateGameState} />
	</div>
</div>
