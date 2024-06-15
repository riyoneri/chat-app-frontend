import Link from "next/link";
import { FaPowerOff } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { TiMessages } from "react-icons/ti";

export default function NavigationBar() {
  return (
    <nav className="relative grid place-content-center gap-3 bg-secondary/50 px-2 text-xl *:rounded-md *:bg-white/10 *:p-2 *:transition sm:*:p-3">
      <Link href="/chat" className="p-2 hover:bg-red-500 sm:p-3">
        <TiMessages />
      </Link>
      <Link href="/video" className="p-2 hover:bg-red-500 sm:p-3">
        <MdVideoCall />
      </Link>
      <Link href="/audio" className="p-2 hover:bg-red-500 sm:p-3">
        <IoCall />
      </Link>

      <div
        className="dui-tooltip dui-tooltip-right absolute bottom-2 left-1/2 grid -translate-x-1/2 place-content-center text-sm xs:text-base xs:leading-4"
        data-tip="Logout"
      >
        <button>
          <FaPowerOff />
        </button>
      </div>
    </nav>
  );
}
