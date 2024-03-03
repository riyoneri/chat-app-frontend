import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextInputLabelProperties<T extends FieldValues> {
  name: keyof T;
  type: "text" | "email";
  placeHolder: string;
  register: UseFormRegister<T>;
  error?: string;
}

export default function TextInputLabel<T extends FieldValues>({
  name,
  type,
  placeHolder,
  register,
  error,
}: TextInputLabelProperties<T>) {
  return (
    <label htmlFor={String(name)} className="flex flex-col">
      <input
        type={type}
        className="text-sm sm:w-auto bg-neutral-700 rounded-sm p-2 focus:outline-none"
        placeholder={placeHolder}
        id={String(name)}
        {...register(name as Path<T>)}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </label>
  );
}
