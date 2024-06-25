import { useEffect, useRef, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { authActions } from "../store/slices/auth.slice";
import { useAppDispatch } from "./store-hooks";

export default function useLocalstorageData() {
  const tokenReference = useRef("");
  const userReference = useRef("");
  const [isUserValid, setIsUserValid] = useState(false);
  const dispatch = useAppDispatch();

  const token = useReadLocalStorage<string>("_o");
  const user = useReadLocalStorage("_e", {
    deserializer(value) {
      try {
        setIsUserValid(
          !!(
            userReference.current &&
            userReference.current.replaceAll(/["']/g, "") ===
              value.replaceAll(/["']/g, "")
          ),
        );
        return JSON.parse(value);
      } catch {
        return "";
      }
    },
  });

  useEffect(() => {
    tokenReference.current = localStorage.getItem("_o") ?? "";
    userReference.current = localStorage.getItem("_e") ?? "";
  }, []);

  if (!token || !user) return;

  if (
    (token &&
      tokenReference.current &&
      token.replaceAll(/["']/g, "") !==
        tokenReference.current.replaceAll(/["']/g, "")) ||
    (user && userReference.current && !isUserValid)
  ) {
    return;
  }

  dispatch(authActions.signin(user));
  return {
    token,
    user,
  };
}
