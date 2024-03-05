import { AES, enc } from "crypto-js";

export const encryptObject = (message: string): string =>
  AES.encrypt(message, process.env.NEXT_PUBLIC_SECRET_KEY!).toString();

export const decryptHash = (encrypted: string): string | void => {
  if (!encrypted) return;

  try {
    return AES.decrypt(encrypted, process.env.NEXT_PUBLIC_SECRET_KEY!).toString(
      enc.Utf8,
    );
  } catch {
    return;
  }
};
