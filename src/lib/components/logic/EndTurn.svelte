<script lang="ts">
	import { endTurn } from '$lib/player/endTurn';
	import type { GameState } from '$lib/types/GameState';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
		variant?: Variant;
	};

	let { gameState, updateGameState, variant = 'neutral' }: Props = $props();

	const variants = {
		primary: 'bg-primary-background text-primary-foreground',
		secondary: 'bg-secondary-background text-secondary-foreground',
		neutral: 'bg-gray-200 text-gray-500'
	} as const;

	const baseStyles = 'w-full rounded-md p-2 font-bold';

	const handleEndTurn = () => {
		const newGameState = endTurn($state.snapshot(gameState));
		updateGameState(newGameState);
	};
</script>

<button
	class={cn(baseStyles, variants[variant])}
	onclick={handleEndTurn}
	disabled={gameState.pickedCard === null}
>
	End turn
</button>
