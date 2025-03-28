<script lang="ts">
	import { useSocket } from '$lib/hooks/ws/useSocket.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let rooms: string[] = $state([]);

	let roomName = $state('');

	const socket = useSocket({
		onRooms: (serverRooms: string[]) => {
			rooms = serverRooms;
		}
	});
</script>

<div class="flex h-full w-full flex-col gap-4 p-2">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="relative mb-16 aspect-[290/68] w-full"
		viewBox="0 0 290 68"
	>
		<text
			x="50%"
			y="100%"
			class="font-title block h-full w-full fill-white text-[96px] leading-none font-bold"
			text-anchor="middle"
		>
			NINTH
		</text>
	</svg>

	{#if !socket.connected}
		<p>Connecting to server<span class="animate-pulse">...</span></p>
	{:else}
		<h2 class="text-2xl font-bold">RO O&nbsp; M&nbsp;&nbsp; S</h2>
		<div class="flex h-64 w-full overflow-y-hidden">
			<ul class="flex w-full flex-col gap-2 overflow-y-auto p-4">
				{#each rooms as room}
					<li>
						<a
							href={`${PUBLIC_BASE_URL}/lobby?room=${room}`}
							class="hover:shadow-highlight-md flex w-full items-center justify-center rounded-sm border border-white p-2 shadow-white"
						>
							{room}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="mb-8 h-[1px] w-full bg-white"></div>
		<form
			class="flex flex-col gap-2 px-4"
			method="get"
			action={`${PUBLIC_BASE_URL}/lobby?room=${roomName}`}
		>
			<input
				type="text"
				name="room"
				bind:value={roomName}
				class="rounded-md border-2 border-gray-300 p-2"
				placeholder="alphanumeric, no spaces"
				pattern="[a-zA-Z0-9]+"
				required
			/>
			<button
				type="submit"
				class="flex items-center justify-center rounded-md bg-white p-2 text-black"
			>
				Create Room
			</button>
		</form>
	{/if}
</div>
