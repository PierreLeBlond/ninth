import { createServer } from 'node:http';
import 'dotenv/config';
import { createWebSocketServer } from './createWebSocketServer';

const server = createServer();

createWebSocketServer(server);

server.listen(process.env.WS_PORT);
