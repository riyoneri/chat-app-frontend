import classNames from "classnames";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          montserrat.className,
          "bg-neutral-900 max-w-screen-2xl mx-auto text-white min-h-dvh grid",
        )}
      >
        {children}
      </body>
    </html>
  );
}
