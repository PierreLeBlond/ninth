<script lang="ts">
	import type { CardName } from '$lib/config';
	import Card from './Card.svelte';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type BaseProps = {
		cards: CardName[];
		disabled?: boolean;
		variant?: Variant;
	};

	type NotChooseableProps = BaseProps & {
		choosable?: false;
	};

	type ChooseableProps = BaseProps & {
		choosable: true;
		onChoose: (index: number) => void;
	};

	let props: NotChooseableProps | ChooseableProps = $props();
	let open = $state(false);

	const variants = {
		primary: 'bg-primary-background text-primary-foreground',
		secondary: 'bg-secondary-background text-secondary-foreground',
		neutral: 'bg-gray-200 text-gray-500'
	} as const;

	const baseStyles =
		'aspect-card flex w-full items-center justify-center rounded-md border border-gray-300 text-3xl font-bold text-gray-400';
</script>

<button
	class={cn(baseStyles, variants[props.variant ?? 'neutral'])}
	disabled={props.disabled}
	onclick={() => (open = !open)}
>
	{props.cards.length}
</button>

{#if open}
	<div class="absolute inset-0 grid w-full grid-cols-5 items-center justify-center gap-2 p-2">
		<button aria-label="close" class="absolute inset-0 bg-black/50" onclick={() => (open = false)}>
		</button>
		<div class="relative col-span-3 col-start-2 grid grid-cols-subgrid gap-2 pt-16">
			{#each props.cards as card, index (index)}
				<Card
					cardName={card}
					onChoose={props.choosable ? () => props.onChoose(index) : () => {}}
					disabled={!props.choosable}
					variant={props.variant}
				/>
			{/each}
		</div>
	</div>
{/if}
