import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../helpers/fetcher";

interface ResponseProperty {
  location: "string";
  message: string;
}

interface MessageFormData {
  text: ResponseProperty;
  image: ResponseProperty;
  video: ResponseProperty;
  voice_note: ResponseProperty;
}

interface ResponseError {
  errorMessage?: string;
  message: Partial<MessageFormData>;
}

export default function useCreateMessage(chatId: string) {
  const {
    mutate,
    data: createMessageData,
    error: createMessageError,
    isPending: createMessageIsPending,
  } = useMutation<object, ResponseError, FormData>({
    mutationFn: (data: FormData) =>
      fetcher({ url: `/chats/message/${chatId}`, method: "POST", body: data }),
  });

  return {
    mutate,
    createMessageData,
    createMessageError,
    createMessageIsPending,
  };
}
