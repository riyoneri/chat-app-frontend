import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MessageSVG from "./message-svg";
import { Message } from "./messages-list";

dayjs.extend(relativeTime);

export default function MessagesListItem({
  createdAt,
  senderId,
  text,
  displayDate,
}: Message & { displayDate?: boolean }) {
  const now = dayjs();
  const messageDate = dayjs(createdAt);

  let timeString = now.isSame(messageDate, "day")
    ? messageDate.from(now)
    : messageDate.format("MM/DD/YYYY");

  const isMesssageIncoming = senderId !== "1";

  return (
    <div
      className={classNames("flex items-start max-w-[90%] sm:max-w-[70%]", {
        "flex-row-reverse self-end": !isMesssageIncoming,
      })}
    >
      <MessageSVG incoming={isMesssageIncoming} />
      <div>
        <div
          className={classNames("rounded-md px-2 py-1 flex-1", {
            "bg-neutral-700 rounded-ss-none": isMesssageIncoming,
            "bg-message-out text-black rounded-se-none": !isMesssageIncoming,
          })}
        >
          {text}
        </div>
        {displayDate && (
          <p
            className={classNames("text-xs px-1", {
              "text-end": !isMesssageIncoming,
            })}
          >
            {timeString}
          </p>
        )}
      </div>
    </div>
  );
}
