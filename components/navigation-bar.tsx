import useLogout from "@/app/hooks/use-logout";
import Link from "next/link";
import { FaPowerOff } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { TiMessages } from "react-icons/ti";

export default function NavigationBar() {
  const logout = useLogout();
  return (
    <nav className="relative grid place-content-center gap-3 bg-secondary/50 px-2 text-xl *:rounded-md *:bg-white/10 *:p-2 *:transition sm:*:p-3 3xl:place-content-start 3xl:py-2">
      <Link href="/chat" className="hover:bg-red-500">
        <TiMessages />
      </Link>
      <Link href="/video" className="hover:bg-red-500">
        <MdVideoCall />
      </Link>
      <Link href="/audio" className="hover:bg-red-500">
        <IoCall />
      </Link>

      <button
        onClick={() => logout()}
        className="dui-tooltip dui-tooltip-right absolute bottom-2 left-1/2 z-10 grid -translate-x-1/2 place-content-center text-sm xs:text-base xs:leading-4 3xl:relative 3xl:bottom-0"
        data-tip="Logout"
      >
        <FaPowerOff />
      </button>
    </nav>
  );
}
