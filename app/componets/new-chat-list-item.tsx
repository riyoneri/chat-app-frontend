import { Avatar, Spinner } from "@material-tailwind/react";
import { ChatDto, UserDto } from "../util/api";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";

export default function NewChatListItem({
  _id,
  imageUrl,
  name,
  username,
  loading,
  disableButton,
  mutate,
}: UserDto & {
  loading?: boolean;
  disableButton?: boolean;
  mutate: UseMutateFunction<ChatDto, Error, string, unknown>;
}) {
  const [userId, setUserId] = useState<undefined | string>();
  return (
    <div className="flex items-center justify-between hover:bg-ui-dark px-2 py-1 rounded-sm">
      <div className="flex gap-4 items-center">
        <Avatar src={imageUrl} alt="Avatar" placeholder={undefined} size="sm" />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-neutral-400">{username}</p>
        </div>
      </div>
      <button
        onClick={() => {
          setUserId(_id);
          mutate(_id);
        }}
        disabled={disableButton}
        className="bg-sky-800 px-4 py-1 rounded-sm hover:bg-sky-600 transition"
      >
        {loading && userId ? (
          <Spinner className="mx-auto size-5" />
        ) : (
          "Start Chat"
        )}
      </button>
    </div>
  );
}
