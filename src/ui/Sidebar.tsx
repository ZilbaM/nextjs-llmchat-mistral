// src/ui/Sidebar.tsx
import { MessageSquareDiff } from "lucide-react";
import Link from "next/link";

interface Props {
  conversations: string[];
  conversationId?: string;
}

const Sidebar: React.FC<Props> = function ({
  conversations,
  conversationId,
}: Props) {
  return (
    <aside className="h-full w-full bg-gray-50 flex flex-col p-4 gap-4">
      <div className="p-2 flex justify-between items-center">
        <h2 className="text-lg font-bold">Conversations</h2>
        <Link
          href={"/chat/"}
          className="flex items-center text-sm bg-gray-600 text-gray-50 p-2 hover:bg-gray-200 rounded-sm"
        >
          <MessageSquareDiff />
        </Link>
      </div>
      <ul className="flex w-full h-screen mt-2 flex-col gap-3">
        {conversations.map((convId) => (
          <li className="w-full" key={convId}>
            {convId === conversationId ? (
              <p className="w-full text-base bg-gray-200 rounded-md p-2">
                {convId}
              </p>
            ) : (
              <Link
                className="w-full text-base hover:bg-gray-200 rounded-md p-2"
                href={`/chat/${convId}`}
              >{convId}</Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
