import { Server } from 'socket.io';
import socketHandlers from '../services/socketService.js';

export function configureSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "DELETE"]
    }
  });

  // Initialize socket handlers
  socketHandlers(io);

  return io;
}