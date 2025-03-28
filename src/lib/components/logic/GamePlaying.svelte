<script lang="ts">
	import type { GameState } from '$lib/types/GameState';
	import Board from '$lib/components/ui/Board.svelte';
	import Deck from '$lib/components/ui/Deck.svelte';
	import Button from '$lib/components/ui/Button.svelte';
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
		controllablePlayers: number[];
		reverse?: boolean;
	};

	const { gameState, updateGameState, controllablePlayers, reverse = false }: Props = $props();

	const players = gameState.players.map((_, index) =>
		usePlayer({
			get gameState() {
				return gameState;
			},
			player: index,
			controllablePlayers
		})
	);

	let firstPlayer = reverse ? players[1] : players[0];
	let secondPlayer = reverse ? players[0] : players[1];

	// TODO: This is a bit redundant with the `isActive` property in the `usePlayer` hook, should be refactored.
	let activePlayer = $derived(players[gameState.activePlayer]);

	let firstPlayerVariant: 'primary' | 'secondary' = reverse ? 'secondary' : 'primary';
	let secondPlayerVariant: 'primary' | 'secondary' = reverse ? 'primary' : 'secondary';

	const [firstPlayerInfo, secondPlayerInfo] = [firstPlayer, secondPlayer].map((player) =>
		useInfo({
			get player() {
				return player;
			}
		})
	);

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
	class="horizontal:h-full horizontal:w-auto grid aspect-[32/70] w-full grid-cols-5 grid-rows-7 gap-2 px-2"
>
	<div class="col-start-5 row-start-2">
		<Cards
			disabled={true}
			variant={secondPlayerVariant}
			cards={secondPlayer.pickedCard ? [secondPlayer.pickedCard] : []}
		></Cards>
	</div>

	<div class="row-start-6">
		<Cards
			disabled={true}
			variant={firstPlayerVariant}
			cards={firstPlayer.pickedCard ? [firstPlayer.pickedCard] : []}
		></Cards>
	</div>

	<div class="col-start-1 row-start-2">
		<Deck cards={secondPlayer.wonCards} variant={secondPlayerVariant} itemsDisabled />
	</div>
	<div class="col-start-5 row-start-6">
		<Deck cards={firstPlayer.wonCards} variant={firstPlayerVariant} itemsDisabled />
	</div>

	<div class="row-start-4">
		<Deck cards={gameState.remainingCards} itemsDisabled />
	</div>

	<div class="col-start-4 row-start-2">
		<Deck
			cards={secondPlayer.hand}
			itemsDisabled={!secondPlayer.isControllable || !secondPlayer.hasPickedACard}
			onItemClick={(index) => secondPlayer.drawCard(index)}
			variant={secondPlayerVariant}
			disabled={!secondPlayer.isControllable}
		/>
	</div>

	{#if secondPlayer.isControllable}
		<div class="col-start-3 row-start-2">
			<Cards
				disabled={!secondPlayer.hasDrawnACard}
				onClick={() => secondPlayer.undrawCard()}
				variant={secondPlayerVariant}
				cards={secondPlayer.drawnCard ? [secondPlayer.drawnCard] : []}
			></Cards>
		</div>
	{/if}

	<div class="col-start-2 row-start-6">
		<Deck
			cards={firstPlayer.hand}
			itemsDisabled={!firstPlayer.isControllable || !firstPlayer.hasPickedACard}
			onItemClick={(index) => firstPlayer.drawCard(index)}
			variant={firstPlayerVariant}
			disabled={!firstPlayer.isControllable}
		/>
	</div>

	{#if firstPlayer.isControllable}
		<div class="col-start-3 row-start-6">
			<Cards
				disabled={!firstPlayer.hasDrawnACard}
				onClick={() => firstPlayer.undrawCard()}
				variant={firstPlayerVariant}
				cards={firstPlayer.drawnCard ? [firstPlayer.drawnCard] : []}
			></Cards>
		</div>
	{/if}

	<div class="relative col-span-3 col-start-2 row-span-3 row-start-3">
		<Board
			board={board.board}
			onCardClick={handlePickCard}
			onEmptyCardClick={handlePutCard}
			cardDisabled={!activePlayer.isControllable || !board.canPick}
			emptyCardDisabled={!activePlayer.isControllable || !board.canPut}
			{reverse}
		/>

		<div class="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2">
			<Alignments
				alignments={board.alignments}
				onAlignmentClick={handlePickAlignment}
				disabled={!activePlayer.isControllable}
				variant={activePlayer === firstPlayer ? firstPlayerVariant : secondPlayerVariant}
			/>
		</div>
	</div>

	{#if firstPlayer.isControllable}
		<div class="col-span-3 col-start-1 row-start-7 flex items-center justify-center">
			<Info variant={firstPlayerVariant}>
				{firstPlayerInfo.info()}
			</Info>
		</div>

		<div class="col-span-2 col-start-4 row-start-7 flex items-center justify-center text-xs">
			<Button
				onclick={handleEndTurn}
				variant={firstPlayerVariant}
				disabled={!firstPlayer.hasPickedACard}
			>
				END TURN
			</Button>
		</div>
	{/if}

	{#if secondPlayer.isControllable}
		<div class="col-span-3 col-start-3 row-start-1 flex items-center justify-center">
			<Info variant={secondPlayerVariant}>
				{secondPlayerInfo.info()}
			</Info>
		</div>

		<div class="col-span-2 col-start-1 row-start-1 flex items-center justify-center text-xs">
			<Button
				onclick={handleEndTurn}
				variant={secondPlayerVariant}
				disabled={!secondPlayer.hasPickedACard}
			>
				END TURN
			</Button>
		</div>
	{/if}
</div>
