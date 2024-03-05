const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
