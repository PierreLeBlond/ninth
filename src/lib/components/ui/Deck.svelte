<script lang="ts">
	import type { Card } from '$lib/types/Card';
	import CardComponent from './Card.svelte';
	import { cn } from '$lib/utils/cn';
	import { crossfade } from '$lib/utils/crossfade';

	const [send, receive] = crossfade;

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
		'absolute inset-0 bg-stone-900 text-stone-200 aspect-card flex w-full items-center justify-center rounded-md border border text-3xl font-bold text-gray-400';

	const handleItemClick = (index: number) => {
		if (props.itemsDisabled) {
			return;
		}
		props.onItemClick(index);
		open = false;
	};
</script>

<div class="aspect-card relative w-full">
	{#each props.cards as card, index (card.index)}
		<div
			class="absolute inset-0"
			in:receive|global={{ key: card.index }}
			out:send|global={{ key: card.index }}
			style="transform: translateY(-{index * 0.2}px)"
		>
			<CardComponent disabled={true} variant={props.variant}>
				{card.type}
			</CardComponent>
		</div>
	{/each}
	<button
		class={cn(baseStyles, variants[props.variant ?? 'neutral'])}
		style="transform: translateY(-{props.cards.length * 0.2}px)"
		disabled={props.disabled}
		onclick={() => (open = !open)}
	>
		{props.cards.length}
	</button>
</div>

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
