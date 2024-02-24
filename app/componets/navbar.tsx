"use client";

import Link from "next/link";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoPeopleOutline } from "react-icons/io5";
import { useAppSelector } from "../store/hooks";
import UserIcon from "./user-icon";

export default function NavBar() {
  const userEmoji = useAppSelector((state) => state.user.userData?.emoji);

  return (
    <div className="bg-neutral-700 relative flex gap-5 items-center text-xl justify-center py-2">
      <Link href="/dms" className="p-2 bg-blue-600 text-white rounded-full">
        <BiMessageRoundedDetail />
      </Link>
      <Link href="/groups">
        <IoPeopleOutline />
      </Link>
      <UserIcon
        icon={userEmoji ?? ""}
        className="text-base sm:absolute right-5"
      />
    </div>
  );
}
