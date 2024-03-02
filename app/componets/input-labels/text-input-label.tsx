import { RegisterFormData } from "@/app/auth/register/page";
import { UseFormRegister } from "react-hook-form";

interface TextInputLabelProperties {
  name: keyof RegisterFormData;
  type: "text" | "email";
  placeHolder: string;
  register: UseFormRegister<RegisterFormData>;
  error?: string;
}

export default function TextInputLabel({
  name,
  type,
  placeHolder,
  register,
  error,
}: TextInputLabelProperties) {
  return (
    <label htmlFor={name} className="flex flex-col">
      <input
        type={type}
        className="text-sm sm:w-auto bg-neutral-700 rounded-sm p-2 focus:outline-none"
        placeholder={placeHolder}
        id={name}
        {...register(name)}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </label>
  );
}
