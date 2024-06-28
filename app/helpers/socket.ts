import { io } from "socket.io-client";

let socket;

export default socket;

export function connectServer(userId: string, token: string) {
  socket = io(process.env.NEXT_PUBLIC_API_URL!, { auth: { token, userId } });

  return socket;
}
