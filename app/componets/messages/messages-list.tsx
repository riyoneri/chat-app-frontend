import { MessageDto } from "@/app/util/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef, useState } from "react";
import MessagesListItem from "./messages-list-item";
import socket from "@/app/util/socket";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
dayjs.extend(relativeTime);

export default function MessagesList({ messages }: { messages: MessageDto[] }) {
  const queryClient = useQueryClient();
  const containerReference = useRef<null | HTMLDivElement>(null);
  const newMessageReference = useRef<null | HTMLDivElement>(null);
  const [newMessages, setNewMessages] = useState<MessageDto[]>([]);
  const { chatId: currentChatId } = useParams();

  useEffect(() => {
    newMessages.length > 0 &&
      newMessageReference.current?.scrollIntoView({ behavior: "smooth" });
    queryClient.invalidateQueries({ queryKey: ["chats"] });
    socket.on(
      "message",
      ({ newMessage, chatId }: { newMessage: MessageDto; chatId: string }) => {
        if (currentChatId !== chatId) return;
        setNewMessages((previousNewMessages) => [
          ...previousNewMessages,
          newMessage,
        ]);
      },
    );

    return () => {
      socket.off("message");
    };
  }, [currentChatId, messages, newMessages.length, queryClient]);

  useEffect(() => {
    const { current } = containerReference;
    current && current.scrollIntoView({ behavior: "instant" });
    setNewMessages([]);
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 relative p-2 text-xs sm:text-sm">
      {(messages || newMessages).length > 0 ? (
        messages.map((message, index) => (
          <MessagesListItem
            {...message}
            key={message._id}
            displayDate={
              messages[index + 1]?.senderId !== messages[index]?.senderId ||
              (!messages[index + 1] && newMessages.length === 0)
            }
          />
        ))
      ) : (
        <p className="text-center my-auto italic">No messages yet</p>
      )}
      {newMessages.map((message, index) => (
        <div key={message._id} ref={newMessageReference}>
          <MessagesListItem
            {...message}
            displayDate={!newMessages[index + 1]}
          />
        </div>
      ))}
      {(messages || newMessages).length > 0 && (
        <span ref={containerReference} className="absolute bottom-0"></span>
      )}
    </div>
  );
}
