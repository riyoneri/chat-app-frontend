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
          "bg-neutral-900 text-white min-h-dvh grid *:px-5",
        )}
      >
        {children}
      </body>
    </html>
  );
}
