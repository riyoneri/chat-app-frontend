"use client";

import { Chat } from "../../(home)/layout";
import { useAppSelector } from "../../store/hooks";
import ChatListItem from "./chats-list-item";

interface MainUiProperties {
  chats: Chat[];
  messages?: [];
}

export default function MainUi({ chats }: MainUiProperties) {
  const username = useAppSelector((state) => state.user.userData?.username);
  return (
    <section className="w-1/4 min-w-32 border-r text-xs sm:text-sm overflow-y-auto scrollbar-thin h-[calc(100dvh-3.4rem)] divide-y">
      <p className="sticky top-0 p-2 text-right font-bold bg-neutral-900">
        {username}
      </p>
      <div className="divide-y">
        {chats.length > 0
          ? chats.map((chat) => <ChatListItem {...chat} key={chat._id} />)
          : "lion"}
      </div>
    </section>
  );
}
