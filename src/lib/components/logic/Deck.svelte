<script lang="ts">
	type Props = {
		size: number;
	};

	let { size }: Props = $props();
</script>

<div
	class="aspect-card flex items-center justify-center rounded-md border border-gray-300 bg-gray-200 text-3xl font-bold text-gray-400"
>
	{size}
</div>
