"use client";

import ImageInputLabel from "@/app/componets/input-labels/image-input-label";
import PasswordInputLabel from "@/app/componets/input-labels/password-input-label";
import TextInputLabel from "@/app/componets/input-labels/text-input-label";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { mixed, object, ref, string } from "yup";

export interface RegisterFormData {
  name: string;
  email: string;
  username: string;
  image: FileList;
  password: string;
  confirmPassword: string;
}

const schema = object({
  name: string().trim().required("Name is required"),
  email: string()
    .trim()
    .required("E-mail address is required")
    .email("E-mail address is invalid"),
  username: string().trim().required("Username is required"),
  image: mixed((input): input is FileList => input instanceof FileList)
    .required("Image is required")
    .test("file", "Image is required", (fileList) => fileList.length > 0)
    .test("fileType", "The file must be an image", (fileList) =>
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
    .required("Password is required")
    .matches(/\d/, "Password must contain atleast one number")
    .matches(/[A-Z]/, "Password must contain uppercase character")
    .matches(/[a-z]/, "Password must contain lowercase character")
    .matches(/\W/, "Password must contain special character")
    .min(8, "Password must be 8+ characters"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords dont match"),
});

const onSubmit = (data: RegisterFormData) => console.log(data);

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <>
      <title>Register</title>
      <main className="min-h-dvh py-5 flex flex-col justify-center px-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mx-auto"
        >
          <h1 className="text-xl lg:text-3xl">Create new account</h1>
          <p className="text-sm sm:text-base">
            Already a member?{" "}
            <Link href="/auth/login" className="text-blue-500">
              Log In
            </Link>
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <TextInputLabel
              name="name"
              placeHolder="Name"
              register={register}
              type="text"
              error={errors.name?.message}
            />

            <TextInputLabel
              name="email"
              placeHolder="Email"
              register={register}
              type="email"
              error={errors.email?.message}
            />

            <TextInputLabel
              name="username"
              placeHolder="Username"
              register={register}
              type="text"
              error={errors.username?.message}
            />

            <ImageInputLabel
              name="image"
              placeHolder="Avatar image"
              register={register}
              error={errors.image?.message}
              currentImage={watch("image")?.[0]}
            />

            <PasswordInputLabel
              name="password"
              placeHolder="Password"
              register={register}
              error={errors.password?.message}
            />

            <PasswordInputLabel
              name="confirmPassword"
              placeHolder="Confirm Password"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <button className="bg-sky-800 rounded-sm py-2">Register</button>
          </div>
        </form>
      </main>
    </>
  );
}
