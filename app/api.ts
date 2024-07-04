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
  chatId: string;
  senderId: string;
  content: string;
  state: "pending" | "delivered" | "seen";
  createdAt: string;
}

interface ChatDto {
  id: string;
  lastMessage: {
    sender: string;
    sentTime: string;
    text: string;
  };
  participant: UserDto;
  createdAt: string;
  updatedAt: string;
}
