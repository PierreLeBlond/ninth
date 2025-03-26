import { Server } from 'socket.io';
import 'dotenv/config';

const io = new Server(3000, {
	cors: {
		origin: process.env.APP_DOMAIN
	}
});

io.on('connection', (socket) => {
	console.log(`a user connected: ${socket.id}`);
	socket.broadcast.emit('wantGameState');
	socket.on('gameState', (gameState) => {
		socket.broadcast.emit('gameState', gameState);
	});
});
