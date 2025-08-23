import { Server } from 'socket.io';
import socketHandlers from '../services/socketService.js';

export function configureSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "DELETE"]
    }
  });

  // Initialize socket handlers
  socketHandlers(io);

  return io;
}