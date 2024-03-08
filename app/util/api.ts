export interface UserDto {
  _id: string;
  name: string;
  email: string;
  username: string;
  imageUrl: string;
  chatUsers: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthenticateUserDto {
  user: UserDto;
  token: string;
}

export enum CONVERSATION_CATEGORIES {
  // eslint-disable-next-line no-unused-vars
  GROUP = "GROUP",
  // eslint-disable-next-line no-unused-vars
  DIRECT = "DIRECT",
}

export interface ChatDto {
  _id: string;
  category: CONVERSATION_CATEGORIES;
  participants: [string, string];
  lastMessage: {
    text: string;
    sender: string;
    sendTime: Date;
  };
}

export interface ExpandedChatDto {
  _id: string;
  category: CONVERSATION_CATEGORIES;
  participants: UserDto;
  lastMessage: {
    text: string;
    sender: string;
    sendTime: Date;
  };
}
