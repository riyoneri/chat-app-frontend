"use client";

import PasswordInputLabel from "@/app/componets/input-labels/password-input-label";
import TextInputLabel from "@/app/componets/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

interface LoginFormData {
  emailOrUsername: string;
  password: string;
}

const schema = object({
  emailOrUsername: string()
    .trim()
    .required("E-mail addres or username are required"),
  password: string().required("Password is required"),
});

const onSubmit = (data: LoginFormData) => console.log(data);

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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

            <button className="bg-sky-800 rounded-sm py-2">Login</button>
          </div>
        </form>
      </main>
    </>
  );
}
