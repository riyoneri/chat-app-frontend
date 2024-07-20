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

enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",
}

enum MessageState {
  PENDING = "pending",
  DELIVERED = "delivered",
  SEEN = "seen",
}

interface IMessage {
  conversationId: string;
  senderId: string;
  text?: string;
  state: MessageState;
  files?: { name: string; type: FileType }[];
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
  unread: number;
}

interface SocketUser {
  userId: string;
  socketId: string;
}

interface GlobalResponseError {
  errorMessage?: string;
  status: number;
}
