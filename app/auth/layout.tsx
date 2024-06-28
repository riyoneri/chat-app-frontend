"use client";
import { usePrevious } from "@reactuses/core";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useLocalstorageData from "../hooks/use-localstorage-data";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);
  const data = useLocalstorageData();
  const previousData = usePrevious(data);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (
      data.isAuth &&
      isMounted &&
      (previousData?.token !== "_" || previousData?.user !== "_")
    ) {
      enqueueSnackbar("Already loggedin", { variant: "success" });
      router.replace("/");
    }
  }, [data.isAuth, isMounted, previousData?.token, previousData?.user, router]);

  return (
    <div className="grid h-full">
      {isMounted && !data.isAuth ? (
        children
      ) : (
        <div className="grid place-content-center">
          <span className="dui-loading dui-loading-spinner dui-loading-lg"></span>
        </div>
      )}
    </div>
  );
}
