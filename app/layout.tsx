"use client";

import classNames from "classnames";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={client}>
        <body
          className={classNames(
            inter.className,
            "bg-neutral-900 text-white max-w-screen-2xl mx-auto min-h-dvh",
          )}
        >
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
