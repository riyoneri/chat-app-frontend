import { io } from "socket.io-client";
let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("_n")?.replaceAll('"', "");
}

export default io(String(process.env.NEXT_PUBLIC_API_URL), {
  auth: { token },
});
