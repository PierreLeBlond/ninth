<script lang="ts">
	import { endTurn } from '$lib/player/endTurn';
	import type { GameState } from '$lib/types/GameState';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
	};

	let { gameState, updateGameState }: Props = $props();

	const handleEndTurn = () => {
		const newGameState = endTurn($state.snapshot(gameState));
		updateGameState(newGameState);
	};
</script>

<button
	class="w-full rounded-md bg-blue-500 p-2 text-white"
	onclick={handleEndTurn}
	disabled={gameState.pickedCard === null}
>
	End turn
</button>
