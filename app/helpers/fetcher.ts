const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetcherData {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "OPTIONS" | "DELETE";
  body?: FormData | string;
}

export const fetcher = async ({ url, body, method = "GET" }: FetcherData) => {
  try {
    let headers: any = {};

    typeof body === "string" && (headers["Content-Type"] = "application/json");

    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers,
      body,
    });

    const data = await response.json();
    if (!response.ok) {
      if (typeof data.message === "string")
        throw { errorMessage: data.message, status: response.status };

      throw {
        ...data,
        status: response.status,
      };
    }

    return data;
  } catch (error) {
    const typedError = error as Error;
    throw {
      errorMessage:
        typeof typedError?.message === "string"
          ? typedError.message
          : undefined,
      ...typedError,
    };
  }
};
