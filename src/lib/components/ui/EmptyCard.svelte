<script lang="ts">
	import { cn } from '$lib/utils/cn';
	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		variant?: Variant;
		onclick?: () => void;
		disabled?: boolean;
	};

	let { variant = 'neutral', onclick, disabled }: Props = $props();

	const variants = {
		primary: 'border-primary-foreground',
		secondary: 'border-secondary-foreground',
		neutral: 'border-gray-100'
	} as const;

	const baseStyles =
		'not-disabled:shadow-highlight-sm hover:shadow-highlight-md shadow-white bg-black aspect-card flex w-full items-center justify-center rounded-md border text-3xl font-bold disabled:shadow-none';
</script>

<button class={cn(baseStyles, variants[variant])} {disabled} {onclick} aria-label="Empty card"
></button>
