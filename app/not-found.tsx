"use client";

import { useRouter } from "next/navigation";
import TakenIllustration from "./assets/illustrations/taken";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-5">
      <TakenIllustration className="sm:w-1/2 md:w-1/3 lg:w-1/4" />
      <p className="text-center text-sm xs:text-base">
        Oops, looks like we took a wrong turn in cyberspace
      </p>
      <button
        onClick={() => router.back()}
        className="w-full rounded-sm bg-secondary px-5 py-1 sm:w-fit"
      >
        Go back
      </button>
    </div>
  );
}
