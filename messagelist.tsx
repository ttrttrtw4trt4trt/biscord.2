import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";

interface MessageData {
  id: string;
  username: string;
  userAvatar?: string;
  content: string;
  timestamp: string | Date;
}

interface MessageListProps {
  messages: MessageData[];
}

export default function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const shouldGroupMessage = (currentMsg: MessageData, prevMsg: MessageData | undefined) => {
    if (!prevMsg) return false;
    if (currentMsg.username !== prevMsg.username) return false;
    
    const currentTime = typeof currentMsg.timestamp === "string" 
      ? new Date(currentMsg.timestamp).getTime() 
      : currentMsg.timestamp.getTime();
    const prevTime = typeof prevMsg.timestamp === "string" 
      ? new Date(prevMsg.timestamp).getTime() 
      : prevMsg.timestamp.getTime();
    
    const timeDiff = currentTime - prevTime;
    return timeDiff < 5 * 60 * 1000;
  };

  return (
    <ScrollArea className="flex-1" ref={scrollRef}>
      <div className="px-4 py-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
              <Hash className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No messages yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Start the conversation</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={message.id}
              {...message}
              isGrouped={shouldGroupMessage(message, messages[index - 1])}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
}

function Hash({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}
