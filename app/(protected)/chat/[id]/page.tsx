"use client";

import avatarPlaceholder from "@/app/assets/images/avatar.png";
import ChatSection from "@/components/chats/chat-section";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronLeft, FaFolder, FaVideo, FaXmark } from "react-icons/fa6";

import { getSocket } from "@/app/helpers/socket";
import { useAppSelector } from "@/app/hooks/store-hooks";
import { useChatId } from "@/app/hooks/use-chat-id";
import useCreateMessage from "@/app/hooks/use-create-message";
import SoloVideoCall from "@/components/call/solo-video";
import MessageList from "@/components/messages/message-list";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTitle } from "@reactuses/core";
import classNames from "classnames";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { GrMicrophone } from "react-icons/gr";
import { ImAttachment } from "react-icons/im";
import { MdAddCall, MdAddPhotoAlternate, MdVideoLibrary } from "react-icons/md";
import { mixed, object, string } from "yup";

interface MessageFormData {
  text: string;
  image?: FileList;
  video?: FileList;
  voice_note?: FileList;
}

const messageFormSchema = object({
  text: string().required("Text is required"),
  image: mixed((input): input is FileList => input instanceof FileList)
    .test(
      "fileType",
      "Only images are allowed",
      (fileList) =>
        fileList &&
        ![...fileList].some(
          (file) => !file.type.toLocaleLowerCase().includes("image"),
        ),
    )
    .test(
      "fileSize",
      "Image size must be less or equal to 5MB",
      (fileList) =>
        fileList && ![...fileList].some((file) => file.size > 5_000_000),
    ),
  video: mixed((input): input is FileList => input instanceof FileList)
    .test(
      "fileType",
      "Only videos are allowed",
      (fileList) =>
        fileList &&
        ![...fileList].some(
          (file) => !file.type.toLocaleLowerCase().includes("video"),
        ),
    )
    .test(
      "fileSize",
      "Video size must be less or equal to 10MB",
      (fileList) =>
        fileList && ![...fileList].some((file) => file.size > 10_000_000),
    ),
  voice_note: mixed(
    (input): input is FileList => input instanceof FileList,
  ).test(
    "fileType",
    "Only audios are allowed",
    (fileList) =>
      fileList &&
      ![...fileList].some(
        (file) => !file.type.toLocaleLowerCase().includes("mp3"),
      ),
  ),
});

