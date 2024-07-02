import Image from "next/image";
import { useEffect, useState } from "react";

interface UserListItemProperties extends UserDto {
  isLoading: boolean;
  onCreateChat: () => void;
}

export default function UserListItem({
  imageUrl,
  name,
  username,
  isLoading,
  onCreateChat,
}: UserListItemProperties) {
  const [currentLoading, setCurrentLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) setCurrentLoading(false);
  }, [isLoading]);

  return (
    <div className="flex gap-2 bg-accent/15 py-1 transition hover:bg-accent/25">
      <Image
        draggable="false"
        alt="Image"
        src={imageUrl}
        className="size-8 self-center rounded-full object-cover object-top"
        width={100}
        height={100}
      />
      <div className="grid flex-1">
        <span className="line-clamp-1 font-medium">{name}</span>
        <span className="line-clamp-1 text-sm text-neutral-400">
          {username}
        </span>
      </div>

      <button
        onClick={() => {
          onCreateChat();
          setCurrentLoading(true);
        }}
        disabled={isLoading}
        className="self-center rounded-sm bg-secondary px-3 py-1"
      >
        {currentLoading && isLoading ? (
          <span className="dui-loading dui-loading-spinner dui-loading-sm align-middle"></span>
        ) : (
          "Start Chat"
        )}
      </button>
    </div>
  );
}
