"use client";

import { usePrevious } from "@reactuses/core";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { connectServer } from "../helpers/socket";
import useLocalstorageData from "../hooks/use-localstorage-data";
import useLogout from "../hooks/use-logout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = useLocalstorageData();
  const [isMounted, setIsMounted] = useState(false);
  const logout = useLogout();
  const previousData = usePrevious(data);

  useEffect(() => {
    setIsMounted(true);
    if (
      (!data.isAuth &&
        isMounted &&
        (previousData?.token === "_" || previousData?.user === "_")) ||
      data.token === "_" ||
      data.user === "_"
    ) {
      enqueueSnackbar("Login first", { variant: "error" });
      logout();
    }
  }, [
    data.isAuth,
    data.token,
    data.user,
    isMounted,
    logout,
    previousData?.token,
    previousData?.user,
  ]);

  useEffect(() => {
    if (data.isAuth) {
      const socket = connectServer(data.user.id, data.token);
      socket.on("connect_error", () =>
        enqueueSnackbar("Socket connection error", { variant: "error" }),
      );
    }
  }, [data.isAuth, data.token, data.user.id]);

  return (
    <>
      {isMounted && data.isAuth ? (
        children
      ) : (
        <div className="grid place-content-center">
          <span className="dui-loading dui-loading-spinner dui-loading-lg"></span>
        </div>
      )}
    </>
  );
}
