<script lang="ts">
	import type { GameState } from '$lib/types/GameState';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		gameState: GameState;
		variant?: Variant;
		player: number;
	};

	let { gameState, variant = 'neutral', player }: Props = $props();

	const variants = {
		primary: 'text-primary-foreground',
		secondary: 'text-secondary-foreground',
		neutral: 'text-gray-500'
	} as const;

	const baseStyles = 'flex items-center justify-center text-xs';
</script>

{#if player === gameState.currentPlayer}
	<div class={cn(baseStyles, variants[variant])}>
		{#if gameState.pickedCard === null}
			pick a card
		{:else}
			put a card or end turn
		{/if}
	</div>
{:else}
	<div class={cn(baseStyles, variants['neutral'])}>
		waiting for player {gameState.currentPlayer}...
	</div>
{/if}
