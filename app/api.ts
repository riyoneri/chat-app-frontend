/* eslint-disable no-unused-vars */
interface UserDto {
  id: string;
  image: string;
  name: string;
  username: string;
}

interface MessageDto {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  state: "pending" | "delivered" | "seen";
  createdAt: string;
}
