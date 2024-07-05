"use client";

import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

interface ChatListItemProperties extends ChatDto {
  unreadsNumber?: number;
  href: string;
  isActive: boolean;
}

export default function ChatListItem({
  id,
  href,
  lastMessage,
  participant: { imageUrl, name },
  updatedAt,
  isActive,
}: ChatListItemProperties) {
  const [mounted, setMounted] = useState(false);
  let displayDateText = "";
  const messageDate = dayjs(updatedAt);

  if (dayjs().isSame(messageDate, "day")) {
    displayDateText = dayjs(messageDate).format("H:m");
  } else if (
    dayjs().startOf("day").diff(messageDate.startOf("day"), "day") === 1
  ) {
    displayDateText = "Yesterday";
  } else displayDateText = dayjs(messageDate).format("D/M/YY");

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return;

  return (
    <Link
      href={href}
      className={classNames("flex items-center gap-2 py-1 pl-2 pr-3", {
        "bg-accent/60": id === "1",
        "bg-accent/20": id !== "1",
      })}
    >
      <div
        className={classNames("dui-avatar shrink-0", {
          "dui-online": isActive,
          "dui-offline": !isActive,
        })}
      >
        <div className="size-9 rounded-full">
          <Image
            draggable="false"
            alt="Image"
            src={imageUrl}
            width={100}
            height={100}
            className="object-top"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="line-clamp-1 font-medium">{name}</span>
        <span className="line-clamp-1 text-xs">{lastMessage.text}</span>
      </div>
      <div className="flex flex-col items-center justify-between self-stretch text-xs">
        <span>{displayDateText}</span>
        {10 && (
          <span className="grid size-5 place-content-center rounded-full bg-secondary">
            {10 > 9 ? "9+" : `${10}`}
          </span>
        )}
      </div>
    </Link>
  );
}
