"use client";

import Image from "next/image";

import { fetcher } from "@/app/helpers/fetcher";
import { useAppSelector } from "@/app/hooks/store-hooks";
import useLogout from "@/app/hooks/use-logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import { TbMessagePlus } from "react-icons/tb";
import ChatListItem from "./chat-list-item";
import UserListItem from "./user-list-item";

export default function ChatSection({ className }: { className?: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<"active" | "all">("all");
  const [_selectedChatId, _setSelectedChatId] = useState<undefined | string>();
  const logout = useLogout();
  const {
    data: allUsers,
    isLoading: allUsersLoading,
    error: allUsersError,
  } = useQuery<
    {},
    {
      errorMessage: string;
    },
    UserDto[]
  >({
    queryFn: () => fetcher({ url: "/users", logout }),
    queryKey: ["users", logout],
  });

  const {
    data: chats,
    isLoading: chatsLoading,
    error: chatsError,
  } = useQuery<{}, { errorMessage?: string; message?: string }, ChatDto[]>({
    queryFn: () => fetcher({ url: "/chat", logout }),
    queryKey: ["chats", logout],
  });

  const {
    data: _createChatData,
    isPending: createChatLoading,
    error: createChatError,
    mutate: createChat,
  } = useMutation<
    { message: string },
    { message: { userId: { message: string } }; errorMessage: string },
    string
  >({
    mutationFn: (userId: string) =>
      fetcher({
        url: "/chat",
        method: "POST",
        body: JSON.stringify({ userId }),
        logout,
      }),
  });

  const user = useAppSelector((state) => state.auth);

  return (
    <>
      <input
        type="checkbox"
        checked={modalOpen}
        readOnly
        id="mail_sent"
        className="dui-modal-toggle"
      />
      <dialog
        id="mail_sent"
        className="dui-modal dui-modal-middle"
        role="dialog"
      >
        <div className="dui-modal-box flex flex-col rounded-sm p-0 text-xs scrollbar-thin *:py-2 sm:text-sm">
          <div className="sticky top-0 flex items-center justify-between bg-base-300 px-3 text-xl">
            <h3>All Users</h3>
            <button
              className="justify-self-end"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="grid gap-2 *:px-3">
            {(allUsersLoading || allUsersError) && (
              <div className="flex justify-center py-1">
                {allUsersLoading && (
                  <span className="dui-loading dui-loading-spinner"></span>
                )}
                {allUsersError && (
                  <span className="">{allUsersError.errorMessage}</span>
                )}
              </div>
            )}

            {createChatError && (
              <span className="text-center text-red-500">
                {createChatError.message?.userId.message ||
                  createChatError?.errorMessage}
              </span>
            )}

            {allUsers &&
              allUsers.map((user) => (
                <UserListItem
                  key={user.id}
                  {...user}
                  isLoading={createChatLoading}
                  onCreateChat={() => createChat(user.id)}
                />
              ))}
          </div>
        </div>
        <label className="dui-modal-backdrop bg-black/80" htmlFor="my_modal_7">
          Close
        </label>
      </dialog>
      <div
        className={classNames(
          "relative h-dvh divide-y-2 overflow-y-auto bg-neutral-800 *:py-2",
          className,
        )}
      >
        <div className="sticky top-0 z-20 flex items-center bg-inherit px-2 *:flex *:items-center *:gap-2">
          <div className="flex-1">
            <Image
              draggable="false"
              alt="Image"
              src={user.imageUrl!}
              className="size-8 rounded-full object-cover object-top"
              width={100}
              height={100}
            />
            <span className="line-clamp-1 text-sm font-semibold">
              {user.name}
            </span>
          </div>
          <button className="text-xl" onClick={() => setModalOpen(true)}>
            <TbMessagePlus />
          </button>
        </div>

        <div className="grid text-sm">
          <div className="grid grid-cols-2 justify-center">
            <button
              onClick={() => setFilter("active")}
              className={classNames({
                "underline underline-offset-4": filter === "active",
              })}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("all")}
              className={classNames({
                "underline underline-offset-4": filter === "all",
              })}
            >
              All
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {chatsLoading && (
              <div className="flex justify-center">
                <span className="dui-loading dui-loading-spinner"></span>
              </div>
            )}

            {chats &&
              (chats.length > 0 ? (
                chats.map((chat) => (
                  <ChatListItem
                    {...chat}
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                  />
                ))
              ) : (
                <p className="text-center">No chats available</p>
              ))}

            {chatsError && (
              <p className="text-center text-red-500">
                Error: {chatsError.errorMessage || chatsError.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
