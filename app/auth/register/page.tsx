"use client";

import MailSentIllustration from "@/app/assets/illustrations/mail-sent";
import { fetcher } from "@/app/helpers/fetcher";
import ImageInputLabel from "@/components/input-labels/image-input-label";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mixed, object, ref, string } from "yup";

interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  image: FileList;
  password: string;
  confirmPassword: string;
  [key: string]: string | FileList;
}

interface ResponseError {
  message: {
    name?: { location: string; message: string };
    username?: { location: string; message: string };
    email?: { location: string; message: string };
    image?: { location: string; message: string };
    password?: { location: string; message: string };
    confirmPassword?: { location: string; message: string };
  };
  errorMessage: string;
}

interface ResendResponseError {
  message: {
    email?: { location: string; message: string };
  };
  errorMessage?: string;
}

const registerFormSchema = object({
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
      "Image size must be less than or equal to 1MB",
      (fileList) => fileList[0]?.size <= 1_000_000,
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
    getValues: _getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerFormSchema) });
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const {
    data: registerData,
    isPending: registerPending,
    error: registerError,
    mutate: registerMutate,
  } = useMutation<UserDto, ResponseError, FormData>({
    mutationFn: (data: FormData) =>
      fetcher({ url: "/auth/register", body: data, method: "POST" }),
  });

  const {
    data: resendData,
    isPending: _resendPending,
    error: resendError,
    mutate: _resendMutate,
  } = useMutation<
    { message: string },
    ResendResponseError,
    {
      [key: string]: string;
    }
  >({
    mutationFn: (data: { [key: string]: string }) =>
      fetcher({
        url: "/auth/resend-verification",
        body: JSON.stringify(data),
        method: "POST",
      }),
  });

  const submitHandler = (data: RegisterFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("image", data.image[0]);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    formData.append(
      "redirectUrl",
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/auth/confirm-email`,
    );
    registerMutate(formData);
  };

  useEffect(() => {
    if (registerData) setModalOpen(true);
    if (resendError)
      enqueueSnackbar({
        message:
          resendError.message?.email?.message ?? resendError.errorMessage,
        variant: "error",
      });

    if (resendData)
      enqueueSnackbar({
        message: resendData.message,
        variant: "success",
      });
  }, [registerData, resendData, resendError]);

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
              router.push("/auth/signin");
            }}
          >
            ✕
          </button>

          <MailSentIllustration className="w-5/6 xs:w-1/2" />

          <h2 className="my-5 font-medium xs:text-lg sm:text-xl">
            {/* Email Confirmation */}
            Created account
          </h2>

          <div className="space-y-2 text-pretty text-center">
            <p>
              🎉 Registration Successful!
              {/* To get started, please check your
              email inbox for a verification message from us. Click on the
              verification link to confirm your email address. */}
            </p>
          </div>
          {/* <div className="dui-divider"></div>
          <p className="text-center">
            Didn’t receive the email? Click{" "}
            <button
              disabled={resendPending}
              onClick={() =>
                resendMutate({
                  email: getValues("email"),
                  redirectUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/auth/confirm-email`,
                })
              }
              className="text-accent"
            >
              {resendPending ? (
                <span className="dui-loading dui-loading-sm -mb-1 content-center text-2xl"></span>
              ) : (
                <span>here</span>
              )}
            </button>{" "}
            to resend the verification email.
          </p> */}
        </div>
        <label className="dui-modal-backdrop bg-black/80" htmlFor="my_modal_7">
          Close
        </label>
      </dialog>
      <main className="mx-auto flex w-full flex-col justify-center py-5 sm:w-2/3 md:w-1/2 lg:w-1/3">
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
            errorMessage={
              errors.name?.message || registerError?.message?.name?.message
            }
          />

          <TextInputLabel
            register={register("username")}
            name="username"
            placeHolder="Username"
            errorMessage={
              errors.username?.message ||
              registerError?.message?.username?.message
            }
          />

          <TextInputLabel
            register={register("email")}
            name="email"
            placeHolder="Email"
            errorMessage={
              errors.email?.message || registerError?.message?.email?.message
            }
          />

          <ImageInputLabel
            name="image"
            className="justify-stretch"
            placeHolder="Enter your profile picture"
            register={register("image")}
            errorMessage={
              errors.image?.message || registerError?.message?.image?.message
            }
            currentImage={watch("image")?.[0]}
          />

          <PasswordInputLabel
            register={register("password")}
            name="password"
            placeHolder="Password"
            errorMessage={
              errors.password?.message ||
              registerError?.message?.password?.message
            }
            validations={passwordValidations}
          />

          <PasswordInputLabel
            register={register("confirmPassword")}
            name="confirmPassword"
            placeHolder="Confirm password"
            errorMessage={
              errors.confirmPassword?.message ||
              registerError?.message?.confirmPassword?.message
            }
          />

          {registerError?.errorMessage && (
            <span className=" text-center text-xs text-red-500">
              {registerError.errorMessage}
            </span>
          )}
          <button
            disabled={registerPending || !!registerData}
            className="flex justify-center rounded-sm bg-secondary py-1 transition hover:bg-secondary/80"
          >
            {registerPending ? (
              <span className="dui-loading content-center py-0"></span>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>

        <span className="dui-divider text-sm">Already a user?</span>

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
