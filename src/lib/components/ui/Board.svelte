<script lang="ts">
	import CardComponent from '$lib/components/ui/Card.svelte';
	import EmptyCard from '$lib/components/ui/EmptyCard.svelte';
	import type { Card } from '$lib/types/Card';
	import { cn } from '$lib/utils/cn';
	import { crossfade } from '$lib/utils/crossfade';

	const [send, receive] = crossfade;

	type Props = {
		board: (Card | null)[];
		reverse?: boolean;
	};

	type CardDisabledProps = {
		cardDisabled: true;
	};

	type CardEnabledProps = {
		cardDisabled?: false;
		onCardClick: (index: number) => void;
	};

	type EmptyCardDisabledProps = {
		emptyCardDisabled: true;
	};

	type EmptyCardEnabledProps = {
		emptyCardDisabled?: false;
		onEmptyCardClick: (index: number) => void;
	};

	let props: Props &
		(CardDisabledProps | CardEnabledProps) &
		(EmptyCardDisabledProps | EmptyCardEnabledProps) = $props();

	const handlePickCard = (index: number) => {
		if (props.cardDisabled) {
			return;
		}

		props.onCardClick(index);
	};

	const handlePickEmptyCard = (index: number) => {
		if (props.emptyCardDisabled) {
			return;
		}

		props.onEmptyCardClick(index);
	};
</script>

<div class={cn('grid grid-cols-3 grid-rows-3 gap-2', props.reverse && 'rotate-180')}>
	{#each props.board as card, index (card ? card.index : `empty-${index}`)}
		<div
			class="relative"
			style="grid-column: {(index % 3) + 1} / {(index % 3) + 2}; grid-row: {Math.floor(index / 3) +
				1} / {Math.floor(index / 3) + 2};"
		>
			<EmptyCard
				onclick={() => handlePickEmptyCard(index)}
				disabled={props.emptyCardDisabled || card !== null}
			/>
		</div>
		{#if card !== null}
			<div
				class="relative"
				in:receive|global={{ key: card.index }}
				out:send|global={{ key: card.index }}
				style="grid-column: {(index % 3) + 1} / {(index % 3) + 2}; grid-row: {Math.floor(
					index / 3
				) + 1} / {Math.floor(index / 3) + 2};"
			>
				<CardComponent onclick={() => handlePickCard(index)} disabled={props.cardDisabled}>
					{card.type}
				</CardComponent>
			</div>
		{/if}
	{/each}
</div>
