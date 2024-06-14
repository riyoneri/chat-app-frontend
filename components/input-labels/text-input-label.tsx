import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputLabelProperties {
  name: string;
  placeHolder: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

export default function TextInputLabel({
  name,
  placeHolder,
  register,
  errorMessage,
}: TextInputLabelProperties) {
  return (
    <label htmlFor={name} className="grid">
      <input
        type="text"
        {...register}
        placeholder={placeHolder}
        id={name}
        className="rounded-sm bg-tertiary px-2 py-1 placeholder:text-sm autofill:bg-tertiary focus:outline-none"
      />
      {errorMessage && (
        <span className="text-sm text-red-700">{errorMessage}</span>
      )}
    </label>
  );
}
