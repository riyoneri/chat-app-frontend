"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSnackbar } from "notistack";
import { IoMdLogOut } from "react-icons/io";
import { useLocalStorage } from "usehooks-ts";
import { authActions } from "../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import socket from "../util/socket";

export default function NavBar() {
  // eslint-disable-next-line unicorn/no-useless-undefined
  const [, setToken] = useLocalStorage("_n", undefined);
  // eslint-disable-next-line unicorn/no-useless-undefined
  const [, setUser] = useLocalStorage("_e", undefined);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?._id);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const pathname = usePathname();

  function handleLogout() {
    dispatch(authActions.logout());
    const key = enqueueSnackbar("", {
      persist: true,
      className: "text-red-500",
      style: { backgroundColor: "#141416", boxShadow: "none" },
      key: 2,
      autoHideDuration: 0,
      transitionDuration: 0,
    });
    closeSnackbar(key);
    setToken(undefined);
    setUser(undefined);
    socket.emit("logout", { userId });
  }
  return (
    <div className="bg-neutral-800 *:transition relative text-xs sm:text-sm flex gap-5 items-center justify-center py-2">
      <Link
        href="/chats"
        className={classNames("px-2 hover:bg-sky-800 sm:px-3 rounded-full", {
          "bg-sky-800": pathname === "/chats",
        })}
      >
        Chats
      </Link>
      {/* <Link
        href="/chats"
        className="hover:bg-sky-800 px-2 sm:px-3 rounded-full"
      >
        Groups
      </Link> */}
      <Link
        href="/chats/new"
        className={classNames("px-2 hover:bg-sky-800 sm:px-3 rounded-full", {
          "bg-sky-800": pathname === "/chats/new",
        })}
      >
        People
      </Link>
      <button
        onClick={handleLogout}
        className="sm:px-2 hover:bg-sky-800 rounded-full"
      >
        <IoMdLogOut className="text-sm sm:text-xl" />
      </button>
    </div>
  );
}
