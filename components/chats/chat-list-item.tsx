"use client";

import classNames from "classnames";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TimeAgo from "react-time-ago";

interface ChatListItemProperties {
  id: string;
  href: string;
  image: StaticImageData;
  name: string;
  lastMessage: {
    text: string;
    sender: string;
    sendTime: Date;
  };
  unreadsNumber?: number;
}

export default function ChatListItem({
  id,
  href,
  image,
  lastMessage,
  name,
  unreadsNumber,
}: ChatListItemProperties) {
  const [mounted, setMounted] = useState(false);

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
      <div className="dui-avatar dui-online shrink-0">
        <div className="size-9 rounded-full">
          <Image
            draggable="false"
            alt="Image"
            src={image}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="line-clamp-1 font-medium">{name}</span>
        <span className="line-clamp-1 text-xs">{lastMessage.text}</span>
      </div>
      <div className="flex flex-col items-center justify-between self-stretch text-xs">
        <span>
          <TimeAgo date={lastMessage.sendTime} timeStyle="twitter-minute" />
        </span>
        {unreadsNumber && (
          <span className="grid size-5 place-content-center rounded-full bg-secondary">
            {unreadsNumber > 9 ? "9+" : `${unreadsNumber}`}
          </span>
        )}
      </div>
    </Link>
  );
}
