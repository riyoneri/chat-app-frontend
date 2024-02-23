"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import getRandomEmoji from "./util/random-emoji";

export default function Home() {
  const [currentIcon, setCurrentIcon] = useState("😄");
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState<string>("");

  function handleInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setFormError("");
    setUsername(target.value);
  }

  function handleIconChange() {
    setFormError("");
    setCurrentIcon(getRandomEmoji());
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username) return setFormError("Enter username please!");
    console.log("username is fine");
  }

  return (
    <>
      <title>Welcome page</title>
      <main className="min-h-dvh grid items-center px-5 sm:justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center gap-5"
        >
          <p className="sm:text-xl md:text-2xl lg:text-4xl">
            Welcome to the chat app
          </p>
          <label htmlFor="username" className="w-full flex flex-col">
            <input
              type="text"
              className="text-white text-center text-xs sm:text-sm sm:w-auto bg-neutral-700 rounded-full px-4 py-2 focus:outline-none"
              value={username}
              onChange={handleInputChange}
              name="username"
              placeholder="Username"
            />
            {formError && (
              <p className="text-sm text-red-600 text-center">{formError}</p>
            )}
          </label>
          <div className="flex items-center gap-5">
            <span className="text-3xl p-1 rounded-md bg-neutral-700 grid place-content-center">
              {currentIcon}
            </span>
            <button
              type="button"
              onClick={handleIconChange}
              className="rounded-full bg-blue-600/30 transition hover:bg-blue-600/70 px-4 py-1 text-sm"
            >
              Change Icon
            </button>
          </div>
          <button className="hover:bg-blue-800 bg-blue-600 w-full mt-5 px-10 rounded-full py-1">
            Join
          </button>
        </form>
      </main>
    </>
  );
}
