<script lang="ts">
	import type { GameState } from '$lib/types/GameState';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
	};

	let { gameState, updateGameState }: Props = $props();
	let gameStates: GameState[] = [$state.snapshot(gameState)];
	let isNavigatingHistory = false;
	let cursor = 0;

	$effect(() => {
		// Skip adding new state if we're navigating through history
		if (isNavigatingHistory) {
			isNavigatingHistory = false;
			return;
		}

		// Forget all game states after the current cursor
		gameStates = gameStates.slice(0, cursor);

		// Add the new game state
		gameStates.push($state.snapshot(gameState));

		// Update the cursor
		cursor++;
	});

	const handlePrevious = () => {
		if (cursor > 0) {
			isNavigatingHistory = true;
			cursor--;
			const previousState = gameStates[cursor];
			updateGameState(previousState);
		}
	};

	const handleNext = () => {
		if (cursor < gameStates.length - 1) {
			isNavigatingHistory = true;
			cursor++;
			const nextState = gameStates[cursor];
			updateGameState(nextState);
		}
	};
</script>

<div class="grid w-full grid-cols-5 items-center justify-between gap-2 p-2">
	<button class="col-span-2 rounded-md bg-blue-500 p-2 text-white" onclick={handlePrevious}>
		Previous
	</button>
	<button class="col-span-2 col-start-4 rounded-md bg-blue-500 p-2 text-white" onclick={handleNext}>
		Next
	</button>
</div>
