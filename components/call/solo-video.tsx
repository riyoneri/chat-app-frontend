import Image from "next/image";

import avatarPlaceholder from "@/app/assets/images/avatar.png";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa6";
import { IoVolumeLow } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";

export default function SoloVideoCall({
  onEndCall,
}: {
  onEndCall: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 mb-2 h-2/3 border-b">
      <Image
        alt="Image"
        src={avatarPlaceholder}
        height={500}
        width={500}
        className="size-full object-cover"
      />
      <Image
        alt="Image"
        src={avatarPlaceholder}
        height={200}
        width={200}
        className="absolute right-0 top-0 size-20 object-cover"
      />
      <div className="absolute bottom-3 left-1/2 flex w-11/12 -translate-x-1/2 flex-col items-center justify-between rounded-md bg-white/20 px-3 py-1 backdrop-blur-2xl backdrop-brightness-125 *:flex *:items-center xs:flex-row xs:rounded-full lg:w-2/3">
        <span>23:50</span>
        <div className="gap-3">
          <label className="dui-swap rounded-full bg-secondary  p-2">
            <input type="checkbox" />
            <FaMicrophone className="dui-swap-on" />
            <FaMicrophoneSlash className="dui-swap-off" />
          </label>
          <span
            onClick={onEndCall}
            className="cursor-pointer rounded-sm bg-red-500 p-2"
          >
            <MdCallEnd className="text-lg" />
          </span>
          <label className="dui-swap rounded-full bg-secondary  p-2">
            <input type="checkbox" />
            <FaVideo className="dui-swap-on" />
            <FaVideoSlash className="dui-swap-off" />
          </label>
        </div>
        <div className="">
          <IoVolumeLow className="text-2xl" />
          <input
            type="range"
            min={0}
            max="100"
            value="10"
            className="dui-range dui-range-xs z-10 w-full"
          />
        </div>
      </div>
    </div>
  );
}
