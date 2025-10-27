import { useEffect } from 'react';

export type UseWebSocketProps<T> = {
  url: string | undefined;
  onOpen: (ws: WebSocket) => void;
  beforeClose?: (ws: WebSocket) => void;
  onMessage: (ws: WebSocket, data: MessageEvent<T>) => void;
  enabled: boolean;
};

type WebSocketEntry = {
  ws: WebSocket;
  count: number;
  reconnecting: boolean;
};

const webSocketsMap = new Map<string, WebSocketEntry>();

export const useWebSocket = <T>({
  url,
  onOpen,
  beforeClose,
  onMessage,
  enabled,
}: UseWebSocketProps<T>) => {
  useEffect(() => {
    if (!enabled || !url) return;

    // Attempt to connect or re-use the existing connection
    const connect = () => {
      let entry = webSocketsMap.get(url);
      const shouldCreateNew = !entry || entry.count === 0 || entry.reconnecting;
      if (shouldCreateNew) {
        const ws = new WebSocket(url);
        entry = { ws, count: 1, reconnecting: false };
        webSocketsMap.set(url, entry);
      } else if (entry) {
        entry.count += 1;
      }

      const ws = entry?.ws;

      const handleOpen = () => {
        ws && onOpen(ws);
      };

      const handleMessage = (event: MessageEvent<T>) => {
        ws && onMessage(ws, event);
      };

      const handleClose = () => {
        // If we're here and count > 0, it means the close was unexpected (not user cleanup)
        const currentEntry = webSocketsMap.get(url);
        if (currentEntry && currentEntry.count > 0) {
          // Attempt to reconnect
          currentEntry.reconnecting = true;
          // Remove old ws from map before reconnecting
          webSocketsMap.delete(url);
          setTimeout(() => {
            connect();
          }, 1000); // Delay before reconnect
        }
      };

      const handleError = () => {
        // Attempting to reconnect
        const currentEntry = webSocketsMap.get(url);
        if (currentEntry && currentEntry.count > 0) {
          currentEntry.reconnecting = true;
          webSocketsMap.delete(url);
          setTimeout(() => {
            connect();
          }, 1000); // Optional small delay
        }
      };

      ws?.addEventListener('open', handleOpen);
      ws?.addEventListener('message', handleMessage);
      ws?.addEventListener('close', handleClose);
      ws?.addEventListener('error', handleError);

      return () => {
        ws?.removeEventListener('open', handleOpen);
        ws?.removeEventListener('message', handleMessage);
        ws?.removeEventListener('close', handleClose);
        ws?.removeEventListener('error', handleError);
      };
    };

    // Initial connect
    const cleanupListeners = connect();

    return () => {
      // Decrement the count and close/remove if no longer needed
      const currentEntry = webSocketsMap.get(url);
      cleanupListeners?.();

      if (currentEntry) {
        currentEntry.count -= 1;
        if (currentEntry.count === 0) {
          beforeClose?.(currentEntry.ws);
          currentEntry.ws.close();
          webSocketsMap.delete(url);
        }
      }
    };
  }, [url, onOpen, onMessage, enabled, beforeClose]);
};
