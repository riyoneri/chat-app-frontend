import classNames from "classnames";
import { FaRegClock } from "react-icons/fa6";
import { RiCheckDoubleLine } from "react-icons/ri";

export default function MessagesListItem({
  content,
  senderId,
  state,
}: MessageDto) {
  return (
    <div
      className={classNames("dui-chat", {
        "dui-chat-start": senderId === "1",
        "dui-chat-end": senderId !== "1",
      })}
    >
      <div className="dui-chat-bubble min-h-0 rounded-md px-2 py-1 ">
        {content}
      </div>
      <span className="dui-chat-footer flex select-none items-center gap-2">
        <span className="text-xs">12:45</span>
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
