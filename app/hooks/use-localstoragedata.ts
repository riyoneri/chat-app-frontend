import { useLocalStorage } from "usehooks-ts";
import { decryptHash } from "../util/security-hash";

export default function useLocalStorageData() {
  const [token] = useLocalStorage<string>("_n", "_");
  const [cipheredUser] = useLocalStorage<string>("_e", "_");

  if (!token || !cipheredUser) {
    return;
  }

  const user = decryptHash(cipheredUser);

  if (!user) {
    return;
  }

  return { user: JSON.parse(user), token };
}
