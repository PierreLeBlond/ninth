<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type BaseProps = {
		alignments: number[][];
		variant: 'primary' | 'secondary';
	};

	type DisabledProps = BaseProps & {
		disabled: true;
	};

	type EnabledProps = BaseProps & {
		disabled?: false;
		onAlignmentClick: (indexes: number[]) => void;
	};

	let props: DisabledProps | EnabledProps = $props();

	const variants = {
		primary: 'border-primary-foreground shadow-primary-foreground',
		secondary: 'border-secondary-foreground shadow-secondary-foreground'
	} as const;

	const possibleAlignementElements = [
		{
			class: 'col-start-1 row-start-1 col-span-3',
			cardIndexes: [0, 1, 2]
		},
		{
			class: 'col-start-1 row-start-2 col-span-3',
			cardIndexes: [3, 4, 5]
		},
		{
			class: 'col-start-1 row-start-3 col-span-3',
			cardIndexes: [6, 7, 8]
		},
		{
			class: 'col-start-1 row-start-1 row-span-3',
			cardIndexes: [0, 3, 6]
		},
		{
			class: 'col-start-2 row-start-1 row-span-3',
			cardIndexes: [1, 4, 7]
		},
		{
			class: 'col-start-3 row-start-1 row-span-3',
			cardIndexes: [2, 5, 8]
		}
	];

	let alignmentElements = $derived.by(() => {
		return props.alignments.map((alignment) => {
			const alignmentElement = possibleAlignementElements.find((possibleAlignement) =>
				possibleAlignement.cardIndexes.every((index) => alignment.includes(index))
			);
			if (!alignmentElement) {
				throw new Error('Alignment element not found');
			}
			return alignmentElement;
		});
	});

	const handleAlignmentClick = (indexes: number[]) => {
		if (props.disabled) {
			return;
		}
		props.onAlignmentClick(indexes);
	};
</script>

{#each alignmentElements as alignmentElement, index (index)}
	<button
		aria-label="Take alignment"
		class={cn(
			alignmentElement.class,
			'hover:not-disabled:shadow-highlight-md not-disabled:shadow-highlight-sm pointer-events-auto scale-110 rounded-md border-2 transition-shadow',
			variants[props.variant]
		)}
		disabled={props.disabled}
		onclick={() => handleAlignmentClick(alignmentElement.cardIndexes)}
	></button>
{/each}
