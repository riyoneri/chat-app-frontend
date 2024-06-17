import ChatsIllustration from "../assets/illustrations/chats";

import ChatSection from "@/components/chats/chat-section";

export default function Chats() {
  return (
    <>
      <title>All Chats</title>
      <div className="flex">
        <ChatSection className="w-full sm:w-72" />
        <div className="hidden flex-1 place-content-center sm:grid">
          <div className="flex flex-col items-center gap-5">
            <ChatsIllustration className="px-5 md:w-2/3" />
            <p className="text-sm">No opened chat.</p>
          </div>
        </div>
      </div>
    </>
  );
}
