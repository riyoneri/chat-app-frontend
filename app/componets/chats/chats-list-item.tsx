import { useAppSelector } from "@/app/store/hooks";
import { ExpandedChatDto } from "@/app/util/api";
import socket from "@/app/util/socket";
import { Avatar, Badge } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

export default function ChatListItem({
  _id,
  participants,
  lastMessage: { sendTime, sender, text },
  unreadMessages = 0,
}: ExpandedChatDto & { unreadMessages?: number }) {
  const queryClient = useQueryClient();
  const parameters = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [badgeInvisible, setBadgeInvisible] = useState(true);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const [recentMessage, setRecentMessage] = useState(
    `${sender === userId ? "You: " : ""}${text}`,
  );
  let typingTimer: NodeJS.Timeout;

  useEffect(() => {
    setIsMounted(true);
    socket.on(
      "status",
      ({ type, userId }: { type: "active" | "inactive"; userId: string }) => {
        if (type === "active" && userId === participants._id)
          setBadgeInvisible(false);

        if (type === "inactive" && userId === participants._id)
          setBadgeInvisible(true);
      },
    );

    socket.on("actives", (activeChats: string[]) => {
      if (activeChats.includes(participants._id)) setBadgeInvisible(false);
    });

    return () => {
      socket.off("status");
      socket.off("actives");
      socket.off("typing-status");
    };
  }, [participants._id]);

  if (!isMounted) return;

  socket.on("typing-status", ({ senderId }: { senderId: string }) => {
    if (senderId !== participants._id) return;
    queryClient.invalidateQueries({ queryKey: ["chats"] });
    clearTimeout(typingTimer);
    setRecentMessage("Typing...");
    typingTimer = setTimeout(() => {
      setRecentMessage(`${sender === userId ? "You: " : ""}${text}`);
    }, 1000);
  });

  return (
    <Link
      href={`/chats/${_id}`}
      className={classNames("flex gap-3 hover:bg-ui-darkest transition", {
        "bg-ui-darkest": parameters.chatId === _id,
      })}
    >
      <Badge
        color="green"
        overlap="circular"
        placement="bottom-end"
        invisible={badgeInvisible}
      >
        <Avatar
          src={participants.imageUrl}
          alt="Avatar"
          placeholder={undefined}
          size="sm"
        />
      </Badge>

      <div className="flex flex-col flex-1 justify-between">
        <p className="font-bold">{participants.name}</p>
        <p
          className={classNames("text-neutral-200 line-clamp-1", {
            italic: recentMessage === "Typing...",
          })}
        >
          {recentMessage}
        </p>
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
