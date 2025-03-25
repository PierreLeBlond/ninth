<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		variant?: Variant;
		children: Snippet;
		onclick: () => void;
	};

	type DisabledProps = {
		disabled: true;
	};

	type EnabledProps = {
		disabled?: false;
		onclick: () => void;
	};

	let props: Props & (DisabledProps | EnabledProps) = $props();

	const variants = {
		primary: 'border-primary-foreground text-primary-foreground',
		secondary: 'border-secondary-foreground text-secondary-foreground',
		neutral: 'border-gray-100 text-gray-500'
	} as const;

	const baseStyles =
		'bg-stone-100 border w-full rounded-md p-2 font-bold disabled:text-gray-300 disabled:border-gray-300';
</script>

<button
	class={cn(baseStyles, variants[props.variant ?? 'neutral'])}
	onclick={props.onclick}
	disabled={props.disabled}
>
	{@render props.children()}
</button>
