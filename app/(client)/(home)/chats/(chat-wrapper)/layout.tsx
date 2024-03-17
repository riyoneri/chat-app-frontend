"use client";

import ChatList from "@/app/componets/chats/chats-list";
import { useAppSelector } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import { ExpandedChatDto } from "@/app/util/api";
import socket from "@/app/util/socket";
import { Avatar, Card, Drawer, Spinner } from "@material-tailwind/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { protectedFetch } from "@/app/util/fetchers";

export default function ChatsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const rightSideBarOpened = useAppSelector(
    (state) => state.ui.rightSideBarOpened,
  );
  const queryClient = useQueryClient();
  const appDispatch = useDispatch();
  const userImage = useAppSelector((state) => state.auth.user?.imageUrl);
  const pathname = usePathname();
  const { data, isLoading } = useQuery<ExpandedChatDto[], Error>({
    queryFn: () => protectedFetch({ url: "/chats" }),
    queryKey: ["chats"],
  });
  useEffect(() => {
    socket.on("chats", ({ type }: { type: string }) => {
      if (type === "refetch") {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      }
    });

    return () => {
      socket.off("chats");
    };
  }, [queryClient]);

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
            src={userImage}
            alt="Avatar"
            placeholder={undefined}
            size="sm"
          />
          <Link href="/chats/new">
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
          {isLoading && <Spinner className="mx-auto" />}
          {data && <ChatList chats={data} />}
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
              src={userImage}
              alt="Avatar"
              placeholder={undefined}
              size="sm"
            />
            <Link href="/chats/new">
              <LuMessageSquarePlus />
            </Link>
          </div>
          <hr className="my-2 px-2 border-border-dark border" />
          <p className="px-2 pb-1">Chats</p>
          <div className="sm:h-[calc(100dvh-7.9rem)] overflow-y-auto scrollbar-none">
            {isLoading && <Spinner className="mx-auto" />}
            {data && <ChatList chats={data} />}
          </div>
        </Drawer>
      </section>
      <div className="flex-1">{children}</div>
    </div>
  );
}
