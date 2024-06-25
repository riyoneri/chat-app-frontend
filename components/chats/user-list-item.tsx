import Image from "next/image";

export default function UserListItem({ imageUrl, name, username }: UserDto) {
  return (
    <div className="flex gap-2 bg-accent/15 py-1 transition hover:bg-accent/25">
      <Image
        draggable="false"
        alt="Image"
        src={imageUrl}
        className="size-8 self-center rounded-full"
        width={100}
        height={100}
      />
      <div className="grid flex-1">
        <span className="line-clamp-1 font-medium">{name}</span>
        <span className="line-clamp-1 text-sm text-neutral-400">
          {username}
        </span>
      </div>

      <button className="self-center rounded-sm bg-secondary px-3 py-1">
        Start Chat
      </button>
    </div>
  );
}
