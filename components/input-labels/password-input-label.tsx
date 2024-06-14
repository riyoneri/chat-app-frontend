import classNames from "classnames";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface PasswordInputLabelProperties {
  name: string;
  placeHolder: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  className?: string;
}

export default function PasswordInputLabel({
  name,
  placeHolder,
  register,
  errorMessage,
  className,
}: PasswordInputLabelProperties) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <label htmlFor={name} className={classNames("grid", className)}>
      <div className="flex items-center rounded-sm bg-tertiary px-2 py-1">
        <input
          type={isVisible ? "text" : "password"}
          {...register}
          placeholder={placeHolder}
          id={name}
          className="flex-1 bg-transparent placeholder:text-sm focus:outline-none"
        />
        <span
          className="cursor-pointer select-none text-lg"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {errorMessage && (
        <span className="text-sm text-red-700">{errorMessage}</span>
      )}
    </label>
  );
}
