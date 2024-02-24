"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import classNames from "classnames";
import { Inter } from "next/font/google";
import { useState } from "react";
import { Provider } from "react-redux";
import "./globals.css";
import store from "./store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <Provider store={store}>
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
      </Provider>
    </html>
  );
}
