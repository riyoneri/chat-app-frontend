import classNames from "classnames";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "bg-neutral-900 text-white max-w-screen-2xl mx-auto min-h-dvh",
        )}
      >
        {children}
      </body>
    </html>
  );
}
