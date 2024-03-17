"use client";

import Link from "next/link";
import useLocalStorageData from "./hooks/use-localstoragedata";

export default function NotFound() {
  const localstoragedata = useLocalStorageData();
  return (
    <main className="grid place-content-center min-h-dvh text-sm sm:text-base">
      <p> You are lost... Page not found</p>
      <Link
        className="bg-sky-800 text-center hover:bg-sky-600 rounded-full px-3 py-1 mt-2"
        href={localstoragedata ? "/chats" : "/auth/login"}
      >
        Back to {localstoragedata ? "chats" : "login"}
      </Link>
    </main>
  );
}
