"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSnackbar } from "notistack";
import { IoMdLogOut } from "react-icons/io";
import { useLocalStorage } from "usehooks-ts";
import { clearSavedData } from "../hooks/use-localstoragedata";
import { authActions } from "../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import socket from "../util/socket";

export default function NavBar() {
  const [, setToken] = useLocalStorage("_n", "");
  const [, setUser] = useLocalStorage("_e", "");
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
    setToken("");
    setUser("");
    clearSavedData();
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
      <Link
        href="/groups"
        className={classNames("hover:bg-sky-800 px-2 sm:px-3 rounded-full", {
          "bg-sky-800": pathname.includes("/groups"),
        })}
      >
        Groups
      </Link>
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
