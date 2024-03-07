import { Avatar } from "@material-tailwind/react";
import { UserDto } from "../util/api";

export default function NewChatListItem({ imageUrl, name, username }: UserDto) {
  return (
    <div className="flex items-center justify-between hover:bg-ui-dark px-2 py-1 rounded-sm">
      <div className="flex gap-4 items-center">
        <Avatar src={imageUrl} alt="Avatar" placeholder={undefined} size="sm" />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-neutral-400">{username}</p>
        </div>
      </div>
      <button className="bg-sky-800 px-4 py-1 rounded-sm hover:bg-sky-600 transition">
        Start Chat
      </button>
    </div>
  );
}
