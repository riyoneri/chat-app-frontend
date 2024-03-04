"use client";

import ChatList from "@/app/componets/chats/chats-list";
import { useAppSelector } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import { Avatar, Card, Drawer } from "@material-tailwind/react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";
import { useDispatch } from "react-redux";

export default function ChatsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const rightSideBarOpened = useAppSelector(
    (state) => state.ui.rightSideBarOpened,
  );
  const appDispatch = useDispatch();
  const pathname = usePathname();

  return (
    <div className="flex">
      <Card
        placeholder={undefined}
        className={classNames(
          "pt-2 border-r-2 border-r-border-dark bg-ui-dark rounded-none text-white sm:flex flex-col",
          {
            "w-full sm:w-[20rem]": pathname === "/chats",
            "hidden w-[20rem] sm:flex": pathname !== "/chats",
          },
        )}
      >
        <div className="flex px-2 justify-between items-center text-2xl">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="Avatar"
            placeholder={undefined}
            size="sm"
          />
          <Link href="">
            <LuMessageSquarePlus />
          </Link>
        </div>
        <hr className="my-2 px-2 border-border-dark border" />
        <p className="px-2 pb-1">Chats</p>
        <div
          className={classNames(
            "h-[calc(100dvh-7.6rem)]  sm:h-[calc(100dvh-7.9rem)] overflow-y-auto scrollbar-none",
          )}
        >
          <ChatList />
        </div>
      </Card>
      <section
        className={classNames({
          hidden: pathname === "/chats",
          "block sm:hidden": pathname !== "/chats",
        })}
      >
        <Drawer
          open={rightSideBarOpened}
          placeholder={undefined}
          onClose={() => appDispatch(uiActions.closeRightSideBar())}
          size={250}
          className="bg-ui-dark flex flex-col py-2"
        >
          <div className="flex px-2 justify-between items-center text-2xl">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="Avatar"
              placeholder={undefined}
              size="sm"
            />
            <Link href="">
              <LuMessageSquarePlus />
            </Link>
          </div>
          <hr className="my-2 px-2 border-border-dark border" />
          <p className="px-2 pb-1">Chats</p>
          <div className="sm:h-[calc(100dvh-7.9rem)] overflow-y-auto scrollbar-none">
            <ChatList />
          </div>
        </Drawer>
      </section>
      <div className="flex-1">{children}</div>
    </div>
  );
}