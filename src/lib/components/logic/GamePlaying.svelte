<script lang="ts">
	import type { GameState } from '$lib/types/GameState';
	import Board from '$lib/components/ui/Board.svelte';
	import Deck from '$lib/components/ui/Deck.svelte';
	import EndTurn from '$lib/components/ui/Button.svelte';
	import Info from '$lib/components/ui/Info.svelte';
	import { usePlayer } from '$lib/hooks/usePlayer.svelte';
	import { pickCard } from '$lib/player/pickCard';
	import { endTurn } from '$lib/player/endTurn';
	import { pickAlignment } from '$lib/player/pickAlignment';
	import { putCard } from '$lib/player/putCard';
	import Alignments from '$lib/components/ui/Alignments.svelte';
	import { useBoard } from '$lib/hooks/useBoard.svelte';
	import { useInfo } from '$lib/hooks/useInfo.svelte';
	import Cards from '$lib/components/ui/Cards.svelte';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
		playerId: number;
	};

	const { gameState, updateGameState, playerId }: Props = $props();

	const players = gameState.players.map((_, index) =>
		usePlayer({
			get gameState() {
				return gameState;
			},
			player: index
		})
	);

	let player = $derived(players[playerId]);

	let otherPlayerId = $derived(playerId === 0 ? 1 : 0);
	let otherPlayer = $derived(players[otherPlayerId]);

	// TODO: This is a bit redundant with the `isActive` property in the `usePlayer` hook, should be refactored.
	let activePlayer = $derived(players[gameState.activePlayer]);

	let playerVariant: 'primary' | 'secondary' = $derived(playerId === 0 ? 'primary' : 'secondary');
	let otherPlayerVariant: 'primary' | 'secondary' = $derived(
		playerId === 0 ? 'secondary' : 'primary'
	);

	const info = useInfo({
		get player() {
			return player;
		}
	});

	const board = useBoard({
		get gameState() {
			return gameState;
		},
		get activePlayer() {
			return activePlayer;
		}
	});

	const handlePickCard = (index: number) => {
		const newGameState = pickCard($state.snapshot(gameState), index);
		updateGameState(newGameState);
	};

	const handlePutCard = (index: number) => {
		const drawnCardIndex = activePlayer.drawnCardIndex;
		if (drawnCardIndex === null) {
			throw new Error('No card drawn');
		}
		const newGameState = putCard($state.snapshot(gameState), index, drawnCardIndex);
		// Do not forget to undraw the card from player hand state.
		activePlayer.undrawCard();
		updateGameState(newGameState);
	};

	const handlePickAlignment = (cardIndexes: number[]) => {
		const newGameState = pickAlignment($state.snapshot(gameState), cardIndexes);
		updateGameState(newGameState);
	};

	const handleEndTurn = () => {
		if (activePlayer.hasDrawnACard) {
			activePlayer.undrawCard();
		}
		const newGameState = endTurn($state.snapshot(gameState));
		updateGameState(newGameState);
	};
</script>

<div
	class="grid max-h-full w-full grid-cols-5 grid-rows-6 gap-2 px-2 lg:grid-cols-11 lg:grid-rows-6 lg:p-8"
>
	<div class="col-start-5">
		<Cards
			disabled={true}
			variant={otherPlayerVariant}
			cards={otherPlayer.pickedCard ? [otherPlayer.pickedCard] : []}
		></Cards>
	</div>

	<div class="row-start-5">
		<Cards
			disabled={true}
			variant={playerVariant}
			cards={player.pickedCard ? [player.pickedCard] : []}
		></Cards>
	</div>

	<div class="col-start-1 row-start-1 lg:row-start-6">
		<Deck cards={otherPlayer.wonCards} variant={otherPlayerVariant} itemsDisabled disabled={true} />
	</div>
	<div class="col-start-5 row-start-5 lg:col-start-11 lg:row-start-6">
		<Deck cards={player.wonCards} variant={playerVariant} itemsDisabled />
	</div>

	<div class="row-start-3 lg:col-start-11 lg:row-start-6">
		<Deck cards={gameState.remainingCards} itemsDisabled />
	</div>

	<div class="col-start-4 row-start-1 lg:row-start-2">
		<Deck
			cards={otherPlayer.hand}
			itemsDisabled={true}
			variant={otherPlayerVariant}
			disabled={true}
		/>
	</div>
	<div class="col-start-3 row-start-1 lg:row-start-2">
		<Cards
			disabled={true}
			variant={otherPlayerVariant}
			cards={otherPlayer.drawnCard ? [otherPlayer.drawnCard] : []}
		></Cards>
	</div>

	<div class="col-start-2 row-start-5">
		<Deck
			cards={player.hand}
			itemsDisabled={!player.hasPickedACard}
			onItemClick={(index) => player.drawCard(index)}
			variant={playerVariant}
		/>
	</div>
	<div class="col-start-3 row-start-5">
		<Cards
			disabled={!player.hasDrawnACard}
			onClick={() => player.undrawCard()}
			variant={playerVariant}
			cards={player.drawnCard ? [player.drawnCard] : []}
		></Cards>
	</div>

	<div class="relative col-span-3 col-start-2 row-span-3 row-start-2 lg:col-start-5 lg:row-start-2">
		<Board
			board={board.board}
			onCardClick={handlePickCard}
			onEmptyCardClick={handlePutCard}
			cardDisabled={!player.isActive || !board.canPick}
			emptyCardDisabled={!player.isActive || !board.canPut}
		/>

		<div class="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2">
			<Alignments
				alignments={board.alignments}
				onAlignmentClick={handlePickAlignment}
				disabled={!player.isActive}
				variant={player.isActive ? playerVariant : otherPlayerVariant}
			/>
		</div>
	</div>

	<div
		class="col-span-3 col-start-1 row-start-6 flex items-center justify-center text-xl font-bold lg:col-span-3 lg:col-start-5 lg:row-start-1"
	>
		<Info variant={playerVariant}>
			{info.info()}
		</Info>
	</div>

	<div class="col-span-2 col-start-4 row-start-6 flex items-center justify-center">
		<EndTurn onclick={handleEndTurn} variant={playerVariant} disabled={!player.hasPickedACard}>
			End turn
		</EndTurn>
	</div>
</div>
