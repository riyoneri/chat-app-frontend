const API_URL = "http://127.0.0.1:5000";

export const createUser = async (body: { [key: string]: string }) => {
  const response = await fetch(`${API_URL}/users`, {
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
