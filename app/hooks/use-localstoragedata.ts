import { useLocalStorage } from "usehooks-ts";
import { decryptHash } from "../util/security-hash";

let savedToken: string = "";
let savedCipheredUser: string = "";

export const clearSavedData = () => {
  savedToken = "";
  savedCipheredUser = "";
};

export default function useLocalStorageData() {
  const [token] = useLocalStorage<string>("_n", "_");
  const [cipheredUser] = useLocalStorage<string>("_e", "_");

  !savedToken && token !== "_" && (savedToken = token);
  !savedCipheredUser &&
    cipheredUser !== "_" &&
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
