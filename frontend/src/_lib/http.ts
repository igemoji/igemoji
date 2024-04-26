import { SERVER_API, SOCKET_API } from "@env";

export const getBaseServerUrl = () => {
  return SERVER_API;
};

export const getBaseSocketServerUrl = () => {
  return SOCKET_API;
};
