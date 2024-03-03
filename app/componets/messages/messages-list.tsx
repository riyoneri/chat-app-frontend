import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MessagesListItem from "./messages-list-item";
dayjs.extend(relativeTime);

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

const Messages: Message[] = [
  {
    _id: "1",
    chatId: "1",
    senderId: "2",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat a,
            optio beatae temporibus debitis earum soluta quo, totam ab sit
            perferendis aliquid? Minus veritatis, tempore quam magnam sit
            delectus quasi.`,
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 1),
    ).toISOString(),
  },
  {
    _id: "2",
    chatId: "1",
    senderId: "1",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat a,
            optio beatae temporibus debitis earum soluta quo, totam ab sit
            perferendis aliquid? Minus veritatis, tempore quam magnam sit
            delectus quasi.`,
    createdAt: new Date(
      new Date().setMinutes(new Date().getMinutes() - 20),
    ).toISOString(),
  },
];

export default function MessagesList() {
  return (
    <div className="overflow-y-auto flex flex-col h-[calc(100dvh-9.8rem)] sm:h-[calc(100dvh-10.5rem)] gap-2 scrollbar-none p-2 text-xs sm:text-sm">
      {Messages.map((message) => (
        <MessagesListItem {...message} key={message._id} displayDate />
      ))}
    </div>
  );
}
