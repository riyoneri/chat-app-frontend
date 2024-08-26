import MessagesListItem from "./messages-list-item";

export default function MessageList({ messages }: { messages: MessageDto[] }) {
  return (
    <div>
      {messages.length > 0 ? (
        messages.map((message, index) => {
          const checkDisplayDate =
            !messages[index + 1] ||
            messages[index].senderId !== messages[index + 1].senderId;
          return (
            <MessagesListItem
              key={message.id}
              {...message}
              displayDate={checkDisplayDate}
            />
          );
        })
      ) : (
        <p className="text-center italic">No messages</p>
      )}
    </div>
  );
}
