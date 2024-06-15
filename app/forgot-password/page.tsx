"use client";

import TextInputLabel from "@/components/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import ResetPasswordRequest from "../assets/illustrations/reset-password-request";

const loginSchema = object({
  email: string().required("Email is required"),
});

export default function ForgoPasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const [modalOpen, setModalOpen] = useState(false);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const submitHandler = (_data: object) => {
    reset({ email: "" }, { keepIsSubmitted: false });
    setModalOpen(true);
  };

  return (
    <>
      <title>Reset Password</title>
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
      <main className="mx-auto flex w-full flex-col justify-center sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h3 className="text-center text-2xl font-medium">Reset Password</h3>
        <form
          className="mt-5 grid gap-3"
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextInputLabel
            register={register("email")}
            name="email"
            placeHolder="Email address"
            errorMessage={errors.email?.message}
          />

          <button className="rounded-sm bg-secondary py-1 transition hover:bg-secondary/80">
            Reset
          </button>
        </form>

        <span className="dui-divider"></span>

        <Link href="/" className="mx-auto transition hover:text-accent">
          Login
        </Link>
      </main>
    </>
  );
}
