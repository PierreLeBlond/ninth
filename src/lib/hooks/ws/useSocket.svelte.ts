import { PUBLIC_WS_URL } from '$env/static/public';
import { io } from 'socket.io-client';

export const useSocket = (params: { onRooms: (rooms: string[]) => void }) => {
	let connected = $state(false);

	const socket = io(PUBLIC_WS_URL);
	socket.on('connect', () => {
		connected = true;
	});

	socket.on('connect_error', (error) => {
		if (socket.active) {
			console.error('Connection error, but attempting to reconnect...');
		} else {
			console.error(`Connection denied: ${error}`);
		}
	});

	socket.on('rooms', (rooms: string[]) => {
		params.onRooms(rooms);
	});

	return {
		get connected() {
			return connected;
		}
	};
};
