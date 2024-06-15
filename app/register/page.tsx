"use client";

import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { object, ref, string } from "yup";

const loginSchema = object({
  name: string().required("Name is required"),
  username: string().required("Email or Username is required"),
  password: string()
    .required("Password not strong")
    .matches(/[A-Z]/, "Password not strong")
    .matches(/[a-z]/, "Password not strong")
    .matches(/\d/, "Password not strong")
    .matches(/\W/, "Password not strong")
    .min(8, "Password not strong"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must be the same"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const submitHandler = (_data: object) => {};

  const passwordValue = watch("password");

  const passwordValidations = [
    {
      isValid: () => {
        try {
          string().matches(/[A-Z]/).required().validateSync(passwordValue);
          return true;
        } catch {
          return false;
        }
      },
      errorMessage: "Contain uppercase character",
    },
    {
      isValid: () => {
        try {
          string().matches(/[a-z]/).required().validateSync(passwordValue);
          return true;
        } catch {
          return false;
        }
      },
      errorMessage: "Contain lowercase character",
    },
    {
      isValid: () => {
        try {
          string().matches(/\d/).required().validateSync(passwordValue);
          return true;
        } catch {
          return false;
        }
      },
      errorMessage: "Should contain a number",
    },
    {
      isValid: () => {
        try {
          string().matches(/\W|_/).required().validateSync(passwordValue);
          return true;
        } catch {
          return false;
        }
      },
      errorMessage: "Should contain special character",
    },
    {
      isValid: () => {
        try {
          string().min(8).required().validateSync(passwordValue);
          return true;
        } catch {
          return false;
        }
      },
      errorMessage: "8 Characters minimum",
    },
  ];

  return (
    <main className="mx-auto flex w-full flex-col justify-center sm:w-2/3 md:w-1/2">
      <h3 className="text-center text-2xl font-medium">Register new account</h3>
      <form className="mt-5 grid gap-3" onSubmit={handleSubmit(submitHandler)}>
        <TextInputLabel
          register={register("name")}
          name="name"
          placeHolder="Name"
          errorMessage={errors.name?.message}
        />

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
          validations={passwordValidations}
        />

        <PasswordInputLabel
          register={register("confirmPassword")}
          name="confirmPassword"
          placeHolder="Confirm password"
          errorMessage={errors.confirmPassword?.message}
        />
        <Link
          href="/forgot-password"
          className="-mt-2 ml-auto text-sm transition hover:text-accent"
        >
          Forgot password?
        </Link>

        <button className="rounded-sm bg-secondary py-1 transition hover:bg-secondary/80">
          Register
        </button>
      </form>

      <span className="dui-divider text-sm">Already a user?</span>

      <Link href="/" className="mx-auto transition hover:text-accent">
        Login
      </Link>
    </main>
  );
}
