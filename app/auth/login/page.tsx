"use client";

import PasswordInputLabel from "@/app/componets/input-labels/password-input-label";
import TextInputLabel from "@/app/componets/input-labels/text-input-label";
import { authActions } from "@/app/store/auth-slice";
import { useAppDispatch } from "@/app/store/hooks";
import { AuthenticateUserDto } from "@/app/util/api";
import { authenticateUser } from "@/app/util/fetchers";
import { encryptObject } from "@/app/util/security-hash";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { object, string } from "yup";

export interface LoginFormData {
  emailOrUsername: string;
  password: string;
}

interface ErrorData extends LoginFormData {}

const schema = object({
  emailOrUsername: string()
    .trim()
    .required("E-mail addres or username are required"),
  password: string().required("Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [, setToken] = useLocalStorage("_n", "");
  const [, setUser] = useLocalStorage("_e", "");

  const { data, error, isPending, mutate } = useMutation<
    AuthenticateUserDto,
    {
      message: ErrorData | string;
    },
    LoginFormData
  >({ mutationFn: (body) => authenticateUser(body) });

  useEffect(() => {
    if (error && typeof error.message === "object") {
      for (let key in error.message) {
        const errorProperty = key as keyof ErrorData;
        setError(errorProperty, { message: error.message[errorProperty] });
      }
    }

    if (data) {
      const cipheredUser = encryptObject(JSON.stringify(data.user));
      setUser(cipheredUser);
      setToken(data.token);
      dispatch(authActions.login(data));
      enqueueSnackbar(`Welcome back ${data.user.username}`, {
        variant: "success",
      });
      replace("/chats");
    }
  }, [
    data,
    dispatch,
    enqueueSnackbar,
    error,
    replace,
    setError,
    setToken,
    setUser,
  ]);

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <>
      <title>Login</title>
      <main className="min-h-dvh py-5 flex flex-col justify-center px-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mx-auto"
        >
          <h1 className="text-xl lg:text-3xl">Login to the app</h1>
          <p className="text-sm sm:text-base">
            No account?{" "}
            <Link href="/auth/register" className="text-blue-500">
              Register
            </Link>
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <TextInputLabel
              name="emailOrUsername"
              placeHolder="E-mail / Username"
              register={register}
              type="text"
              error={errors.emailOrUsername?.message}
            />

            <PasswordInputLabel
              name="password"
              placeHolder="Password"
              register={register}
              error={errors.password?.message}
            />

            {typeof error?.message === "string" && (
              <p className="text-center text-sm text-red-500">
                {error.message}
              </p>
            )}
            <button
              className="bg-sky-800 rounded-sm py-2 flex justify-center"
              disabled={isPending}
            >
              {isPending ? <Spinner fontSize={40} /> : "Login"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
