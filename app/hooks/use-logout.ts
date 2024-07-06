import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { getSocket } from "../helpers/socket";
import { authActions } from "../store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "./store-hooks";

export default function useLogout() {
  const removeTokenValue = useLocalStorage("_o", "_")[2];
  const removeUserValue = useLocalStorage("_e", "_")[2];
  const userId = useAppSelector((state) => state.auth.id);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const socket = getSocket();

  return () => {
    dispatch(authActions.signout());
    removeTokenValue();
    removeUserValue();
    router.replace("/auth/signin");
    socket.emit("user:logout", userId);
  };
}
