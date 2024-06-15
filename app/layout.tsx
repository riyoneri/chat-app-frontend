"use client";

import NavigationBar from "@/components/navigation-bar";
import classNames from "classnames";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={classNames(
          montserrat.className,
          "bg-neutral-900 max-w-screen-2xl mx-auto text-white min-h-dvh flex",
        )}
      >
        {!pathname.includes("auth") && pathname !== "/" && <NavigationBar />}
        <main className="flex-1 *:h-full">{children}</main>
      </body>
    </html>
  );
}
