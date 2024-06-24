"use client";

import { fetcher } from "@/app/helpers/fetcher";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmEmailPage() {
  const searchParameters = useSearchParams();

  interface ResponseError {
    message: { token?: { location: string; message: string } };
    errorMessage?: string;
  }

  const { data, error, isPending, mutate } = useMutation<
    { message: string },
    ResponseError,
    { token: string }
  >({
    mutationFn: (data: { token: string }) =>
      fetcher({
        url: "/auth/verify-email",
        body: JSON.stringify(data),
        method: "POST",
      }),
  });

  useEffect(() => {
    const token = searchParameters.get("token");
    if (token) mutate({ token });
  }, [mutate, searchParameters]);

  if (!searchParameters.get("token")) notFound();

  return (
    <>
      <title>Confirm Email</title>
      <main className="mx-auto flex flex-col items-center justify-center gap-5 p-5 text-sm *:text-center sm:text-base md:w-1/2 lg:w-1/3">
        {isPending && <h3 className="text-2xl">Verifying...</h3>}

        {error && (
          <span className="text-red-500">
            {error.errorMessage || error.message.token?.message}
          </span>
        )}

        {data && (
          <>
            <h3 className="text-2xl">Congulaturations!</h3>
            <p>Your email has been successfully verified. You’re all set!</p>
            <Link
              href="/auth/signin"
              className="block w-full rounded-sm bg-secondary py-2"
            >
              Signin Now!
            </Link>
          </>
        )}
      </main>
    </>
  );
}
