import { beforeAll, afterAll, describe, it, vi, expect } from 'vitest';
import { createServer } from '../../webSocketServerHelper';
import http from 'node:http';
import { useGameStateManager } from '$lib/hooks/useGameStateManager.svelte';

const port = 3004;

// https://github.com/sveltejs/kit/issues/10446
vi.mock('$env/dynamic/public', () => ({
	env: {
		PUBLIC_WS_URL: 'http://localhost:3004'
	}
}));

describe('useGameState', () => {
	let server: http.Server;

	beforeAll(async () => {
		server = await createServer(port);
	});

	afterAll(() => {
		server.close();
	});

	it('should connect to the server', async () => {
		const gameStateManager = useGameStateManager({
			roomId: 'testRoom'
		});

		expect(gameStateManager).not.toBeNull();
	});

	it('should keep track of the game state on reconnect', async () => {
		let gameStateManager = useGameStateManager({
			roomId: 'testRoom'
		});

		const gameState = gameStateManager.gameState;

		gameStateManager.destroy();

		gameStateManager = useGameStateManager({
			roomId: 'testRoom'
		});

		expect(gameStateManager.gameState).toEqual(gameState);
	});
});
