import { io, Socket } from "socket.io-client";

let socket: Socket;

export function getSocket() {
  return socket;
}

export function connectServer(userId: string, token: string) {
  socket = io(process.env.NEXT_PUBLIC_API_URL!, { auth: { token, userId } });

  return socket;
}
