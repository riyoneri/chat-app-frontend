import { Spinner } from "@material-tailwind/react";

export default function Loader() {
  return (
    <main className="grid min-h-dvh place-content-center">
      <Spinner className="size-10" />
    </main>
  );
}
