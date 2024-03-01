"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      <title>Register</title>
      <main className="min-h-dvh py-5 flex flex-col justify-center px-5">
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) =>
            event.preventDefault()
          }
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
            <input
              type="text"
              className="text-sm sm:w-auto bg-neutral-700 rounded-sm p-2 focus:outline-none"
              name="name"
              placeholder="Name"
            />
            <p className="text-red-500 text-sm px-1 -mt-2">Error</p>
            <input
              type="text"
              className="text-sm sm:w-auto bg-neutral-700 rounded-sm p-2 focus:outline-none"
              name="email"
              placeholder="Email"
            />
            <p className="text-red-500 text-sm px-1 -mt-2">Error</p>
            <input
              type="text"
              className="flex-1 text-sm sm:w-auto bg-neutral-700 rounded-sm p-2 focus:outline-none"
              name="username"
              placeholder="Username"
            />
            <p className="text-red-500 text-sm px-1 -mt-2">Error</p>
            <label
              htmlFor="password"
              className="flex text-sm bg-neutral-700 rounded-sm items-center p-2"
            >
              <input
                type={passwordVisible ? "text" : "password"}
                className="flex-1 min-w-1 sm:w-auto bg-transparent focus:outline-none"
                name="password"
                placeholder="Password"
                id="password"
              />
              {passwordVisible ? (
                <IoEyeOff
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <IoEye
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              )}
            </label>
            <p className="text-red-500 text-sm px-1 -mt-2">Error</p>
            <button className="bg-sky-800 rounded-sm py-2">Register</button>
          </div>
        </form>
      </main>
    </>
  );
}
