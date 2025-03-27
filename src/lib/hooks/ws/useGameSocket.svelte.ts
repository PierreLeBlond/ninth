import { PUBLIC_WS_DOMAIN } from '$env/static/public';
import type { GameState } from '$lib/types/GameState';
import { io } from 'socket.io-client';

export const useGameSocket = (params: {
	roomId: string;
	gameState: GameState;
	onGameState: (updatedGameState: GameState) => void;
}) => {
	let connected = $state(false);

	const socket = io(`${PUBLIC_WS_DOMAIN}/room`);
	socket.on('connect', () => {
		connected = true;
		socket.emit('joinRoom', params.roomId);
	});

	socket.on('wantGameState', () => {
		socket.emit('gameState', params.roomId, params.gameState);
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
		socket.emit('gameState', params.roomId, gameState);
	};

	socket.on('gameState', (updatedGameState: GameState) => {
		params.onGameState(updatedGameState);
	});

	const disconnect = () => {
		socket.disconnect();
	};

	return {
		get connected() {
			return connected;
		},
		emitGameState,
		disconnect
	};
};
