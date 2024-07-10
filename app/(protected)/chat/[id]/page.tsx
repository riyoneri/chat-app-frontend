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

import { useChatId } from "@/app/hooks/use-chat-id";
import SoloVideoCall from "@/components/call/solo-video";
import MessageList from "@/components/messages/message-list";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { GrMicrophone } from "react-icons/gr";
import { ImAttachment } from "react-icons/im";
import { IoDocument } from "react-icons/io5";
import { MdAddCall, MdAddPhotoAlternate, MdVideoLibrary } from "react-icons/md";

export default function ChatDetails() {
  const [callData, setCallData] = useState<{
    isOpen: boolean;
    type: "video" | "audio";
  }>({
    isOpen: false,
    type: "audio",
  });

  const { id } = useParams<{ id: string }>();

  const { chatData, chatError, chatIsLoading } = useChatId(id);

  const endCallHandler = () => setCallData({ isOpen: false, type: "audio" });
  return (
    <>
      <title>Chat: {`${chatData?.chat.participant.name}`}</title>
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
              <div className="flex flex-col gap-2 bg-tertiary/50 py-1 xs:flex-row sm:flex-col md:flex-row md:items-center">
                <textarea
                  placeholder="Write message here..."
                  rows={2}
                  className="flex-1 resize-none rounded-sm bg-neutral-900 p-0.5 focus:outline-none"
                  name=""
                  id=""
                ></textarea>
                <div className="flex items-center gap-2 text-lg *:flex-1 *:cursor-pointer">
                  <Menu>
                    <MenuButton>
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
                        <MenuItem as="button" className="hover:bg-neutral-700">
                          <MdAddPhotoAlternate className="text-xl" />
                          <span>Image</span>
                        </MenuItem>
                        <MenuItem as="button" className="hover:bg-neutral-700">
                          <MdVideoLibrary className="text-xl" />
                          <span>Video</span>
                        </MenuItem>
                        <MenuItem as="button" className="hover:bg-neutral-700">
                          <IoDocument className="text-xl" />
                          <span>Document</span>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                  <GrMicrophone />
                  <span className="grid place-content-center rounded-md bg-secondary p-1 text-2xl">
                    <FiSend className="" />
                  </span>
                </div>
              </div>
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
                className="size-20 rounded-full "
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
