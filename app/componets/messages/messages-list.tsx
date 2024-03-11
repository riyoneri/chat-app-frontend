import { MessageDto } from "@/app/util/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MessagesListItem from "./messages-list-item";
dayjs.extend(relativeTime);

export default function MessagesList({ messages }: { messages: MessageDto[] }) {
  return (
    <div className="flex flex-col gap-2 p-2 text-xs sm:text-sm">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <MessagesListItem
            {...message}
            key={message._id}
            displayDate={
              messages[index + 1]?.senderId !== messages[index]?.senderId ||
              !messages[index + 1]
            }
          />
        ))
      ) : (
        <p className="text-center my-auto italic">No messages yet</p>
      )}
    </div>
  );
}
