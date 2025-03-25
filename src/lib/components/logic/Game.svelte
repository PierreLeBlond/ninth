<script lang="ts">
	import { useHistory } from '$lib/hooks/useHistory.svelte';
	import type { GameState } from '$lib/types/GameState';
	import History from '../ui/History.svelte';
	import { isOver } from '$lib/game/isOver';
	import GamePlaying from './GamePlaying.svelte';
	import GameOver from './GameOver.svelte';
	import { getNearEndGame } from '$lib/game/getNearEndGame';

	// const initialGameState = prepare();
	const initialGameState = getNearEndGame();
	let gameState = $state(initialGameState);

	let gameOver = $state(false);

	const updateGameStateFromHistory = (updatedGameState: GameState) => {
		// TODO: Check gamestate validity
		gameState = updatedGameState;
		// TODO: End game if necessary
		gameOver = isOver(gameState);
	};

	const history = useHistory({
		updateState: updateGameStateFromHistory
	});
	history.addState($state.snapshot(initialGameState));

	const updateGameState = (updatedGameState: GameState) => {
		history.addState($state.snapshot(updatedGameState));
		updateGameStateFromHistory(updatedGameState);
	};
</script>

{#if gameOver}
	<GameOver {gameState} {updateGameState} />
{:else}
	<GamePlaying {gameState} {updateGameState} />
{/if}
<History {...history} />
