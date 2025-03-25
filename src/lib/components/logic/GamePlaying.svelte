<script lang="ts">
	import type { GameState } from '$lib/types/GameState';
	import Board from '$lib/components/ui/Board.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Deck from '$lib/components/ui/Deck.svelte';
	import EndTurn from '$lib/components/ui/Button.svelte';
	import Info from '$lib/components/ui/Info.svelte';
	import EmptyCard from '$lib/components/ui/EmptyCard.svelte';
	import { usePlayer } from '$lib/hooks/usePlayer.svelte';
	import { pickCard } from '$lib/player/pickCard';
	import { endTurn } from '$lib/player/endTurn';
	import { pickAlignment } from '$lib/player/pickAlignment';
	import { putCard } from '$lib/player/putCard';
	import Alignments from '$lib/components/ui/Alignments.svelte';
	import { useBoard } from '$lib/hooks/useBoard.svelte';
	import { useInfo } from '$lib/hooks/useInfo.svelte';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
	};

	let { gameState, updateGameState }: Props = $props();

	const players = gameState.players.map((_, index) =>
		usePlayer({
			get gameState() {
				return gameState;
			},
			player: index
		})
	);

	const infos = players.map((player) =>
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
		get currentPlayer() {
			return players[gameState.currentPlayer];
		}
	});

	const handlePickCard = (index: number) => {
		const newGameState = pickCard($state.snapshot(gameState), index);
		updateGameState(newGameState);
	};

	const handlePutCard = (index: number) => {
		const drawnCardIndex = players[gameState.currentPlayer].drawnCardIndex;
		if (drawnCardIndex === null) {
			throw new Error('No card drawn');
		}
		const newGameState = putCard($state.snapshot(gameState), index, drawnCardIndex);
		// Do not forget to undraw the card from player hand state.
		players[gameState.currentPlayer].undrawCard();
		updateGameState(newGameState);
	};

	const handlePickAlignment = (cardIndexes: number[]) => {
		const newGameState = pickAlignment($state.snapshot(gameState), cardIndexes);
		updateGameState(newGameState);
	};

	const handleEndTurn = () => {
		const newGameState = endTurn($state.snapshot(gameState));
		updateGameState(newGameState);
	};
</script>

<div class="grid w-full grid-cols-5 grid-rows-7 gap-2 p-2 lg:grid-cols-11 lg:grid-rows-6 lg:p-8">
	<div class="col-start-5">
		{#if players[0].hasPickedACard}
			<Card disabled={true} variant={'primary'}>
				{gameState.pickedCard.type}
			</Card>
		{:else}
			<EmptyCard disabled={true} variant={'primary'} />
		{/if}
	</div>

	<div class="row-start-6">
		{#if players[1].hasPickedACard}
			<Card disabled={true} variant={'secondary'}>
				{gameState.pickedCard.type}
			</Card>
		{:else}
			<EmptyCard disabled={true} variant={'secondary'} />
		{/if}
	</div>

	<div class="col-start-1 row-start-2 lg:row-start-6">
		<Deck cards={gameState.players[0].wonCards} variant={'primary'} itemsDisabled />
	</div>
	<div class="col-start-5 row-start-6 lg:col-start-11 lg:row-start-6">
		<Deck cards={gameState.players[1].wonCards} variant={'secondary'} itemsDisabled />
	</div>

	<div class="row-start-4 lg:col-start-11 lg:row-start-6">
		<Deck cards={gameState.remainingCards} itemsDisabled />
	</div>

	<div class="col-start-4 row-start-2 lg:row-start-2">
		<Deck
			cards={players[0].hand}
			itemsDisabled={!players[0].hasPickedACard}
			onItemClick={(index) => players[0].drawCard(index)}
			variant={'primary'}
		/>
	</div>
	<div class="col-start-3 row-start-2 lg:row-start-2">
		{#if players[0].hasDrawnACard}
			<Card onclick={() => players[0].undrawCard()} variant={'primary'}>
				{players[0].drawnCard.type}
			</Card>
		{:else}
			<EmptyCard disabled={true} variant={'primary'} />
		{/if}
	</div>

	<div class="col-start-2 row-start-6">
		<Deck
			cards={players[1].hand}
			itemsDisabled={!players[1].hasPickedACard}
			onItemClick={(index) => players[1].drawCard(index)}
			variant={'secondary'}
		/>
	</div>
	<div class="col-start-3 row-start-6">
		{#if players[1].hasDrawnACard}
			<Card onclick={() => players[1].undrawCard()} variant={'secondary'}>
				{players[1].drawnCard.type}
			</Card>
		{:else}
			<EmptyCard disabled={true} variant={'secondary'} />
		{/if}
	</div>

	<div class="relative col-span-3 col-start-2 row-span-3 row-start-3 lg:col-start-5 lg:row-start-2">
		<Board
			board={board.board}
			onCardClick={handlePickCard}
			onEmptyCardClick={handlePutCard}
			cardDisabled={!board.canPick}
			emptyCardDisabled={!board.canPut}
		/>

		<div class="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2">
			<Alignments
				alignments={board.alignments}
				onAlignmentClick={handlePickAlignment}
				variant={gameState.currentPlayer === 0 ? 'primary' : 'secondary'}
			/>
		</div>
	</div>

	<div
		class="col-span-3 col-start-3 row-start-1 flex rotate-180 items-center justify-center text-xl font-bold lg:col-span-3 lg:col-start-5 lg:row-start-1"
	>
		<Info variant={'primary'}>
			{infos[0].info()}
		</Info>
	</div>

	<div
		class="col-span-3 col-start-1 row-start-7 flex items-center justify-center text-xl font-bold lg:col-span-3 lg:col-start-5 lg:row-start-1"
	>
		<Info variant={'secondary'}>
			{infos[1].info()}
		</Info>
	</div>

	<div class="col-span-2 col-start-1 row-start-1 flex rotate-180 items-center justify-center">
		<EndTurn onclick={handleEndTurn} variant={'primary'} disabled={!players[0].hasPickedACard}>
			End turn
		</EndTurn>
	</div>

	<div class="col-span-2 col-start-4 row-start-7 flex items-center justify-center">
		<EndTurn onclick={handleEndTurn} variant={'secondary'} disabled={!players[1].hasPickedACard}>
			End turn
		</EndTurn>
	</div>
</div>
