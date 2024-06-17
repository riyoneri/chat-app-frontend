"use client";

import NavigationBar from "@/components/navigation-bar";
import classNames from "classnames";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

TimeAgo.addDefaultLocale(en);

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html
      lang="en"
      className="bg-neutral-600 scrollbar-track-neutral-700 scrollbar-thumb-accent"
    >
      <body
        className={classNames(
          montserrat.className,
          "bg-neutral-900 max-w-screen-2xl overflow-hidden mx-auto text-white min-h-dvh flex",
        )}
      >
        {!pathname.includes("auth") && pathname !== "/" && <NavigationBar />}
        <main className="flex-1 *:h-full">{children}</main>
      </body>
    </html>
  );
}
