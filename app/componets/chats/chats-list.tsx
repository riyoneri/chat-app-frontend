import ChatListItem from "./chats-list-item";
const date = new Date();
date.setDate(date.getDate() - 1);

export interface Chat {
  _id: string;
  participant: {
    name: string;
    imageUrl: string;
  };
  lastMessage: {
    ownerId: string;
    text: string;
    createdAt: string;
  };
  unreadMessages: number;
}

const Chats: Chat[] = [
  {
    _id: "1",
    participant: {
      name: "Lara Muler",
      imageUrl: "https://docs.material-tailwind.com/img/face-2.jpg",
    },
    lastMessage: {
      ownerId: "1",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
          corrupti sit. Quo fugit non voluptate in a voluptatum voluptatibus
          inventore laborum maiores! Temporibus veritatis voluptates est
          voluptatum. Suscipit, aliquid ipsum.`,
      createdAt: date.toISOString(),
    },
    unreadMessages: 2,
  },
  {
    _id: "2",
    participant: {
      name: "Lionel Kaneza",
      imageUrl: "https://docs.material-tailwind.com/img/face-2.jpg",
    },
    lastMessage: {
      ownerId: "2",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
          corrupti sit. Quo fugit non voluptate in a voluptatum voluptatibus
          inventore laborum maiores! Temporibus veritatis voluptates est
          voluptatum. Suscipit, aliquid ipsum.`,
      createdAt: date.toISOString(),
    },
    unreadMessages: 20,
  },
];

export default function ChatList() {
  return (
    <section className="text-sm *:px-2 scrollbar-none *:py-3 sm:h-[calc(100dvh-8.4rem)] overflow-y-auto space-y-1">
      {Chats.map((chat) => (
        <ChatListItem {...chat} key={chat._id} />
      ))}
    </section>
  );
}
