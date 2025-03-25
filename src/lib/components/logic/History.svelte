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
	<button class="col-span-2 rounded-md bg-white p-2 text-black" onclick={previous}>
		Previous
	</button>
	<p class="text-center text-xl font-bold">
		{currentState}/{count}
	</p>
	<button class="col-span-2 col-start-4 rounded-md bg-white p-2 text-black" onclick={next}>
		Next
	</button>
</div>
