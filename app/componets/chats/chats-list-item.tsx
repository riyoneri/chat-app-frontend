"use client";

import UserIcon from "../user-icon";
import { Chat } from "@/app/(home)/layout";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);

export default function ChatListItem({
  _id,
  imageUrl,
  lastMessageDate,
  message,
  newMessageCount,
  username,
}: Chat) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const pathname = usePathname();

  if (!isMounted) return;

  return (
    <Link
      href={pathname.includes("groups") ? `/groups/${_id}` : `/dms/${_id}`}
      className="flex gap-1 sm:gap-3 py-3 px-1 bg-blue-700/25 "
    >
      <UserIcon icon={imageUrl} className="size-8 sm:size-12" />
      <div className="flex-1 flex flex-col justify-between">
        <p className="line-clamp-1 font-bold">{username}</p>
        <p className="line-clamp-1">{message}</p>
      </div>
      <div className="flex flex-col text-xs justify-between items-end">
        <ReactTimeAgo date={new Date(lastMessageDate)} timeStyle="twitter" />
        {newMessageCount && (
          <span className="bg-red-500 size-4 rounded-full grid place-content-center">
            {newMessageCount}
          </span>
        )}
      </div>
    </Link>
  );
}
