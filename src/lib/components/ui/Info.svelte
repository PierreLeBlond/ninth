<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		variant?: Variant;
		children: Snippet;
	};

	let { variant = 'neutral', children }: Props = $props();

	const variants = {
		primary: 'text-primary-foreground',
		secondary: 'text-secondary-foreground',
		neutral: 'text-gray-500'
	} as const;

	const baseStyles = 'flex items-center justify-center text-xs';
</script>

<div class={cn(baseStyles, variants[variant])}>
	{@render children()}
</div>
