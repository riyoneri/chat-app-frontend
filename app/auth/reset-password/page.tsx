"use client";

import ResetPasswordRequest from "@/app/assets/illustrations/reset-password-request";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, ref, string } from "yup";

const resetPasswordFormSchema = object({
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

export default function ForgoPasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordFormSchema) });
  const [modalOpen, setModalOpen] = useState(false);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const submitHandler = (_data: object) => {
    reset({ password: "", confirmPassword: "" }, { keepIsSubmitted: false });
    setModalOpen(true);
  };

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
    <>
      <title>Create new password</title>
      <input
        type="checkbox"
        checked={modalOpen}
        readOnly
        id="forgot_password_mail_sent"
        className="dui-modal-toggle"
      />
      <dialog
        id="forgot_password_mail_sent"
        className="dui-modal dui-modal-middle"
        role="dialog"
      >
        <div className="dui-modal-box flex flex-col items-center px-0 text-xs sm:text-sm">
          <button
            className="mb-5 mr-6 self-end"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            ✕
          </button>

          <ResetPasswordRequest className="w-5/6 xs:w-1/2" />

          <h2 className="my-5 font-medium xs:text-lg sm:text-xl">
            Reset Password Request
          </h2>

          <p className="mx-5 space-y-2 text-pretty text-center">
            We’ve sent an email to the address you provided with instructions to
            reset your password.
          </p>
        </div>
        <label className="dui-modal-backdrop bg-black/80" htmlFor="my_modal_7">
          Close
        </label>
      </dialog>
      <main className="mx-auto flex w-full flex-col justify-center py-5 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h3 className="text-center text-2xl font-medium">Reset Password</h3>
        <form
          className="mt-5 grid gap-3"
          onSubmit={handleSubmit(submitHandler)}
        >
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

          <button className="rounded-sm bg-secondary py-1 transition hover:bg-secondary/80">
            Reset
          </button>
        </form>

        <span className="dui-divider"></span>

        <Link
          href="/auth/signin"
          className="mx-auto transition hover:text-accent"
        >
          Login
        </Link>
      </main>
    </>
  );
}
