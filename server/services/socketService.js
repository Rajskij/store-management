export default function socketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

// Export for use in controllers
let ioInstance;

export function setIOInstance(io) {
  ioInstance = io;
}

export function getIO() {
  if (!ioInstance) {
    throw new Error('Socket.IO not initialized');
  }
  return ioInstance;
}
