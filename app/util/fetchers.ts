import { LoginFormData } from "../auth/login/page";

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
