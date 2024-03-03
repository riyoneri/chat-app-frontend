import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats List",
};

export default function Chats() {
  return (
    <div className="grid place-content-center h-full">No Opened chats</div>
  );
}
