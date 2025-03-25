<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		children: Snippet;
		variant?: Variant;
	};

	type DisabledProps = Props & {
		disabled: true;
	};

	type EnabledProps = Props & {
		disabled?: false;
		onclick: () => void;
	};

	let props: DisabledProps | EnabledProps = $props();

	const variants = {
		primary: 'border-primary-foreground',
		secondary: 'border-secondary-foreground',
		neutral: 'border-gray-100'
	} as const;

	const handleClick = () => {
		if (props.disabled) {
			return;
		}
		props.onclick();
	};
</script>

<button
	class={cn(
		'aspect-card not-disabled:shadow-highlight-sm hover:shadow-highlight-md flex w-full items-center justify-center rounded-md border bg-stone-900 text-xs font-bold text-stone-200 shadow-white transition-shadow disabled:shadow-none lg:text-base',
		variants[props.variant ?? 'neutral']
	)}
	onclick={handleClick}
	disabled={props.disabled}
>
	{@render props.children()}
</button>
