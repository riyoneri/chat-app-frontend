"use client";

import Link from "next/link";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoPeopleOutline } from "react-icons/io5";
import { useAppSelector } from "../store/hooks";
import UserIcon from "./user-icon";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const userEmoji = useAppSelector((state) => state.user.userData?.emoji);
  const pathname = usePathname();

  return (
    <div className="bg-neutral-700 relative flex gap-5 items-center text-xl justify-center py-2">
      <Link
        href="/dms"
        className={classNames(
          "p-2 transition hover:bg-blue-500 text-white rounded-full",
          {
            "bg-blue-600": pathname === "/dms",
          },
        )}
      >
        <BiMessageRoundedDetail />
      </Link>
      <Link
        href="/groups"
        className={classNames(
          "p-2 transition hover:bg-blue-500 text-white rounded-full",
          {
            "bg-blue-600": pathname === "/groups",
          },
        )}
      >
        <IoPeopleOutline />
      </Link>
      <UserIcon
        icon={userEmoji ?? ""}
        className="text-base sm:absolute right-5"
      />
    </div>
  );
}
