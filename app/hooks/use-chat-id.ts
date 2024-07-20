import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../helpers/fetcher";
import useLogout from "./use-logout";

interface ResponseError extends GlobalResponseError {
  message: {
    chatId: { message: string };
  };
}

export const useChatId = (id: string) => {
  const logout = useLogout();
  const {
    data: chatData,
    error: chatError,
    isLoading: chatIsLoading,
  } = useQuery<
    object,
    ResponseError,
    { chat: ChatDto; messages: MessageDto[] }
  >({
    queryFn: () => fetcher({ url: `/chats/${id}`, logout }),
    queryKey: ["chat", id, logout],
  });

  return { chatData, chatError, chatIsLoading };
};
