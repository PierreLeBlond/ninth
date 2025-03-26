import { PUBLIC_WS_DOMAIN } from '$env/static/public';
import type { GameState } from '$lib/types/GameState';
import { io } from 'socket.io-client';

export const useSocket = (params: {
	gameState: GameState;
	onGameState: (updatedGameState: GameState) => void;
}) => {
	let connected = $state(false);

	const socket = io(PUBLIC_WS_DOMAIN);
	socket.on('connect', () => {
		connected = true;
	});

	socket.on('wantGameState', () => {
		socket.emit('gameState', params.gameState);
	});

	socket.on('connect_error', (error) => {
		if (socket.active) {
			console.error('Connection error, but attempting to reconnect...');
		} else {
			console.error(`Connection denied: ${error}`);
		}
	});

	const emitGameState = (gameState: GameState) => {
		if (!connected) {
			return;
		}
		socket.emit('gameState', gameState);
	};

	socket.on('gameState', (updatedGameState: GameState) => {
		params.onGameState(updatedGameState);
	});

	return {
		get connected() {
			return connected;
		},
		emitGameState
	};
};
