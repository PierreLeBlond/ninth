<script lang="ts">
	import { useHistory } from '$lib/hooks/useHistory.svelte';
	import type { GameState } from '$lib/types/GameState';
	import History from '../ui/History.svelte';
	import { isOver } from '$lib/game/isOver';
	import GamePlaying from './GamePlaying.svelte';
	import GameOver from './GameOver.svelte';
	import { prepare } from '$lib/game/prepare';
	import { useSocket } from '$lib/hooks/useSocket.svelte';

	const initialGameState = prepare();
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
	const { emitGameState } = useSocket({
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
</script>

{#if gameOver}
	<GameOver {gameState} {updateGameState} />
{:else}
	<GamePlaying {gameState} {updateGameState} />
{/if}
<History {...history} />
