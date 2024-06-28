import { useLocalStorage } from "usehooks-ts";
import { authActions } from "../store/slices/auth.slice";
import { useAppDispatch } from "./store-hooks";

export default function useLocalstorageData() {
  const dispatch = useAppDispatch();

  const [token] = useLocalStorage<string>("_o", "_");
  const [user] = useLocalStorage("_e", "_", {
    deserializer(value) {
      try {
        return JSON.parse(value);
      } catch {
        return "";
      }
    },
  });

  user && user !== "_" && dispatch(authActions.signin(user));

  return {
    token,
    user,
    isAuth: user !== "_" && token !== "_",
  };
}
