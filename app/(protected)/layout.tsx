"use client";

import { usePrevious } from "@reactuses/core";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { connectServer } from "../helpers/socket";
import { useAppDispatch } from "../hooks/store-hooks";
import useLocalstorageData from "../hooks/use-localstorage-data";
import useLogout from "../hooks/use-logout";
import { authActions } from "../store/slices/auth.slice";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = useLocalstorageData();
  const [isMounted, setIsMounted] = useState(false);
  const logout = useLogout();
  const previousData = usePrevious(data);
  const dispatch = useAppDispatch();

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
      dispatch(authActions.signin(data.user));
      connectServer(data.user.id, data.token);
    }
  }, [data.isAuth, data.token, data.user, data.user.id, dispatch]);

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
