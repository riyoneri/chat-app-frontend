"use client";

import NavigationBar from "@/components/navigation-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import classNames from "classnames";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { styled } from "styled-components";
import "./globals.css";
import { store } from "./store";

TimeAgo.addDefaultLocale(en);

const montserrat = Montserrat({ subsets: ["latin"] });

const queryClient = new QueryClient();

const styledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "rgb(3, 94, 104)",
  },
}));

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
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <SnackbarProvider
              Components={{ success: styledMaterialDesignContent }}
              maxSnack={3}
              autoHideDuration={3000}
            >
              {!pathname.includes("auth") && pathname !== "/" && (
                <NavigationBar />
              )}
              <main className="flex-1 *:h-full">{children}</main>
            </SnackbarProvider>
          </Provider>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
