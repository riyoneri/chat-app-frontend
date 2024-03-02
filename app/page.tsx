"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <title>Welcome page</title>
      <main className="min-h-dvh px-5 flex flex-col sm:w-1/2 lg:w-1/3 gap-5 sm:gap-10 mx-auto items-center justify-center">
        <h1 className="text-xl sm:text-2xl">Welcome to our chat app</h1>
        <div className="*:rounded-full w-full flex *:bg-sky-800 gap-5 *:transition *:flex-1 sm:flex-row flex-col *:text-center sm:*:w-20 text-sm sm:text-base *:px-5 *:py-2 ">
          <Link href="/auth/register" className="hover:bg-sky-600">
            Register
          </Link>
          <Link href="/auth/login" className="hover:bg-sky-600">
            Login
          </Link>
        </div>
      </main>
    </>
  );
}
