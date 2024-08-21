import { useAppSelector } from "@/app/hooks/store-hooks";
import classNames from "classnames";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FaRegClock } from "react-icons/fa6";
import { RiCheckDoubleLine } from "react-icons/ri";

dayjs.extend(customParseFormat);

export default function MessagesListItem({
  text,
  senderId,
  state,
  createdAt,
}: MessageDto) {
  const currentUserId = useAppSelector((state) => state.auth.id);
  const date = dayjs(createdAt);

  return (
    <div
      className={classNames("dui-chat", {
        "dui-chat-start": senderId === currentUserId,
        "dui-chat-end": senderId !== currentUserId,
      })}
    >
      <div className="dui-chat-bubble min-h-0 rounded-md px-2 py-1 ">
        {text}
      </div>
      <span className="dui-chat-footer flex select-none items-center gap-2">
        <span className="text-xs">{date.format("H:mm")}</span>
        {senderId === "1" && (
          <>
            {state === "pending" && <FaRegClock className="opacity-50" />}
            {state !== "pending" && (
              <RiCheckDoubleLine
                className={classNames("text-xl", {
                  "text-secondary": state === "seen",
                  "opacity-50": state === "delivered",
                })}
              />
            )}
          </>
        )}
      </span>
    </div>
  );
}
