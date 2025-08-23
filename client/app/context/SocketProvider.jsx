'use client';

import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export function SocketProvider ({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000');

    setSocket(socketInstance);

    console.log(socketInstance)
    // Connection events
    socketInstance.on('connection', () => {
      console.log('Connected to server');
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Cleanup
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
