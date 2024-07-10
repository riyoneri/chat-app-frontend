import CategoryListItem from "@/components/messages/category-list-item";
import { IconType } from "react-icons";
import { IoCall } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { TiMessages } from "react-icons/ti";

export interface Category {
  id: number;
  title: string;
  link: string;
  Icon: IconType;
  className?: string;
}

const Categories: Category[] = [
  {
    id: 1,
    title: "Chat",
    link: "/chat",
    Icon: TiMessages,
    className: "col-span-full",
  },
  {
    id: 2,
    title: "Video Call",
    link: "/video",
    Icon: MdVideoCall,
  },
  {
    id: 3,
    title: "Audio Call",
    link: "/audio",
    Icon: IoCall,
  },
];

export default function Home() {
  return (
    <>
      <title>Categories</title>
      <main className="grid h-full items-center px-5 xs:place-content-center xs:gap-5">
        <h3 className="text-center text-2xl">Categories</h3>
        <div className="grid w-full items-stretch gap-4 xs:grid-cols-2">
          {Categories.map((category) => (
            <CategoryListItem {...category} key={category.id} />
          ))}
        </div>
      </main>
    </>
  );
}
