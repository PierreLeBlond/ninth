<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		children: Snippet;
		onclick: () => void;
		disabled?: boolean;
		variant?: Variant;
	};

	let { children, onclick, disabled = false, variant = 'neutral' }: Props = $props();

	const variants = {
		primary: 'border-primary-foreground',
		secondary: 'border-secondary-foreground',
		neutral: 'border-gray-100'
	} as const;
</script>

<button
	class={cn(
		'aspect-card not-disabled:shadow-highlight-sm hover:shadow-highlight-md flex w-full items-center justify-center rounded-md border bg-stone-900 text-xs font-bold text-stone-200 shadow-white transition-shadow disabled:shadow-none lg:text-base',
		variants[variant]
	)}
	{onclick}
	{disabled}
>
	{@render children()}
</button>
