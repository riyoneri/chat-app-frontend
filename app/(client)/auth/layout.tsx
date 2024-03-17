"use client";

import { useNetworkState } from "@uidotdev/usehooks";
import { redirect } from "next/navigation";
import { SnackbarKey, closeSnackbar, useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import useLocalStorageData from "../../hooks/use-localstoragedata";
let currentStatus: "online" | "offline" = "online";
let offlineSnackbar: SnackbarKey;

export default function UnProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { enqueueSnackbar } = useSnackbar();
  const data = useLocalStorageData();
  const [isMounted, setIsMounted] = useState(false);
  const { online } = useNetworkState();

  useEffect(() => {
    setIsMounted(true);
    if (data) {
      enqueueSnackbar("You are already logged in", {
        variant: "success",
        key: "1",
      });
      redirect("/chats");
    }
  }, [data, enqueueSnackbar]);

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

  return <>{children}</>;
}
