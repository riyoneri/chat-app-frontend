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

import SoloVideoCall from "@/components/call/solo-video";
import MessagesListItem from "@/components/messages-list-item";
import Link from "next/link";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { GrMicrophone } from "react-icons/gr";
import { ImAttachment } from "react-icons/im";
import { IoDocument } from "react-icons/io5";
import { MdAddCall, MdAddPhotoAlternate, MdVideoLibrary } from "react-icons/md";

const Messages: MessageDto[] = [
  {
    id: "1",
    content: "You underestimate my power!",
    conversationId: "1",
    createdAt: "1",
    senderId: "1",
    state: "seen",
  },
  {
    id: "2",
    content: "I know",
    conversationId: "1",
    createdAt: "1",
    senderId: "2",
    state: "delivered",
  },
  {
    id: "3",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur perspiciatis eum corrupti veniam quidem amet ut deleniti tempore! Laboriosam voluptates rem, enim animi harum recusandae ea doloremque quaerat aperiam velit.
      Labore, tempore officiis rerum eum, eligendi debitis, sapiente maiores totam et odio molestiae doloribus ex nulla natus minus similique voluptatem porro explicabo adipisci a amet architecto. Molestias veritatis harum debitis?
      Ducimus totam dicta consequatur corrupti soluta asperiores beatae accusamus doloremque, illum itaque a, modi id obcaecati magni. Iusto distinctio impedit adipisci exercitationem. Ut incidunt quidem provident voluptatibus sequi consectetur iusto?
      Exercitationem optio sint consequuntur quae eos nihil soluta nulla! Obcaecati pariatur nulla vitae possimus iusto eum ipsum ipsa earum tempora deleniti sequi corporis perferendis, repudiandae incidunt beatae eaque dignissimos. Asperiores!
      Odio eligendi mollitia tempora beatae excepturi quia maiores cupiditate ab debitis officiis! Neque ipsa illum officia, eos possimus consequuntur rem unde, perferendis doloremque eius dolorem molestiae aut illo magnam corrupti?
      Cumque atque dignissimos amet! Non quibusdam quaerat quis repellendus eos suscipit illo accusamus, consectetur iste consequatur unde quidem, id ullam beatae veniam eius ut dolorem quam. Similique laudantium possimus optio.
      Fugit a repudiandae rem laborum, rerum repellat explicabo dicta porro, ipsa adipisci tenetur! Veritatis dignissimos distinctio eaque culpa ex deleniti quidem dolore, pariatur excepturi molestiae dolorum facilis est rerum. Distinctio?
      Autem beatae inventore dolore, iste commodi iure error recusandae fuga. Commodi totam, expedita doloribus ex a accusamus esse similique eaque odit reiciendis, est adipisci ullam dolore praesentium atque explicabo aperiam!
      Esse non pariatur porro voluptate distinctio autem alias accusamus amet quam voluptatem magni ad, eius soluta laborum, error ipsum iste excepturi itaque incidunt nostrum aliquid quibusdam praesentium asperiores. Accusamus, animi?
      Ut quia vero soluta, earum maiores error autem provident ad consequatur, fuga id voluptas voluptate veritatis, totam quidem! Error libero itaque fugit sint iusto alias voluptatem fuga dicta qui cum.
      Vel aliquam suscipit laudantium, doloribus, facilis eius sunt quia blanditiis exercitationem earum dolorum dolor deserunt repellendus nostrum aperiam magni ipsa veniam? Itaque minima reprehenderit amet placeat rem voluptates accusamus debitis.
      Esse doloremque enim veniam eum natus dolorum cum doloribus exercitationem, consectetur veritatis repellat culpa commodi suscipit officiis obcaecati totam, nihil earum velit modi quas ut tenetur. Quam nihil alias expedita.
      Tenetur dolorum qui, voluptas impedit deserunt, iure at tempora asperiores suscipit voluptatum corrupti consequatur consequuntur necessitatibus reprehenderit! Sunt dolor expedita officia culpa a, laudantium id cumque, doloremque quo ipsam deserunt?
      Quasi facilis eaque, nesciunt vitae et consequuntur maiores, beatae ipsam recusandae optio molestias voluptate id enim nostrum iste eius sit quo, placeat quis iusto laborum numquam accusantium? Non, dolor quia.
      Error magni neque maiores aspernatur consequuntur nam velit repellendus odit? Officia, tempore ab hic cupiditate expedita aperiam illo mollitia iste molestias dicta atque doloremque harum quidem fugiat eum laboriosam nesciunt.
      Vel voluptate eligendi dolorem, labore culpa blanditiis, expedita, aliquam architecto dignissimos cumque suscipit! Expedita unde tempora pariatur laborum voluptate eligendi atque dolorem beatae cumque doloribus perferendis, quibusdam nostrum quaerat rerum.
      Porro quam voluptas aliquid, laudantium eveniet officia excepturi dolore incidunt inventore ab. Facere officia vero ipsa doloremque maxime! Sit placeat laborum eveniet ut quam unde rerum non veritatis omnis alias!
      Veritatis tempore distinctio assumenda magni dolore tenetur atque iste doloremque ex adipisci commodi rerum neque sunt, voluptatibus tempora fugit reprehenderit. Optio alias soluta repellat at distinctio, inventore reiciendis repudiandae aperiam!
      Cupiditate maxime nisi debitis corrupti exercitationem voluptates, laborum modi quaerat doloribus placeat fuga minima. Eum placeat, vitae quis dignissimos labore nisi aspernatur explicabo voluptate assumenda? Pariatur labore reiciendis nostrum. Beatae?
      Rem, cupiditate sint! Quaerat in veniam debitis tenetur optio officiis ut rem. Dicta iusto atque distinctio ipsam quis laudantium nobis saepe cum! Fugiat similique velit a quaerat quibusdam, quos at.`,
    conversationId: "1",
    createdAt: "1",
    senderId: "1",
    state: "pending",
  },
];

export default function ChatDetails() {
  const [callData, setCallData] = useState<{
    isOpen: boolean;
    type: "video" | "audio";
  }>({
    isOpen: false,
    type: "audio",
  });

  const endCallHandler = () => setCallData({ isOpen: false, type: "audio" });
  return (
    <>
      <title>One chat</title>
      <div className="flex">
        <ChatSection className="hidden w-72 sm:block" />
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
                  src={avatarPlaceholder}
                  className="size-8 rounded-full"
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
              <div>
                {Messages.map((message) => (
                  <MessagesListItem key={message.id} {...message} />
                ))}
              </div>
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
