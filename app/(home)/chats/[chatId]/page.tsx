"use client";

import MessagesList from "@/app/componets/messages/messages-list";
import { useAppDispatch } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import { Avatar, Badge } from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { FormEvent } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSend } from "react-icons/io";

export default function ChatId() {
  const parameters = useParams();
  const appDispatch = useAppDispatch();

  return (
    <>
      <title>{`Chat ${parameters.chatId}`}</title>
      <section className="flex flex-col h-full">
        <div className="flex justify-between items-center bg-ui-darker px-2 sm:px-3 py-2">
          <div className="flex gap-2 items-center">
            <GiHamburgerMenu
              className="text-2xl block sm:hidden cursor-pointer"
              onClick={() => appDispatch(uiActions.openRightSideBar())}
            />
            <div className="flex-1 flex gap-2 items-center">
              <Badge color="green" overlap="circular" placement="bottom-end">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="Avatar"
                  placeholder={undefined}
                  size="sm"
                />
              </Badge>
              <p className="text-sm sm:text-base">Lara Muller</p>
            </div>
          </div>
        </div>
        <div className="flex-1 py-1">
          <MessagesList />
        </div>
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) =>
            event.preventDefault()
          }
          className="flex bg-ui-darker gap-2 px-1 py-2"
        >
          <textarea
            name="Lion"
            placeholder="Write message here..."
            className="flex-1 resize-none min-w-1 p-1 text-sm focus:outline-none bg-neutral-700"
            rows={2}
          ></textarea>
          <button className="size-12 cursor-pointer grid place-content-center bg-sky-800">
            <IoIosSend className="text-2xl" />
          </button>
        </form>
      </section>
    </>
  );
}
