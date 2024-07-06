import { useLocalStorage } from "usehooks-ts";

export default function useLocalstorageData() {
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

  return {
    token,
    user,
    isAuth: user !== "_" && token !== "_",
  };
}