export default function ChatDetails() {
  const {
    mutate,
    createMessageData,
    createMessageError,
    createMessageIsPending,
  } = useCreateMessage();

  const [callData, setCallData] = useState<{
    isOpen: boolean;
    type: "video" | "audio";
  }>({
    isOpen: false,
    type: "audio",
  });
  const socket = getSocket();
  const currentUserId = useAppSelector((state) => state.auth.id);
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(messageFormSchema),
  });
  const { chatData, chatError, chatIsLoading, refetchChatData } = useChatId(id);
  useTitle(`Chat: ${chatData?.chat.participant.name ?? ""}`);

  const messageValue = watch("text");
  const imageValue = watch("image");
  const videoValue = watch("video");

  useEffect(() => {
    if (messageValue)
      socket.emit("chat:typing", {
        receiver: chatData?.chat.participant.id,
        sender: currentUserId,
      });
  }, [chatData?.chat.participant.id, currentUserId, messageValue, socket]);

  useEffect(() => {
    createMessageError?.errorMessage &&
      enqueueSnackbar(createMessageError?.errorMessage, { variant: "error" });
    createMessageData && refetchChatData();

    if (createMessageError?.message) {
      createMessageError.message.text &&
        setError("text", { message: createMessageError.message.text.message });
      createMessageError.message.image &&
        setError("image", {
          message: createMessageError.message.image.message,
        });
      createMessageError.message.video &&
        setError("video", {
          message: createMessageError.message.video.message,
        });
      createMessageError.message.voice_note &&
        setError("voice_note", {
          message: createMessageError.message.voice_note.message,
        });
    }
  }, [createMessageData, createMessageError, refetchChatData, setError]);

  chatError?.status === 404 && notFound();

  useTitle(`Chat: ${chatData?.chat.participant.name ?? ""}`);

  const endCallHandler = () => setCallData({ isOpen: false, type: "audio" });

  const submitHandler = (data: MessageFormData) => {
    const formData = new FormData();

    formData.append("text", data.text);
    data.image?.[0] && formData.append("image", data.image[0]);
    data.video?.[0] && formData.append("video", data.video[0]);
    data.voice_note?.[0] && formData.append("voice_note", data.voice_note[0]);

    mutate(formData);
  };

  return (
    <>
      <title>Chat</title>
      <div className="flex">
        <ChatSection className="hidden w-72 sm:block" />
        {(chatError || chatIsLoading) && (
          <div className="grid flex-1 place-content-center">
            {chatIsLoading && (
              <span className="dui-loading dui-loading-lg"></span>
            )}
            {chatError && (
              <span className="text-red-500">
                {chatError.errorMessage || chatError.message?.chatId?.message}
              </span>
            )}
          </div>
        )}
        {chatData && (
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between bg-tertiary/50 px-2 py-1 *:flex *:items-center">
              <div className="flex gap-1">
                <Link
                  href="/chat"
                  className="block content-center self-stretch bg-tertiary px-1 sm:hidden"
                >
                  <FaChevronLeft />
                </Link>
                <div className="flex items-center gap-1">
                  <Image
                    draggable="false"
                    alt="Image"
                    src={chatData?.chat.participant.imageUrl}
                    className="size-8 rounded-full object-cover object-top"
                    width={100}
                    height={100}
                  />
                  <span className="line-clamp-1 text-xs font-semibold xs:text-sm">
                    Lionel Kaneza
                  </span>
                </div>
              </div>
              <div className="gap-1 *:cursor-pointer *:rounded-full *:bg-neutral-900 *:p-1.5 sm:gap-2 sm:text-xl sm:*:p-2.5">
                <span
                  onClick={() => {
                    if (callData.isOpen) return;
                    setCallData({ isOpen: true, type: "video" });
                  }}
                >
                  <FaVideo />
                </span>
                <span>
                  <MdAddCall />
                </span>
                <label htmlFor="info-drawer" className="dui-drawer-button">
                  <BsThreeDots />
                </label>
              </div>
            </div>
            <div className="flex flex-1 flex-col bg-black text-sm *:px-2">
              <div className="relative max-h-[calc(100dvh-8.3rem)] flex-1 overflow-y-auto scrollbar-thin xs:max-h-[calc(100dvh-5.8rem)] sm:max-h-[calc(100dvh-8.8rem)] md:max-h-[calc(100dvh-6.3rem)]">
                {callData.isOpen && (
                  <>
                    {callData.type === "video" && (
                      <SoloVideoCall onEndCall={endCallHandler} />
                    )}
                  </>
                )}
                <MessageList messages={chatData.messages} />
              </div>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="relative flex flex-col gap-2 bg-tertiary/50 py-1 xs:flex-row sm:flex-col md:flex-row md:items-center"
              >
                <>
                  <div className="absolute inset-x-0 -top-1 grid -translate-y-full gap-1 *:grid *:bg-tertiary/50">
                    {imageValue?.[0] && (
                      <label
                        htmlFor="image"
                        className={classNames(
                          "rounded-sm px-2 py-1 border cursor-pointer",
                          {
                            "border-red-500": errors.image,
                            "border-tertiary/50": !errors.image,
                          },
                        )}
                      >
                        <span>{imageValue[0]?.name}</span>
                        {errors.image && (
                          <span className="text-xs text-red-500">
                            {errors.image?.message}
                          </span>
                        )}
                      </label>
                    )}
                    {videoValue?.[0] && (
                      <label
                        htmlFor="video"
                        className={classNames(
                          "rounded-sm px-2 py-1 border cursor-pointer",
                          {
                            "border-red-500": errors.video,
                            "border-tertiary/50": !errors.video,
                          },
                        )}
                      >
                        <span>{videoValue[0]?.name}</span>
                        {errors.video && (
                          <span className="text-xs text-red-500">
                            {errors.video?.message}
                          </span>
                        )}
                      </label>
                    )}
                  </div>
                  <input
                    type="file"
                    {...register("image")}
                    className="hidden"
                    id="image"
                    accept="image/png, image/jpeg, image/jpg"
                  />

                  <input
                    type="file"
                    {...register("video")}
                    className="hidden"
                    id="video"
                    accept="video/mp4, video/mov, video/avi"
                  />

                  <input
                    type="file"
                    {...register("voice_note")}
                    className="hidden"
                    id="voice_note"
                  />
                </>
                <textarea
                  {...register("text")}
                  placeholder="Write message here..."
                  rows={2}
                  className={classNames(
                    "flex-1 border resize-none rounded-sm bg-neutral-900 p-0.5 focus:outline-none",
                    {
                      "border-red-600": errors.text,
                      "border-neutral-900": !errors.text,
                    },
                  )}
                ></textarea>
                <div className="flex items-center gap-2 text-lg *:flex-1 *:cursor-pointer">
                  <Menu>
                    <MenuButton className="flex justify-center">
                      <ImAttachment />
                    </MenuButton>
                    <Transition
                      enter="transition ease-out duration-75"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <MenuItems
                        anchor="top"
                        as="div"
                        className="space-y-3 rounded-md bg-base-300 p-2 text-sm *:flex *:w-full *:items-center *:gap-2 *:p-1 *:transition"
                      >
                        <MenuItem
                          as="label"
                          htmlFor="image"
                          className="hover:bg-neutral-700"
                        >
                          <MdAddPhotoAlternate className="text-xl" />
                          <span>Image</span>
                        </MenuItem>
                        <MenuItem
                          as="label"
                          htmlFor="video"
                          className="hover:bg-neutral-700"
                        >
                          <MdVideoLibrary className="text-xl" />
                          <span>Video</span>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                  <GrMicrophone />
                  <button className="grid place-content-center rounded-md bg-secondary p-1 text-2xl">
                    {createMessageIsPending ? (
                      <span className="dui-loading dui-loading-spinner"></span>
                    ) : (
                      <FiSend />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="dui-drawer dui-drawer-end z-30">
        <input id="info-drawer" type="checkbox" className="dui-drawer-toggle" />
        <div className="dui-drawer-side">
          <label
            htmlFor="info-drawer"
            aria-label="close sidebar"
            className="dui-drawer-overlay"
          ></label>
          <div className="flex min-h-full w-4/6 flex-col items-center gap-3 bg-base-100 p-4 sm:w-80">
            <label htmlFor="info-drawer" className="self-start">
              <FaXmark />
            </label>

            <div className="flex flex-col items-center text-sm">
              <Image
                draggable="false"
                alt="Image"
                src={avatarPlaceholder}
                className="size-20 rounded-full"
                width={200}
                height={200}
              />

              <h2 className="mt-2">Lionel Kaneza</h2>
              <p className="text-neutral-300">riyoneri</p>
            </div>

            <div className="flex items-end gap-2 bg-secondary/20 p-2">
              <FaFolder className="text-5xl" />
              <div className="flex flex-col items-center">
                <span className="text-xs">All files</span>
                <span className="text-3xl">25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
