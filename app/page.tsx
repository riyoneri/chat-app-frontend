"use client";

import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const loginSchema = object({
  username: string().required("Email or Username is required"),
  password: string().required("Password is required"),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const submitHandler = (_data: object) => {};

  return (
    <main className="mx-auto flex w-full flex-col justify-center gap-5 sm:w-2/3 md:w-1/2">
      <h3 className="text-center text-2xl font-medium">Sign in to the app</h3>
      <form className="grid gap-3" onSubmit={handleSubmit(submitHandler)}>
        <TextInputLabel
          register={register("username")}
          name="email"
          placeHolder="Email / Username"
          errorMessage={errors.username?.message}
        />
        <PasswordInputLabel
          register={register("password")}
          name="password"
          placeHolder="Password"
          errorMessage={errors.password?.message}
        />

        <button className="rounded-sm bg-secondary py-1">Sign In</button>
      </form>
    </main>
  );
}
