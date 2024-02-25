import ChatList from "@/app/componets/chats/chats-list";
import { Chats } from "../layout";

export default function DirectMessages() {
  return (
    <>
      <title>Direct Messages</title>
      <section className="flex-1 flex">
        <ChatList chats={Chats} />
        <section className="grid flex-1 place-content-center">
          No Chat opened.
        </section>
      </section>
    </>
  );
}
