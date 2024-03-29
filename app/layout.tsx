"use client";

import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import classNames from "classnames";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Inter } from "next/font/google";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { Provider } from "react-redux";
import "./globals.css";
import store from "./store";
TimeAgo.addDefaultLocale(en);

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
          <ThemeProvider>
            <SnackbarProvider
              maxSnack={3}
              hideIconVariant
              autoHideDuration={3500}
              preventDuplicate
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <body
                className={classNames(
                  inter.className,
                  "bg-ui-darkest text-white max-w-screen-2xl mx-auto min-h-dvh",
                )}
              >
                {children}
              </body>
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </html>
  );
}
