import { useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (event: string) => {
  const [data, setData] = useState(null);

  const socket: Socket = useMemo(() => {
    const newSocket = io('http://localhost:4444'); // Replace with your server URL

    // Emit an event to indicate the client is ready to receive data
    newSocket.emit('client_ready', {
      message: 'Client is ready to receive data',
    });

    return newSocket;
  }, []);

  useEffect(() => {
    // Listen to the specified event
    socket.on(event, (data) => {
      setData(data);
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off(event);
    };
  }, [event, socket]);

  return data;
};

export default useSocket;
