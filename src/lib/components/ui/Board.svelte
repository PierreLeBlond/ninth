<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import EmptyCard from '$lib/components/ui/EmptyCard.svelte';
	import type { CardName } from '$lib/config';

	type Props = {
		board: CardName[];
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

<div class="grid grid-cols-3 grid-rows-3 gap-2">
	{#each props.board as card, index (index)}
		{#if card !== null}
			<Card onclick={() => handlePickCard(index)} disabled={props.cardDisabled}>
				{card}
			</Card>
		{:else}
			<EmptyCard onclick={() => handlePickEmptyCard(index)} disabled={props.emptyCardDisabled} />
		{/if}
	{/each}
</div>
