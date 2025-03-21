<script lang="ts">
	import type { CardName } from '$lib/config.ts';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		cardName: CardName;
		onChoose: () => void;
		disabled?: boolean;
		variant?: Variant;
	};

	let { cardName, onChoose, disabled = false, variant = 'neutral' }: Props = $props();

	const variants = {
		primary: 'bg-primary-background text-primary-foreground',
		secondary: 'bg-secondary-background text-secondary-foreground',
		neutral: 'bg-gray-200 text-gray-500'
	} as const;

	const baseStyles =
		'aspect-card flex w-full items-center justify-center rounded-md border border-gray-300 text-xs font-bold shadow-md disabled:shadow-none lg:text-base';
</script>

<button class={cn(baseStyles, variants[variant])} onclick={onChoose} {disabled}>
	{cardName || 'X'}
</button>
