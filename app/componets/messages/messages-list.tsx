import MessagesListItem from "./messages-list-item";

export interface Message {
  _id: string;
  chatId: string;
  sender: string;
  text: string;
  createdAt: string;
}

interface MessageListProperties {
  messages: Message[];
}

export default function MessagesList({ messages }: MessageListProperties) {
  return (
    <div className="flex-1 py-1 bg-black">
      <div className="overflow-y-auto h-[calc(100dvh-9rem)] sm:h-[calc(100dvh-10rem)] scrollbar-none">
        {messages.map((message) => (
          <MessagesListItem {...message} key={message._id} />
        ))}
      </div>
    </div>
  );
}
