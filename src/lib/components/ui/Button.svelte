<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	type Variant = 'primary' | 'secondary' | 'neutral';

	type Props = {
		variant?: Variant;
		href?: string;
		children: Snippet;
		class?: string;
	};

	type DisabledProps = {
		disabled: true;
	};

	type EnabledProps = {
		disabled?: false;
		onclick?: () => void;
	};

	let props: Props & (DisabledProps | EnabledProps) = $props();

	const variants = {
		primary: 'border-primary-foreground shadow-primary-foreground',
		secondary: 'border-secondary-foreground shadow-secondary-foreground',
		neutral: 'border-white shadow-white'
	} as const;

	const baseStyles =
		'bg-black text-white flex items-center justify-center border w-full rounded-md py-2 px-4 font-bold disabled:text-gray-800 disabled:border-gray-800 hover:not-disabled:shadow-highlight-md';

	const button = props.href ? 'a' : 'button';

	const handleClick = () => {
		if (props.disabled) {
			return;
		}

		if (!props.onclick) {
			return;
		}

		props.onclick();
	};
</script>

<svelte:element
	this={button}
	class={cn(baseStyles, variants[props.variant ?? 'neutral'], props.class)}
	onclick={handleClick}
	disabled={props.disabled}
	role={props.href ? 'link' : 'button'}
	href={props.href}
>
	{@render props.children()}
</svelte:element>
