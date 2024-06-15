import classNames from "classnames";
import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";

interface ImageInputLabelProperties {
  name: string;
  placeHolder: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  className?: string;
  currentImage?: File;
}

export default function ImageInputLabel({
  name,
  placeHolder,
  register,
  errorMessage,
  className,
  currentImage,
}: ImageInputLabelProperties) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
      <label
        htmlFor={name}
        className={classNames("grid flex-1 cursor-pointer", className)}
      >
        <input
          type="file"
          {...register}
          placeholder={placeHolder}
          id={name}
          className="hidden"
        />
        <p className="rounded-sm bg-tertiary px-2 py-1 text-neutral-300 placeholder:text-sm autofill:bg-tertiary focus:outline-none">
          {placeHolder}
        </p>
        {errorMessage && (
          <span className="text-sm text-red-700">{errorMessage}</span>
        )}
      </label>
      {currentImage && (
        <Image
          className="size-16 self-center rounded-full object-cover object-top sm:self-auto"
          src={URL.createObjectURL(currentImage)}
          alt={name}
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
