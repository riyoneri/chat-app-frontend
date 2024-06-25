"use client";

import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/store-hooks";
import useLocalstorageData from "../hooks/use-localstorage-data";
import useLogout from "../hooks/use-logout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = useLocalstorageData();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const logout = useLogout();
  const authData = useAppSelector((state) => state.auth.id);

  useEffect(() => {
    setIsMounted(true);
    if ((!data || !authData) && isMounted) {
      logout();
      authData &&
        enqueueSnackbar({ message: "Login first!", variant: "error" });
      setAlertShown(true);
    }

    return () => setIsMounted(false);
  }, [alertShown, authData, data, isMounted, logout, router]);

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
