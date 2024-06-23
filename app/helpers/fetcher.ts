const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetcherData {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "OPTIONS" | "DELETE";
  body?: FormData | string;
}

export const fetcher = async ({ url, body, method = "GET" }: FetcherData) => {
  let headers: any = {};

  typeof body === "string" && (headers["Content-Type"] = "application/json");

  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body,
  });

  const data = await response.json();
  if (!response.ok) {
    if (typeof data === "string" || typeof data.message === "string")
      throw { errorMessage: data?.message || data };
    throw data;
  }

  return data;
};
