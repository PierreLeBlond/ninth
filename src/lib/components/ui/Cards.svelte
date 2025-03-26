<script lang="ts">
	import type { Card } from '$lib/types/Card';
	import CardComponent from './Card.svelte';
	import EmptyCard from './EmptyCard.svelte';
	import { crossfade } from '$lib/utils/crossfade';

	const [send, receive] = crossfade;

	type Variant = 'primary' | 'secondary' | 'neutral';

	type BaseProps = {
		cards: Card[];
		variant?: Variant;
	};

	type DisabledProps = BaseProps & {
		disabled: true;
	};

	type EnabledProps = BaseProps & {
		disabled?: false;
		onClick: (index: number) => void;
	};

	let props: DisabledProps | EnabledProps = $props();

	const handleClick = (index: number) => {
		if (props.disabled) {
			return;
		}
		props.onClick(index);
	};
</script>

<div class="relative h-full w-full">
	<div class="absolute inset-0">
		<EmptyCard disabled={true} variant={props.variant} />
	</div>
	{#each props.cards as card, index (card.index)}
		<div
			class="absolute inset-0"
			in:receive|global={{ key: card.index }}
			out:send|global={{ key: card.index }}
		>
			<CardComponent
				disabled={props.disabled || index !== props.cards.length - 1}
				variant={props.variant}
				onclick={() => handleClick(card.index)}
			>
				{card.type}
			</CardComponent>
		</div>
	{/each}
</div>
