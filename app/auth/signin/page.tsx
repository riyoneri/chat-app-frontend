"use client";

import { fetcher } from "@/app/helpers/fetcher";
import { useAppDispatch } from "@/app/hooks/store-hooks";
import { authActions } from "@/app/store/slices/auth.slice";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { object, string } from "yup";

interface SigninFormData {
  [key: string]: string;
}

interface ResponseError {
  message: {
    emailOrUsername?: { location: string; message: string };
    password?: { location: string; message: string };
  };
  errorMessage: string;
}

const signinFormSchema = object({
  emailOrUsername: string().required("Email or Username is required"),
  password: string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [, setTokenValue] = useLocalStorage("_o", "");
  const [, setUserValue] = useLocalStorage(
    "_e",
    {},
    {
      serializer(value) {
        return JSON.stringify(value);
      },
    },
  );
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinFormSchema) });
  const { data, isPending, error, mutate } = useMutation<
    { user: UserDto; token: string },
    ResponseError,
    SigninFormData
  >({
    mutationFn: (data: SigninFormData) =>
      fetcher({
        url: "/auth/login",
        body: JSON.stringify(data),
        method: "POST",
      }),
  });

  useEffect(() => {
    if (data) {
      setTokenValue(data.token);
      setUserValue(data.user);
      dispatch(authActions.signin(data.user));
      router.replace("/");
    }
  }, [data, dispatch, router, setTokenValue, setUserValue]);

  const submitHandler = (data: SigninFormData) => mutate(data);

  return (
    <>
      <title>Sign In</title>
      <main className="mx-auto flex w-full flex-col justify-center py-5 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h3 className="text-center text-2xl font-medium">Sign in to the app</h3>
        <form
          className="mt-5 grid gap-3"
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextInputLabel
            register={register("emailOrUsername")}
            name="email"
            placeHolder="Email / Username"
            errorMessage={
              errors?.emailOrUsername?.message ||
              error?.message?.emailOrUsername?.message
            }
          />
          <PasswordInputLabel
            register={register("password")}
            name="password"
            placeHolder="Password"
            errorMessage={
              errors?.password?.message || error?.message?.password?.message
            }
          />
          {/* <Link
            href="/auth/forgot-password"
            className="-mt-2 ml-auto text-sm transition hover:text-accent"
          >
            Forgot password?
          </Link> */}

          {error?.errorMessage && (
            <span className="-my-2 text-center text-xs text-red-500">
              {error.errorMessage}
            </span>
          )}
          <button
            disabled={isPending}
            className="flex justify-center rounded-sm bg-secondary py-1 transition hover:bg-secondary/80"
          >
            {isPending ? (
              <span className="dui-loading content-center py-0"></span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <span className="dui-divider text-sm">No Account?</span>

        <Link
          href="/auth/register"
          className="mx-auto transition hover:text-accent"
        >
          Register
        </Link>
      </main>
    </>
  );
}
