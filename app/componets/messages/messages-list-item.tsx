import { useAppSelector } from "@/app/store/hooks";
import { MessageDto } from "@/app/util/api";
import classNames from "classnames";
import ReactTimeAgo from "react-time-ago";
import MessageSVG from "./message-svg";

export default function MessagesListItem({
  createdAt,
  senderId,
  content,
  displayDate,
}: MessageDto & { displayDate?: boolean }) {
  const userId = useAppSelector((state) => state.auth.user?._id);

  const isMesssageIncoming = senderId !== userId;

  return (
    <div
      className={classNames("flex items-start max-w-[90%] sm:max-w-[70%]", {
        "flex-row-reverse self-end": !isMesssageIncoming,
      })}
    >
      <MessageSVG incoming={isMesssageIncoming} />
      <div>
        <div
          className={classNames("rounded-md px-2 py-1 flex-1 break-all", {
            "bg-neutral-700 rounded-ss-none": isMesssageIncoming,
            "bg-message-out text-black rounded-se-none": !isMesssageIncoming,
          })}
        >
          {content}
        </div>
        {displayDate && (
          <div
            className={classNames("text-xs px-1", {
              "text-end": !isMesssageIncoming,
            })}
          >
            <ReactTimeAgo
              tooltip={false}
              date={new Date(createdAt)}
              timeStyle="twitter"
            />
          </div>
        )}
      </div>
    </div>
  );
}
