import { useLocalStorage } from "usehooks-ts";
import { decryptHash } from "../util/security-hash";

let savedToken: string = "";
let savedCipheredUser: string = "";

export default function useLocalStorageData() {
  const [token] = useLocalStorage<string>("_n", "_");
  const [cipheredUser] = useLocalStorage<string>("_e", "_");

  !savedToken && token !== "_" && token !== "undefined" && (savedToken = token);
  !savedCipheredUser &&
    cipheredUser !== "_" &&
    cipheredUser !== "undefined" &&
    (savedCipheredUser = cipheredUser);

  if (savedToken !== token || savedCipheredUser !== cipheredUser) return;

  if (!token || !cipheredUser) {
    return;
  }

  const user = decryptHash(cipheredUser);

  if (!user) {
    return;
  }

  return { user: JSON.parse(user), token };
}
