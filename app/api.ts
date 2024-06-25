/* eslint-disable no-unused-vars */
interface UserDto {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  chatUsers: string[];
}

interface MessageDto {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  state: "pending" | "delivered" | "seen";
  createdAt: string;
}
