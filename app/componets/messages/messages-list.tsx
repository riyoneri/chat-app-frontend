import { MessageDto } from "@/app/util/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MessagesListItem from "./messages-list-item";
dayjs.extend(relativeTime);

export default function MessagesList({ messages }: { messages: MessageDto[] }) {
  return (
    <div className="flex h-full flex-col gap-2 p-2 text-xs sm:text-sm">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessagesListItem {...message} key={message._id} displayDate />
        ))
      ) : (
        <p className="text-center my-auto italic">No messages yet</p>
      )}
    </div>
  );
}
