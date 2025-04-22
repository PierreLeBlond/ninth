import { createWebSocketServer } from '../src/ws/createWebSocketServer';
import http from 'node:http';

export const createServer = async (port: number): Promise<http.Server> => {
	const server = http.createServer();
	createWebSocketServer(server);
	return new Promise((resolve) => server.listen(port, () => resolve(server)));
};
