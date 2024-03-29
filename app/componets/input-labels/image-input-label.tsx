import { RegisterFormData } from "@/app/(client)/auth/register/page";
import Image from "next/image";
import { UseFormRegister } from "react-hook-form";

interface ImageInputLabelProperties {
  name: "image";
  placeHolder: string;
  register: UseFormRegister<RegisterFormData>;
  error?: string;
  currentImage?: File;
}

export default function ImageInputLabel({
  name,
  placeHolder,
  register,
  error,
  currentImage,
}: ImageInputLabelProperties) {
  return (
    <>
      <div className="flex sm:items-center gap-2 sm:flex-row flex-col-reverse">
        <label htmlFor={name} className="flex flex-col sm:flex-1 sm:min-w-1">
          <input
            type="file"
            className="hidden bg-neutral-700 rounded-sm p-2 focus:outline-none"
            id={name}
            {...register(name)}
          />

          <p className="text-sm bg-neutral-700 rounded-sm p-2 text-neutral-400">
            {placeHolder}
          </p>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </label>
        {currentImage && (
          <Image
            className="size-16 object-cover object-top self-center sm:self-auto rounded-full"
            src={URL.createObjectURL(currentImage)}
            alt={name}
            width={100}
            height={100}
          />
        )}
      </div>
    </>
  );
}
