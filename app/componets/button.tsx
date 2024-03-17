import classNames from "classnames";
import { PropsWithChildren } from "react";

interface ButtonProperties {
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  disabled,
  rounded,
  type = "button",
  onClick,
}: PropsWithChildren<ButtonProperties>) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        "bg-sky-800 text-sm sm:text-base py-1 sm:py-2 flex justify-center transition hover:bg-sky-600",
        { "rounded-full": rounded, "rounded-sm": !rounded },
        classNames,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
