import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (event: string) => {
  const [data, setData] = useState(null);
  const socket = io('http://localhost:4444'); // Replace with your server URL

  useEffect(() => {
    socket.on(event, (data) => {
      setData(data);
    });

    return () => {
      socket.off(event);
    };
  }, [event]);

  return data;
};

export default useSocket;
