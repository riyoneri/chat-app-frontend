import { ExpandedChatDto } from "@/app/util/api";
import ChatListItem from "./chats-list-item";
const date = new Date();
date.setDate(date.getDate() - 1);

export default function ChatList({ chats }: { chats: ExpandedChatDto[] }) {
  return (
    <div className="text-sm *:px-2 *:py-3 space-y-1">
      {chats.length > 0 ? (
        chats.map((chat) => <ChatListItem {...chat} key={chat._id} />)
      ) : (
        <p className="text-center">No chats available.</p>
      )}
    </div>
  );
}
