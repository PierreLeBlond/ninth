import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'node:http';

export const createWebSocketServer = (server: HttpServer) => {
	const io = new SocketIOServer(server, {
		cors: {
			origin: process.env.PUBLIC_BASE_URL,
			methods: ['GET', 'POST']
		}
	});

	// Room namespace for game rooms
	const roomNamespace = io.of('/room');

	const getRooms = () => {
		const players = Array.from(roomNamespace.adapter.sids.keys());
		return Array.from(roomNamespace.adapter.rooms.keys()).filter((room) => !players.includes(room));
	};

	// Base namespace for room management
	io.on('connection', (socket) => {
		console.log(`a user connected to base namespace: ${socket.id}`);

		// Send list of available rooms to new client
		socket.emit('rooms', getRooms());
	});

	roomNamespace.adapter.on('create-room', () => {
		io.emit('rooms', getRooms());
	});

	roomNamespace.adapter.on('delete-room', () => {
		io.emit('rooms', getRooms());
	});

	roomNamespace.on('connection', (socket) => {
		console.log(`a user connected to room namespace: ${socket.id}`);

		// Handle joining a room
		socket.on('joinRoom', (roomId) => {
			const rooms = getRooms();
			const roomExists = rooms.includes(roomId);
			if (!roomExists && rooms.length > 4) {
				socket.emit('error', { message: 'Too many rooms' });
				return;
			}
			// Join the room
			socket.join(roomId);

			console.log(`user ${socket.id} joined room ${roomId}`);

			// Request game state from other players in the room
			socket.to(roomId).emit('wantGameState', roomId);
		});

		// Handle game state updates
		socket.on('gameState', (roomId, gameState) => {
			socket.to(roomId).emit('gameState', gameState);
		});

		// Handle disconnection
		socket.on('disconnect', () => {
			console.log(`user disconnected from room namespace: ${socket.id}`);
		});
	});

	roomNamespace.adapter.on('create-room', (room) => {
		console.log(`room ${room} was created`);
	});

	roomNamespace.adapter.on('join-room', (room, id) => {
		console.log(`socket ${id} has joined room ${room}`);
	});
};
