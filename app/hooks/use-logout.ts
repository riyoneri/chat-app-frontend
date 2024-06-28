import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { authActions } from "../store/slices/auth.slice";
import { useAppDispatch } from "./store-hooks";

export default function useLogout() {
  const removeTokenValue = useLocalStorage("_o", "_")[2];
  const removeUserValue = useLocalStorage("_e", "_")[2];
  const dispatch = useAppDispatch();
  const router = useRouter();

  return () => {
    dispatch(authActions.signout());
    removeTokenValue();
    removeUserValue();
    router.replace("/auth/signin");
  };
}
