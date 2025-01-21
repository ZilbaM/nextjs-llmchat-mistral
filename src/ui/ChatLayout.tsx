import React, { useState } from "react";
import Sidebar from "./Sidebar";
import InputText from "./InputText";
import Button from "./Button";
import { MessageType } from "@/utils/types";
import { Copy, PanelLeftOpen } from "lucide-react";
import clsx from "clsx";

type Props = {
  conversationId?: string;
  conversations: string[];
  messages: MessageType[];
  onSend: (message: string) => void;
  isLoading: boolean;
};

const ChatLayout: React.FC<Props> = function ({
  messages = [],
  conversations = [],
  conversationId,
  onSend,
  isLoading = false,
}: Props) {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={clsx(
          // For smaller screens, position absolutely and use the toggle
          "absolute top-0 left-0 h-full overflow-x-hidden z-30 transition-all duration-500",
          isSidebarOpen ? "w-screen md:w-1/2 lg:w-1/3 xl:w-1/4" : "w-0"
        )}
      >
        <Sidebar
          sidebarToggle={toggleSidebar}
          conversations={conversations}
          conversationId={conversationId}
        />
      </div>

      {/* Main */}
      <main className="relative flex-1 h-full flex flex-col items-center overflow-x-hidden">
        <div onClick={toggleSidebar} className={clsx(
          "absolute w-screen h-screen bg-black z-20 opacity-30 transition-all duration-500",
          !isSidebarOpen && "!bg-transparent pointer-events-none"
        )}></div>
        <header className="w-full sticky z-10 top-0 bg-white border-b border-gray-200 p-6 flex justify-center items-center">
        {!isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="mr-auto cursor-pointer hover:bg-gray-200 p-2 rounded-sm"
          >
            <PanelLeftOpen />
          </div>
        )}
          <h1 className={clsx(
            "text-2xl font-bold",
            !isSidebarOpen && "mr-auto"
          )}>AI Chatbot</h1>
        </header>
        

        <div className="flex flex-col w-full h-full items-center overflow-y-hidden justify-between px-4">
          <ul className="flex flex-col gap-3 w-full h-full overflow-y-scroll pt-2 px-[10vw] sm:px-[15vw] md:px-[20vw] lg:px-[25vw] xl:px-[30vw]">
            {messages.length === 0 && (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <p className="mt-2">Write a message to start a conversation!</p>
              </div>
            )}
            {messages.map((messageItem, idx) => {
              const key = `${messageItem}_${idx}`;
              return (
                <li className="flex gap-2 p-1" key={key}>
                  {messageItem.role === "user" ? (
                    <div>
                      <span className="text-sm md:text-base lg:text-lg font-bold">You:</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-sm md:text-base lg:text-lg font-bold">AI:</span>
                    </div>
                  )}
                  <div className="relative w-full flex justify-between items-center group">
                    <p className="w-11/12 text-sm md:text-base lg:text-lg break-words">{messageItem.content}</p>
                    <Copy
                      size={20}
                      className="absolute right-0 top-2 cursor-pointer hover:scale-125 transition-all h-4"
                      onClick={() =>
                        navigator.clipboard.writeText(messageItem.content)
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex sm:text-sm md:text-base lg:text-lg sticky bottom-0 z-10 bg-white w-full max-w-2xl gap-4 border border-gray-200 p-4 my-4 items-center">
            <InputText
              inputId="chatInput"
              fullWidth
              placeholder="Message"
              type="text"
              onKeyDown={onKeyDown}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <Button
              buttonId="sendButton"
              variant="outlined"
              onClick={() => {
                onSend(message);
                setMessage("");
              }}
              disabled={message.length === 0}
              loading={isLoading}
            >
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatLayout;
