import { Client, messageCallbackType } from "@stomp/stompjs";

import { getBaseSocketServerUrl } from "@/_lib/http";

export const createSocket = () => {
  let stomp: Client | null = null;

  const connect = (onConnect: () => void) => {
    if (!stomp) {
      stomp = new Client({
        brokerURL: getBaseSocketServerUrl(),
        onConnect,
        connectHeaders: {},
        reconnectDelay: 100,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onStompError: (error) => {
          console.log("onStompError", error);
        },
        beforeConnect: () => {
          // socket connect 전에 이 핸들러가 동작한다.
          console.log("beforeConnect");
        },
        onDisconnect: () => {
          console.log("onDisConnect");
        },
        onWebSocketError: (error) => {
          // socket URI가 연결되지 않았다면 이 핸들러가 동작한다.
          console.log("onWebSocketError", error);
        },
        onWebSocketClose: () => {
          console.log("onWebSocketClose");
        },
      });
    }

    stomp.activate();
  };

  const send = (destination: string, body: Record<string, unknown>) => {
    if (!stomp) {
      throw new Error("socket이 연결되어있지 않아요");
    }
    // console.log("클 > 서", body);

    stomp.publish({
      destination,
      body: JSON.stringify(body),
    });
  };

  const subscribe = (destination: string, cb: messageCallbackType) => {
    if (!stomp) {
      throw new Error("socket이 연결되어있지 않아요");
    }
    stomp.subscribe(destination, cb);
  };

  const disconnect = () => {
    if (!stomp) {
      throw new Error("socket이 연결되어있지 않아요");
    }
    stomp.deactivate();
    console.log("클라이언트 소켓이 성공적으로 닫혔어요");
  };

  return {
    connect,
    send,
    subscribe,
    disconnect,
  } as const;
};
