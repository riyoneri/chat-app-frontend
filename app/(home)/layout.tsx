"use client";

import { redirect } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import NavBar from "../componets/navbar";
import useLocalStorageData from "../hooks/use-localstoragedata";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/auth-slice";
import { useLocalStorage } from "usehooks-ts";
import socket from "../util/socket";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { enqueueSnackbar } = useSnackbar();
  const data = useLocalStorageData();
  const [, setToken] = useLocalStorage<string | undefined>(
    "_n",
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );
  const [, setCipheredUser] = useLocalStorage<string | undefined>(
    "_e",
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!data) {
      setCipheredUser(undefined);
      setToken(undefined);
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

  if (!isMounted) return;

  dispatch(authActions.login(data!));

  return (
    <>
      <main className="flex flex-col min-h-dvh">
        <section className="flex-1">{children}</section>
        <NavBar />
      </main>
    </>
  );
}
