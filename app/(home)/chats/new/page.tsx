"use client";

import NewChatListItem from "@/app/componets/new-chat-list-item";
import { IconButton } from "@material-tailwind/react";
import classNames from "classnames";
import { useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export interface NewChat {
  _id: string;
  imageUrl: string;
  name: string;
  username: string;
}

const NewChats: NewChat[] = [
  {
    _id: "1",
    imageUrl: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Lionel Kaneza",
    username: "riyoneri",
  },
  {
    _id: "2",
    imageUrl: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Lionel Muller",
    username: "riyoneri",
  },
];

export default function NewChat() {
  const [active, setActive] = useState(1);

  const getItemProperties = (index: number) =>
    ({
      onClick: () => setActive(index),
      size: "sm",
      className:
        "rounded-full text-base text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-500 transition",
    }) as any;

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const previous = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <>
      <title>Users List</title>
      <div className="mx-auto md:w-1/2 lg:w-1/3 mt-5 h-full">
        <h2 className="text-2xl text-center">All Users</h2>

        <div className="mt-5 text-xs sm:text-sm space-y-2">
          {NewChats.map((newChat) => (
            <NewChatListItem {...newChat} key={newChat._id} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 mt-2">
          <button onClick={previous} disabled={active === 1}>
            <FaCircleArrowLeft
              className={classNames("text-2xl", {
                "text-neutral-500": active === 1,
              })}
            />
          </button>
          <IconButton {...getItemProperties(2)}>{active}</IconButton>
          <button onClick={next} disabled={active === 5}>
            <FaCircleArrowRight
              className={classNames("text-2xl", {
                "text-neutral-500": active === 5,
              })}
            />
          </button>
        </div>
      </div>
    </>
  );
}
