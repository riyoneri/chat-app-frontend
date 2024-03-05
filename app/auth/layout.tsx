"use client";

import { redirect } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import useLocalStorageData from "../hooks/use-localstoragedata";

export default function UnProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { enqueueSnackbar } = useSnackbar();
  const data = useLocalStorageData();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (data) {
      enqueueSnackbar("You are already logged in", { variant: "success" });
      redirect("/chats");
    }
  }, [data, enqueueSnackbar]);

  if (!isMounted) return;

  return <>{children}</>;
}
