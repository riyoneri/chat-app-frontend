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
  validations?: { isValid: () => boolean; errorMessage: string }[];
}

export default function PasswordInputLabel({
  name,
  placeHolder,
  register,
  errorMessage,
  className,
  validations,
}: PasswordInputLabelProperties) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <label
      htmlFor={name}
      className={classNames(
        "grid",
        { "gap-2": validations?.length },
        className,
      )}
    >
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

      {validations?.length && (
        <div className="space-y-1 text-sm">
          {validations?.map((validation) => (
            <div key={validation.errorMessage}>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled
                  checked={validation.isValid()}
                  className="dui-checkbox-success dui-checkbox dui-checkbox-xs"
                />
                <span>{validation.errorMessage}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {errorMessage && (
        <span className="text-sm text-red-700">{errorMessage}</span>
      )}
    </label>
  );
}
