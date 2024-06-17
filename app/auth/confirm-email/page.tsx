import Link from "next/link";

export default function ConfirmEmailPage() {
  return (
    <>
      <title>Confirm Email</title>
      <main className="mx-auto flex flex-col items-center justify-center gap-5 p-5 text-sm *:text-center sm:text-base md:w-1/2 lg:w-1/3">
        <h3 className="text-2xl">Congulaturations!</h3>
        <p>Your email has been successfully verified. You’re all set!</p>
        <Link
          href="/auth/signin"
          className="block w-full rounded-sm bg-secondary py-2"
        >
          Signin Now!
        </Link>
      </main>
    </>
  );
}
