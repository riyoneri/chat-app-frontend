"use client";

import ChatList from "@/app/componets/chats/chats-list";
import MessagesList from "@/app/componets/messages/messages-list";
import UserIcon from "@/app/componets/user-icon";
import { FormEvent } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { Chats } from "../../layout";

const Messages = [
  {
    _id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    chatId: "1",
    sender: "true",
    text: "This is a longer dummy message number 1",
    createdAt: "2024-02-21T12:02:14.000Z",
  },
];

export default function ChatMessages() {
  return (
    <>
      <title>Username chat</title>
      <section className="flex-1 flex">
        <ChatList chats={Chats} />
        <section className="flex-1 flex flex-col">
          <div className="px-4 flex gap-3 items-center border-l w-full text-sm py-3 bg-custom-indigo sticky top-0 bg-zinc-800">
            <UserIcon icon="🥶" className="size-8 sm:size-10" />
            <div>
              <p className="font-semibold text-xs line-clamp-1">User name</p>
              <p className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-green-600"></span>
                <span className="text-xs hidden sm:block">Active Now</span>
              </p>
            </div>
          </div>
          <MessagesList messages={Messages} />
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) =>
              event.preventDefault()
            }
            className="flex items-center bg-blue-950/10"
          >
            <input
              type="text"
              placeholder="Enter message here..."
              className="flex-1 px-2 py-2 bg-transparent focus:outline-none text-sm w-1"
            />
            <button className="text-xl px-2 sm:px-5 py-1 flex justify-end text-white bg-blue-600">
              <LuSendHorizonal className="cursor-pointer" />
            </button>
          </form>
        </section>
      </section>
    </>
  );
}
