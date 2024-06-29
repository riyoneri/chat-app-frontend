const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetcherData {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "OPTIONS" | "DELETE";
  body?: FormData | string;
  logout?: () => void;
}

export const fetcher = async ({
  url,
  body,
  method = "GET",
  logout,
}: FetcherData) => {
  try {
    let headers: any = {};
    const token = localStorage.getItem("_o")?.replaceAll(/"/g, "");

    typeof body === "string" && (headers["Content-Type"] = "application/json");

    token && (headers["Authorization"] = `Bearer ${token}`);

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
    const typedError = error as Error & { status: number };

    if (typedError.status === 401 && logout) logout();

    throw {
      errorMessage:
        typeof typedError?.message === "string"
          ? typedError.message
          : undefined,
      ...typedError,
    };
  }
};
