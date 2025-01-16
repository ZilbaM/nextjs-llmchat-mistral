// src/ui/Sidebar.tsx
import { MessageSquareDiff } from "lucide-react";
import Link from "next/link";

interface Props {
  conversations: string[];
  conversationId?: string;
}

const Sidebar: React.FC<Props> = function ({ conversations }: Props) {
  return (
    <aside className="h-full w-1/4 bg-gray-50 flex flex-col p-4 gap-4">
      <div className="p-2 flex justify-between items-center">
        <h2 className="text-lg font-bold">Conversations</h2>
        <Link
          href={"/chat/"}
          className="flex items-center text-sm bg-blue-300 text-gray-50 p-2 gap-2 hover:bg-gray-200 rounded-sm"
        >
          <MessageSquareDiff />
        </Link>
      </div>
      <ul className="flex w-full text-base flex-col gap-2">
        {conversations.map((convId) => (
          <li key={convId}>
            <Link
              className="my-4 hover:bg-gray-200 rounded-md p-2"
              href={`/chat/${convId}`}
            >{`${convId}`}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
