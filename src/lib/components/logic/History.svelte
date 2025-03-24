<script lang="ts">
	type Props = {
		previous: () => void;
		next: () => void;
		currentState: number;
		count: number;
	};

	let { previous, next, currentState, count }: Props = $props();
</script>

<div class="grid w-full grid-cols-5 items-center justify-between gap-2 p-2">
	<button class="col-span-2 rounded-md bg-blue-500 p-2 text-white" onclick={previous}>
		Previous
	</button>
	{currentState}/{count}
	<button class="col-span-2 col-start-4 rounded-md bg-blue-500 p-2 text-white" onclick={next}>
		Next
	</button>
</div>
