"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-neutral-800 *:transition relative text-xs sm:text-sm flex gap-5 items-center justify-center py-2 sm:py-3">
      <Link href="/chats" className="bg-sky-800 px-3 rounded-full">
        Chats
      </Link>
      <Link href="/chats" className="hover:bg-sky-800 px-3 rounded-full">
        Groups
      </Link>
      <Link href="/chats" className="hover:bg-sky-800 px-3 rounded-full">
        People
      </Link>
    </div>
  );
}
