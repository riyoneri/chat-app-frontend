"use client";

import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import useLocalstorageData from "../hooks/use-localstorage-data";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = useLocalstorageData();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [, setTokenValue] = useLocalStorage("_o", "");
  const [, setUserValue] = useLocalStorage("_e", "");

  useEffect(() => {
    setIsMounted(true);
    if (!data && isMounted) {
      setTokenValue("");
      setUserValue("");
      enqueueSnackbar({ message: "Login first!", variant: "error" });
      router.replace("/auth/signin");
    }
  }, [data, isMounted, router, setTokenValue, setUserValue]);

  return (
    <>
      {!isMounted || !data ? (
        <div className="grid place-content-center">
          <span className="dui-loading dui-loading-spinner dui-loading-lg"></span>
        </div>
      ) : (
        children
      )}
    </>
  );
}
