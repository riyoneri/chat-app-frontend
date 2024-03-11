"use client";

import MessagesList from "@/app/componets/messages/messages-list";
import { useAppDispatch } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import { ChatWithMessagesDto } from "@/app/util/api";
import { protectedFetch } from "@/app/util/fetchers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Badge, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useParams } from "next/navigation";
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
  const { data, error, isLoading } = useQuery<ChatWithMessagesDto>({
    queryFn: () => protectedFetch({ url: `/chats/${parameters.chatId}` }),
    queryKey: ["messages", parameters.chatId],
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: MessageFormData) => {
    console.log(data);
    reset();
  };

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
        <div className="py-1 overflow-y-auto min-h-[calc(100dvh-9.6rem)] sm:min-h-[calc(100dvh-9.9rem)] grid place-content-center scrollbar-none">
          {data?.messages && <MessagesList messages={data?.messages} />}
          {error && (
            <p className="text-sm text-neutral-300">{error?.message}</p>
          )}
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
                "border-red-500": errors.messageText,
              },
            )}
            rows={2}
            {...register("messageText")}
          ></textarea>
          <button className="size-12 cursor-pointer grid place-content-center bg-sky-800">
            <IoIosSend className="text-2xl" />
          </button>
        </form>
      </section>
    </>
  );
}
