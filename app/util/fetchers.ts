import { LoginFormData } from "../(client)/auth/login/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getLocalStorageToken = () =>
  localStorage.getItem("_n")?.replaceAll('"', "");

export const createUser = async (body: FormData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const authenticateUser = async (body: LoginFormData) => {
  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const getAllUsers = async (page?: number) => {
  const response = await fetch(`${API_URL}/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageToken()}`,
    },
  });

  const data = await response.json();

  if (response.status === 401) throw new Error("401");

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const createNewChat = async (userId: string) => {
  const response = await fetch(`${API_URL}/chats`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorageToken()}`,
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();

  if (response.status === 401) throw new Error("401");

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const getAllChats = async () => {
  const response = await fetch(`${API_URL}/chats`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageToken()}`,
    },
  });

  const data = await response.json();

  if (response.status === 401) throw new Error("401");

  if (!response.ok) {
    throw data;
  }

  return data;
};

export interface FetcherData {
  url: string;
  method?: string;
  body?: FormData | {};
  useMultipartHeader?: boolean;
}

export const protectedFetch = async ({
  url,
  method = "GET",
  body,
  useMultipartHeader = false,
}: FetcherData) => {
  let headers: any = {
    Authorization: `Bearer ${getLocalStorageToken()}`,
  };

  if (!useMultipartHeader) headers["Content-Type"] = "application/json";

  let bodyData;

  bodyData = body instanceof FormData ? body : JSON.stringify(body);

  if (!useMultipartHeader) {
    body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: bodyData,
  });

  const data = await response.json();

  if (response.status === 401) {
    localStorage.removeItem("_e");
    localStorage.removeItem("_n");
    return [];
  }

  if (!response.ok) {
    throw data;
  }

  return data;
};
