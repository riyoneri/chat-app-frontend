import MessagesListItem from "./messages-list-item";

export default function MessageList({ messages }: { messages: MessageDto[] }) {
  return (
    <div>
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessagesListItem key={message.id} {...message} />
        ))
      ) : (
        <p className="text-center italic">No messages</p>
      )}
    </div>
  );
}
