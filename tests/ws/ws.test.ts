import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createServer } from '../webSocketServerHelper';
import http from 'node:http';
import { io } from 'socket.io-client';

const port = 3002;
const url = `http://localhost:${port}`;

describe('web socket server', () => {
	let server: http.Server;

	beforeAll(async () => {
		server = await createServer(port);
	});

	afterAll(() => {
		server.close();
	});

	it('should be running', () => {
		expect(server.listening).toBe(true);
	});

	it('should connect to the server', async () => {
		const socket = io(url);
		await vi.waitFor(
			(): Promise<void> => new Promise((resolve) => socket.on('connect', () => resolve()))
		);
		expect(socket.connected).toBe(true);
	});
});
