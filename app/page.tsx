import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome page",
};

export default function Home() {
  return (
    <main className="h-dvh grid place-content-center">
      <div className="flex flex-col items-center gap-5">
        <p className="sm:text-xl md:text-2xl lg:text-4xl">
          Welcome to the chat app
        </p>
        <div className="flex sm:gap-5 flex-col sm:flex-row w-full sm:w-auto gap-2 *:text-center *:bg-blue-600 *:px-6 *:py-1 *:rounded-full *:transition">
          <Link href="/auth/login" className="hover:bg-blue-400">
            Login
          </Link>
          <Link href="/auth/register" className="hover:bg-blue-400">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
