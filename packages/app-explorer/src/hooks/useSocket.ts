import { useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (event: string) => {
  const [data, setData] = useState(null);

  const socket: Socket = useMemo(() => {
    return io('http://localhost:4444'); // Replace with your server URL
  }, []); // No dependencies mean this will only run once

  useEffect(() => {
    socket.on(event, (data) => {
      setData(data);
    });

    return () => {
      socket.off(event);
    };
  }, [event, socket]);

  return data;
};

export default useSocket;
