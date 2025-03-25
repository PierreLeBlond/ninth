<script lang="ts">
	import { endTurn } from '$lib/player/endTurn';
	import type { GameState } from '$lib/types/GameState';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		gameState: GameState;
		updateGameState: (gameState: GameState) => void;
		variant?: Variant;
		player: number;
	};

	let { gameState, updateGameState, variant = 'neutral', player }: Props = $props();

	const variants = {
		primary: 'border-primary-foreground text-primary-foreground',
		secondary: 'border-secondary-foreground text-secondary-foreground',
		neutral: 'border-gray-100 text-gray-500'
	} as const;

	const baseStyles =
		'bg-stone-100 border w-full rounded-md p-2 font-bold disabled:text-gray-300 disabled:border-gray-300';

	const handleEndTurn = () => {
		const newGameState = endTurn($state.snapshot(gameState));
		updateGameState(newGameState);
	};
</script>

<button
	class={cn(baseStyles, variants[variant])}
	onclick={handleEndTurn}
	disabled={gameState.pickedCard === null || gameState.currentPlayer !== player}
>
	End turn
</button>
