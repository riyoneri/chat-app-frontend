import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface PasswordInputLabelProperties<T extends FieldValues> {
  name: keyof T;
  placeHolder: string;
  register: UseFormRegister<T>;
  error?: string;
}

export default function PasswordInputLabel<T extends FieldValues>({
  name,
  placeHolder,
  register,
  error,
}: PasswordInputLabelProperties<T>) {
  const [displayPassword, setDisplayPassword] = useState(false);

  return (
    <label htmlFor={String(name)} className="text-sm">
      <div className="flex bg-neutral-700 rounded-sm items-center p-2">
        <input
          type={displayPassword ? "text" : "password"}
          className="flex-1 min-w-1 sm:w-auto bg-transparent focus:outline-none"
          placeholder={placeHolder}
          id={String(name)}
          {...register(name as Path<T>)}
        />
        {displayPassword ? (
          <IoEyeOff
            size={20}
            className="cursor-pointer"
            onClick={() => setDisplayPassword(!displayPassword)}
          />
        ) : (
          <IoEye
            size={20}
            className="cursor-pointer"
            onClick={() => setDisplayPassword(!displayPassword)}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </label>
  );
}
