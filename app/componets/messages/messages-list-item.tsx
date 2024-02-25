import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UserIcon from "../user-icon";
import { Message } from "./messages-list";
import { useAppSelector } from "@/app/store/hooks";

dayjs.extend(relativeTime);

export default function MessagesListItem({
  _id,
  chatId,
  createdAt,
  sender,
  text,
}: Message) {
  const userId = useAppSelector((state) => state.user.userData?._id);
  const now = dayjs();
  const messageDate = dayjs(createdAt);

  let timeString = now.isSame(messageDate, "day")
    ? messageDate.from(now)
    : messageDate.format("MM/DD/YYYY");

  const isOwner = userId === sender;

  return (
    <div
      className={classNames(
        "grid gap-1 text-xs sm:text-sm w-full sm:max-w-[70%]",
        {
          "self-end": isOwner,
        },
      )}
    >
      <div
        className={classNames(
          "grid p-2 text-balance sm:p-5 rounded-md sm:rounded-xl row-span-2 col-span-10",
          {
            "bg-custom-indigo bg-blue-600 rounded-ee-none": isOwner,
            "bg-neutral-700 text-custom-indigo rounded-es-none col-start-2":
              !isOwner,
          },
        )}
      >
        {text}
      </div>
      <UserIcon
        icon="😭"
        className={classNames(
          "size-8 sm:size-10 place-self-center border-neutral-600 row-end-3 bg-custom-indigo/40",
          {
            "col-start-11 ": isOwner,
          },
        )}
      />
      <span
        className={classNames(
          "col-span-10 row-start-3 text-neutral-600 my-2 text-xs",
          {
            "col-start-2": !isOwner,
            "text-end": isOwner,
          },
        )}
      >
        {timeString}
      </span>
    </div>
  );
}
