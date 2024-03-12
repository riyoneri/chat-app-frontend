"use client";

import NewChatListItem from "@/app/componets/new-chat-list-item";
import { ChatDto, UserDto } from "@/app/util/api";
import { createNewChat, getAllUsers } from "@/app/util/fetchers";
import { IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { redirect } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { useLocalStorage } from "usehooks-ts";

const getItemProperties = () =>
  ({
    size: "sm",
    className:
      "rounded-full text-base text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-500 transition",
  }) as any;

export default function NewChat() {
  const [activePage, setActivePage] = useState(1);
  const {
    isPending: loading,
    error,
    data,
    mutate,
  } = useMutation<{ users: UserDto[]; hasNextPage: boolean }, Error, number>({
    mutationFn: (page) => getAllUsers(page),
  });
  const {
    isPending: createChatLoading,
    data: createChatData,
    mutate: createChatMutate,
  } = useMutation<ChatDto, Error, string>({
    mutationFn: (userId) => createNewChat(userId),
  });
  const [, setToken] = useLocalStorage("_n", "");
  const [, setCipheredUser] = useLocalStorage("_e", "");

  useEffect(() => {
    if (error?.message === "401") {
      setToken("");
      return setCipheredUser("");
    }

    activePage && mutate(activePage);
  }, [activePage, error, mutate, setCipheredUser, setToken]);

  if (createChatData) redirect(`/chats/${createChatData._id}`);

  const next = () => setActivePage(activePage + 1);

  const previous = () => setActivePage(activePage - 1);

  let displayUsers: ReactElement | ReactElement[] = <p></p>;

  data &&
    (displayUsers =
      data.users.length > 0 ? (
        (displayUsers = data.users.map((newChat) => (
          <NewChatListItem
            loading={createChatLoading}
            disableButton={createChatLoading}
            mutate={createChatMutate}
            {...newChat}
            key={newChat._id}
          />
        )))
      ) : (
        <p className="text-center">No users available</p>
      ));

  return (
    <>
      <title>Users List</title>
      <div className="mx-auto md:w-1/2 lg:w-1/3 mt-5 h-full">
        <h2 className="text-2xl text-center">All Users</h2>

        <div className="mt-5 text-xs sm:text-sm space-y-2">
          {loading && <Spinner className="mx-auto" />}
          {displayUsers}
        </div>

        {!error &&
          !loading &&
          data &&
          (activePage !== 1 || data.hasNextPage) && (
            <div className="flex items-center justify-center gap-5 mt-2">
              <button onClick={previous} disabled={activePage === 1}>
                <FaCircleArrowLeft
                  className={classNames("text-2xl", {
                    "text-neutral-500": activePage === 1,
                  })}
                />
              </button>
              <IconButton {...getItemProperties()}>{activePage}</IconButton>
              <button onClick={next} disabled={!data?.hasNextPage}>
                <FaCircleArrowRight
                  className={classNames("text-2xl", {
                    "text-neutral-500": !data?.hasNextPage,
                  })}
                />
              </button>
            </div>
          )}

        {error && error.message !== "401" && (
          <p className="text-center text-red-600 text-sm">{error.message}</p>
        )}
      </div>
    </>
  );
}
