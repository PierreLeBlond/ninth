<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let roomName: string | null = $state(null);

	onMount(() => {
		roomName = page.url.searchParams.get('room') ?? null;
	});
</script>

{#if roomName === null}
	<p>No room name provided</p>
{:else}
	<a href={`/game?player=0&room=${roomName}`}> AS PLAYER I </a>
	<a href={`/game?player=1&room=${roomName}`}> AS PLAYER II </a>
	<a href={`/game?room=${roomName}`}> AS SPECTATOR </a>
{/if}
