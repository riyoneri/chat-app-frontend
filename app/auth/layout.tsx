"use client";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useLocalstorageData from "../hooks/use-localstorage-data";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = useLocalstorageData();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (data && isMounted) {
      enqueueSnackbar({ message: "Already logged in", variant: "success" });

      router.replace("/");
    }
  }, [data, isMounted, router]);

  return (
    <div className="grid h-full">
      {!isMounted || data ? (
        <div className="grid place-content-center">
          <span className="dui-loading dui-loading-spinner dui-loading-lg"></span>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
