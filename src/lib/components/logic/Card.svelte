<script lang="ts">
	import type { CardName } from '$lib/config.ts';

	type Props = {
		cardName: CardName;
		onChoose: () => void;
		disabled: boolean;
	};

	let { cardName, onChoose, disabled }: Props = $props();
</script>

<button
	class="aspect-card flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-200 text-xs font-bold shadow-md disabled:shadow-none lg:text-base"
	onclick={onChoose}
	{disabled}
>
	{cardName || 'X'}
</button>
