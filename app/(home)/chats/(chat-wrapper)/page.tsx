import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats List",
};

export default function Chats() {
  return (
    <div className="sm:grid place-content-center h-full hidden">
      No Opened chats
    </div>
  );
}
