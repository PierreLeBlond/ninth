<script lang="ts">
	import type { Card } from '$lib/types/Card';
	import CardComponent from './Card.svelte';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type BaseProps = {
		cards: Card[];
		disabled?: boolean;
		variant?: Variant;
	};

	type ItemsDisabledProps = BaseProps & {
		itemsDisabled: true;
	};

	type ItemsEnabledProps = BaseProps & {
		itemsDisabled?: false;
		onItemClick: (index: number) => void;
	};

	let props: ItemsDisabledProps | ItemsEnabledProps = $props();
	let open = $state(false);

	const variants = {
		primary: 'border-primary-foreground',
		secondary: 'border-secondary-foreground',
		neutral: 'border-gray-100'
	} as const;

	const baseStyles =
		'bg-stone-900 text-stone-200 aspect-card border-b-4 flex w-full items-center justify-center rounded-md border-t border-x text-3xl font-bold text-gray-400';

	const handleItemClick = (index: number) => {
		if (props.itemsDisabled) {
			return;
		}
		props.onItemClick(index);
		open = false;
	};
</script>

<button
	class={cn(baseStyles, variants[props.variant ?? 'neutral'])}
	disabled={props.disabled}
	onclick={() => (open = !open)}
>
	{props.cards.length}
</button>

{#if open}
	<div class="absolute inset-0 z-10 grid w-full grid-cols-5 items-center justify-center gap-2 p-2">
		<button
			aria-label="close"
			class="absolute inset-0 bg-black/50 backdrop-blur-xs"
			onclick={() => (open = false)}
		>
		</button>
		<div
			class="pointer-events-none relative col-span-3 col-start-2 grid grid-cols-subgrid gap-2 pt-16"
		>
			{#each props.cards as card, index (index)}
				<div class="pointer-events-auto contents">
					<CardComponent
						onclick={() => handleItemClick(index)}
						disabled={props.itemsDisabled}
						variant={props.variant}
					>
						{card.type}
					</CardComponent>
				</div>
			{/each}
		</div>
	</div>
{/if}
