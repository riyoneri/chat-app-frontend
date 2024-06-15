"use client";

import ImageInputLabel from "@/components/input-labels/image-input-label";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { mixed, object, ref, string } from "yup";
import MailSentIllustration from "../assets/illustrations/mail-sent";

const loginSchema = object({
  name: string().required("Name is required"),
  username: string().required("Username is required"),
  email: string().email("Email is invalid").required("Email is required"),
  image: mixed((input): input is FileList => input instanceof FileList)
    .required("Image is required")
    .test("file", "Image is required", (fileList) => fileList.length > 0)
    .test("fileType", "Allowed formats are jpeg, png and jpg", (fileList) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(
        fileList[0]?.type.toLocaleLowerCase(),
      ),
    )
    .test(
      "fileSize",
      "Image size must be less than or equal to 2MB",
      (fileList) => fileList[0]?.size <= 2_000_000,
    ),
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
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const submitHandler = (_data: object) => {
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
      <title>Register</title>
      <input
        type="checkbox"
        checked={modalOpen}
        readOnly
        id="mail_sent"
        className="dui-modal-toggle"
      />
      <dialog
        id="mail_sent"
        className="dui-modal dui-modal-middle"
        role="dialog"
      >
        <div className="dui-modal-box flex flex-col items-center text-xs sm:text-sm">
          <button
            className="self-end"
            onClick={() => {
              router.push("/");
            }}
          >
            ✕
          </button>

          <MailSentIllustration className="w-5/6 xs:w-1/2" />

          <h2 className="my-5 font-medium xs:text-lg sm:text-xl">
            Email Confirmation
          </h2>

          <div className="space-y-2 text-pretty text-center">
            <p>
              🎉 Registration Successful! To get started, please check your
              email inbox for a verification message from us. Click on the
              verification link to confirm your email address.
            </p>
          </div>
          <div className="dui-divider"></div>
          <p className="text-center">
            Didn’t receive the email? Click{" "}
            <button className="text-accent">here</button> to resend the
            verification email.
          </p>
        </div>
        <label className="dui-modal-backdrop bg-black/80" htmlFor="my_modal_7">
          Close
        </label>
      </dialog>
      <main className="mx-auto flex w-full flex-col justify-center sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h3 className="text-center text-2xl font-medium">
          Register new account
        </h3>
        <form
          className="mt-5 grid gap-3"
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextInputLabel
            register={register("name")}
            name="name"
            placeHolder="Name"
            errorMessage={errors.name?.message}
          />

          <TextInputLabel
            register={register("username")}
            name="username"
            placeHolder="Username"
            errorMessage={errors.username?.message}
          />

          <TextInputLabel
            register={register("email")}
            name="email"
            placeHolder="Email"
            errorMessage={errors.email?.message}
          />

          <ImageInputLabel
            name="image"
            className="justify-stretch"
            placeHolder="Enter your profile image"
            register={register("image")}
            errorMessage={errors.image?.message}
            currentImage={watch("image")?.[0]}
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

          <button className="rounded-sm bg-secondary py-1 transition hover:bg-secondary/80">
            Register
          </button>
        </form>

        <span className="dui-divider text-sm">Already a user?</span>

        <Link href="/" className="mx-auto transition hover:text-accent">
          Login
        </Link>
      </main>
    </>
  );
}
