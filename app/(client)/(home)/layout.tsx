"use client";

import { redirect } from "next/navigation";
import { SnackbarKey, closeSnackbar, useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import NavBar from "@/app/componets/navbar";
import useLocalStorageData from "@/app/hooks/use-localstoragedata";
import { authActions } from "@/app/store/auth-slice";
import { useAppDispatch } from "@/app/store/hooks";
import socket from "@/app/util/socket";
import { useNetworkState } from "@uidotdev/usehooks";
let currentStatus: "online" | "offline" = "online";
let offlineSnackbar: SnackbarKey;

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { enqueueSnackbar } = useSnackbar();
  const data = useLocalStorageData();
  const [, setToken] = useLocalStorage("_n", "");
  const [, setCipheredUser] = useLocalStorage("_e", "");
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const { online } = useNetworkState();

  useEffect(() => {
    setIsMounted(true);
    if (!data) {
      setCipheredUser("");
      setToken("");
      enqueueSnackbar("Login first", { variant: "error", key: 2 });
      redirect("/auth/login");
    }
    if (isMounted) {
      socket.emit("initialize", { userId: data?.user._id });
      socket.io.on("reconnect", () => {
        socket.emit("reconnect", { userId: data?.user._id });
      });
    }
  }, [data, enqueueSnackbar, isMounted, setCipheredUser, setToken]);

  useEffect(() => {
    if (online && currentStatus === "offline") {
      currentStatus = "online";
      closeSnackbar(offlineSnackbar);
    }

    if (!online && currentStatus === "online") {
      currentStatus = "offline";
      offlineSnackbar = enqueueSnackbar("You are offline!", {
        variant: "error",
        persist: true,
        hideIconVariant: true,
        disableWindowBlurListener: true,
      });
    }
  }, [enqueueSnackbar, online]);

  if (!isMounted) return;

  dispatch(authActions.login(data!));

  return (
    <>
      <main className="flex flex-col min-h-dvh">
        <section className="flex-1 grid">{children}</section>
        <NavBar />
      </main>
    </>
  );
}
