"use client";

import MessagesList from "@/app/componets/messages/messages-list";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import { ChatWithMessagesDto, MessageDto } from "@/app/util/api";
import { FetcherData, protectedFetch } from "@/app/util/fetchers";
import socket from "@/app/util/socket";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Badge, Spinner } from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSend } from "react-icons/io";
import { object, string } from "yup";

interface MessageFormData {
  messageText: string;
}

const schema = object({ messageText: string().required() });

export default function ChatId() {
  const parameters = useParams();
  const appDispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const userId = useAppSelector((state) => state.auth.user?._id);
  const [badgeInvisible, setBadgeInvisible] = useState(true);
  const { data, error, isLoading } = useQuery<ChatWithMessagesDto>({
    queryFn: () => protectedFetch({ url: `/chats/${parameters.chatId}` }),
    queryKey: ["messages", parameters.chatId],
  });
  const {
    error: createMessageError,
    isPending: createMessageLoading,
    mutate,
  } = useMutation<MessageDto, Error, FetcherData>({
    mutationFn: (data) => protectedFetch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
      reset();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    socket.on(
      "status",
      ({ type, userId }: { type: "active" | "inactive"; userId: string }) => {
        console.log(type, userId, data?.participants._id);
        if (type === "active" && userId === data?.participants._id)
          setBadgeInvisible(false);

        if (type === "inactive" && userId === data?.participants._id)
          setBadgeInvisible(true);
      },
    );

    socket.on("actives", (activeChats: string[]) => {
      if (activeChats.includes(data?.participants._id!))
        setBadgeInvisible(false);
    });

    return () => {
      socket.off("status");
      socket.off("actives");
    };
  }, [data?.participants._id, userId]);

  const inputValue = watch("messageText");

  useEffect(() => {
    if (!inputValue) return;

    socket.emit("typing-status", {
      status: "active",
      senderId: userId,
      receiverId: data?.participants._id,
    });
  }, [data?.participants._id, inputValue, userId]);

  const onSubmit = (data: MessageFormData) => {
    mutate({
      url: `/chats/${parameters.chatId}`,
      body: data,
      method: "POST",
    });
  };

  return (
    <>
      <title>{`Chat ${data?.participants?.username ?? ""}`}</title>
      <section className="flex flex-col w-full h-full">
        <div className="flex justify-between items-center bg-ui-darker px-2 sm:px-3 py-2">
          <div className="flex gap-2 items-center">
            <GiHamburgerMenu
              className="text-2xl block sm:hidden cursor-pointer"
              onClick={() => appDispatch(uiActions.openRightSideBar())}
            />
            <div className="flex-1 flex gap-2 items-center">
              <Badge
                color="green"
                overlap="circular"
                placement="bottom-end"
                invisible={badgeInvisible}
              >
                <Avatar
                  src={
                    data?.participants.imageUrl ??
                    "https://i.pinimg.com/564x/09/64/03/09640380fe9e45c7cc7c786e25c09985.jpg"
                  }
                  alt="Avatar"
                  placeholder={undefined}
                  size="sm"
                />
              </Badge>
              <p className="text-sm sm:text-base">{data?.participants.name}</p>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "py-1 overflow-y-auto h-[calc(100dvh-9.6rem)] sm:h-[calc(100dvh-9.9rem)] grid scrollbar-none",
            { "place-content-center": error || isLoading },
          )}
        >
          {data?.messages && <MessagesList messages={data?.messages} />}
          {error && <p className="text-sm text-neutral-300">{error.message}</p>}
          {isLoading && <Spinner fontSize={20} />}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex bg-ui-darker gap-2 px-1 py-2"
        >
          <textarea
            placeholder="Write message here..."
            className={classNames(
              "flex-1 resize-none min-w-1 p-1 text-sm focus:outline-none bg-neutral-700 border-2 border-neutral-700",
              {
                "border-red-500": errors.messageText || createMessageError,
              },
            )}
            rows={2}
            {...register("messageText")}
          ></textarea>
          <button
            disabled={createMessageLoading}
            className="size-12 cursor-pointer grid place-content-center bg-sky-800"
          >
            {createMessageLoading ? (
              <Spinner />
            ) : (
              <IoIosSend className="text-2xl" />
            )}
          </button>
        </form>
      </section>
    </>
  );
}
