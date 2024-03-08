import { useAppSelector } from "@/app/store/hooks";
import { ExpandedChatDto } from "@/app/util/api";
import { Avatar, Badge } from "@material-tailwind/react";
import classNames from "classnames";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);

export default function ChatListItem({
  _id,
  participants,
  lastMessage: { sendTime, sender, text },
  unreadMessages = 0,
}: ExpandedChatDto & { unreadMessages?: number }) {
  const parameters = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const userId = useAppSelector((state) => state.auth.user?._id);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  return (
    <Link
      href={`/chats/${_id}`}
      className={classNames("flex gap-3 hover:bg-ui-darkest transition", {
        "bg-ui-darkest": parameters.chatId === _id,
      })}
    >
      <Badge color="green" overlap="circular" placement="bottom-end">
        <Avatar
          src={participants.imageUrl}
          alt="Avatar"
          placeholder={undefined}
          size="md"
        />
      </Badge>

      <div className="flex flex-col flex-1 justify-between">
        <p className="font-bold">{participants.name}</p>
        <p className="text-neutral-200 line-clamp-1">{`${sender === userId ? "You: " : ""}${text}`}</p>
      </div>
      <div className="flex text-xs flex-col justify-between items-end ">
        <ReactTimeAgo
          tooltip={false}
          date={new Date(sendTime)}
          timeStyle="twitter"
        />
        {unreadMessages > 0 && (
          <span className="size-5  grid place-content-center bg-orange-200 text-black rounded-full">
            {unreadMessages > 9 ? "9+" : unreadMessages}
          </span>
        )}
      </div>
    </Link>
  );
}
