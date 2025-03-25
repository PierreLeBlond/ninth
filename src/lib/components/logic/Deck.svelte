<script lang="ts">
	import type { CardName } from '$lib/config';
	import Card from '../ui/Card.svelte';
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
		primary: 'border-primary-foreground',
		secondary: 'border-secondary-foreground',
		neutral: 'border-gray-100'
	} as const;

	const baseStyles =
		'bg-stone-900 text-stone-200 aspect-card border-b-4 flex w-full items-center justify-center rounded-md border-t border-x text-3xl font-bold text-gray-400';
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
					<Card
						onclick={props.choosable ? () => props.onChoose(index) : () => {}}
						disabled={!props.choosable}
						variant={props.variant}
					>
						{card}
					</Card>
				</div>
			{/each}
		</div>
	</div>
{/if}
