import { Avatar, Badge } from "@material-tailwind/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { Chat } from "./chats-list";
import classNames from "classnames";
import { useParams } from "next/navigation";
TimeAgo.addDefaultLocale(en);

export default function ChatListItem({
  _id,
  participant: { imageUrl, name },
  lastMessage: { createdAt, ownerId, text },
  unreadMessages,
}: Chat) {
  const parameters = useParams();
  return (
    <Link
      href={`/chats/${_id}`}
      className={classNames("flex gap-3 hover:bg-ui-darkest transition", {
        "bg-ui-darkest": parameters.chatId === _id,
      })}
    >
      <Badge color="green" overlap="circular" placement="bottom-end">
        <Avatar src={imageUrl} alt="Avatar" placeholder={undefined} size="md" />
      </Badge>

      <div className="flex flex-col flex-1 justify-between">
        <p className="font-bold">{name}</p>
        <p className="text-neutral-200 line-clamp-1">{`${ownerId === "1" ? "You: " : ""}${text}`}</p>
      </div>
      <div className="flex text-xs flex-col justify-between items-end ">
        <ReactTimeAgo date={new Date(createdAt)} timeStyle="twitter" />
        {unreadMessages > 0 && (
          <span className="size-5  grid place-content-center bg-orange-200 text-black rounded-full">
            {unreadMessages > 9 ? "9+" : unreadMessages}
          </span>
        )}
      </div>
    </Link>
  );
}
