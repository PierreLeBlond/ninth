<script lang="ts">
	import { useSocket } from '$lib/hooks/ws/useSocket.svelte';

	let rooms: string[] = $state([]);

	let roomName = $state('');

	const socket = useSocket({
		onRooms: (r: string[]) => {
			rooms = r;
		}
	});
</script>

<div class="flex h-full w-full flex-col gap-2 p-2">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="relative aspect-[290/68] w-full"
		viewBox="0 0 290 68"
	>
		<text
			x="50%"
			y="100%"
			class="block h-full w-full fill-white font-sans text-[96px] leading-none font-bold"
			text-anchor="middle"
		>
			NINTH
		</text>
	</svg>

	{#if !socket.connected}
		<p>Connecting to server<span class="animate-pulse">...</span></p>
	{:else}
		<h2 class="text-2xl font-bold">RO O&nbsp; M&nbsp;&nbsp; S</h2>
		<ul>
			{#each rooms as room}
				<li>
					<a href="/lobby?room={room}">
						{room}
					</a>
				</li>
			{/each}
		</ul>

		<input
			type="text"
			name="room"
			bind:value={roomName}
			class="rounded-md border-2 border-gray-300 p-2"
		/>
		<a href="/lobby?room={roomName}">Create Room</a>
	{/if}
</div>
