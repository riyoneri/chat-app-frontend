import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { authActions } from "../store/slices/auth.slice";
import { useAppDispatch } from "./store-hooks";

export default function useLogout() {
  const [, setTokenValue] = useLocalStorage("_o", "");
  const [, setUserValue] = useLocalStorage("_e", "");
  const dispatch = useAppDispatch();
  const router = useRouter();

  return () => {
    setTokenValue("");
    setUserValue("");
    dispatch(authActions.signout());
    router.push("/auth/signin");
  };
}
