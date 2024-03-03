import { ReactNode } from "react";

import NavBar from "../componets/navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex flex-col min-h-dvh">
      <section className="flex-1">{children}</section>
      <NavBar />
    </main>
  );
}
