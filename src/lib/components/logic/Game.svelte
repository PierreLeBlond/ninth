<script lang="ts">
	import { useHistory } from '$lib/hooks/useHistory.svelte';
	import type { GameState } from '$lib/types/GameState';
	import { isOver } from '$lib/game/isOver';
	import GamePlaying from './GamePlaying.svelte';
	import GameOver from './GameOver.svelte';
	import { useGameSocket } from '$lib/hooks/ws/useGameSocket.svelte';
	import { onDestroy } from 'svelte';
	import { getNearEndGame } from '$lib/game/getNearEndGame';

	type Props = {
		playerId: number | null;
		debug?: boolean;
		roomId: string;
	};

	const { playerId, roomId, debug = false }: Props = $props();

	//const initialGameState = prepare();
	const initialGameState = getNearEndGame();
	let gameState = $state(initialGameState);

	let gameOver = $state(false);

	// History management. Not send to other clients. Another client emit will reset the history though.
	const updateGameStateFromHistory = (updatedGameState: GameState) => {
		updateGameStateCore(updatedGameState);
	};
	const history = useHistory({
		updateState: updateGameStateFromHistory
	});
	history.addState($state.snapshot(initialGameState));
	const addToHistory = (updatedGameState: GameState) => {
		history.addState($state.snapshot(updatedGameState));
	};

	// Communicate between clients
	const updateGameStateFromWs = (updatedGameState: GameState) => {
		updateGameStateCore(updatedGameState);
		addToHistory(updatedGameState);
	};
	const { emitGameState, disconnect } = useGameSocket({
		roomId: roomId,
		get gameState() {
			return gameState;
		},
		onGameState: updateGameStateFromWs
	});

	// Will always happen
	const updateGameStateCore = (updatedGameState: GameState) => {
		gameState = updatedGameState;
		gameOver = isOver(gameState);
	};

	// Update from in game player actions
	const updateGameState = (updatedGameState: GameState) => {
		updateGameStateCore(updatedGameState);
		addToHistory(updatedGameState);
		emitGameState(updatedGameState);
	};

	onDestroy(() => {
		disconnect();
	});

	let reverse = $derived(playerId === 1);

	let controllablePlayers = $derived(debug ? [0, 1] : playerId !== null ? [playerId] : []);
</script>

{#if gameOver}
	<GameOver {gameState} {updateGameState} {playerId} />
{:else}
	<GamePlaying {gameState} {updateGameState} {controllablePlayers} {reverse} />
{/if}
<!--History {...history} /-->
