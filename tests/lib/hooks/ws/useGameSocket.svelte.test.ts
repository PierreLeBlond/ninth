import { beforeAll, afterAll, describe, it, vi, expect } from 'vitest';
import { createServer } from '../../../webSocketServerHelper';
import http from 'node:http';
import { useGameSocket } from '$lib/hooks/ws/useGameSocket.svelte';
import { prepare } from '$lib/game/prepare';
import type { GameState } from '$lib/types/GameState';

const port = 3003;
const url = `http://localhost:${port}`;

describe('useGameSocket', () => {
	let server: http.Server;

	beforeAll(async () => {
		server = await createServer(port);
	});

	afterAll(() => {
		server.close();
	});

	it('should connect to the server', async () => {
		const gameState = prepare();
		const player1 = useGameSocket({
			wsDomain: url,
			roomId: 'testRoom',
			gameState,
			onGameState: () => {}
		});

		await vi.waitFor(() => player1.connected);
	});

	it('should send the current game state to the second player', async () => {
		let gameState1: GameState | null = null;
		const player1 = useGameSocket({
			wsDomain: url,
			roomId: 'testRoom',
			gameState: prepare(),
			onGameState: (gameState) => {
				gameState1 = gameState;
			}
		});

		await vi.waitFor(() => player1.connected);

		let gameState2: GameState | null = null;
		const player2 = useGameSocket({
			wsDomain: url,
			roomId: 'testRoom',
			gameState: prepare(),
			onGameState: (gameState) => {
				gameState2 = gameState;
			}
		});

		await vi.waitFor(() => player2.connected);

		expect(gameState1).toEqual(gameState2);
	});
});
