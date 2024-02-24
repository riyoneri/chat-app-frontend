"use client";

import { ReactNode } from "react";
import NavBar from "../componets/navbar";
// import { redirect } from "next/navigation";
// import { useAppSelector } from "../store/hooks";

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // const user = useAppSelector((state) => state.user);
  // if (!user.userData) return redirect("/");

  return (
    <main className="flex flex-col min-h-dvh">
      {children}
      <NavBar />
    </main>
  );
}
