import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import ThemeToggle from "@/components/ThemeToggle";
import UsernameDialog from "@/components/UsernameDialog";
import type { Channel, Message } from "@shared/schema";

export default function Chat() {
  const [username, setUsername] = useState<string>("");
  const [showUsernameDialog, setShowUsernameDialog] = useState(true);
  const [currentChannelId, setCurrentChannelId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const { data: channels = [] } = useQuery<Channel[]>({
    queryKey: ["/api/channels"],
    enabled: !!username,
  });

  useEffect(() => {
    if (channels.length > 0 && !currentChannelId) {
      setCurrentChannelId(channels[0].id);
    }
  }, [channels, currentChannelId]);

  useEffect(() => {
    if (!currentChannelId) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/channels/${currentChannelId}/messages`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [currentChannelId]);

  useEffect(() => {
    if (!username) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        
        if (parsed.type === "message") {
          setMessages((prev) => [...prev, parsed.data]);
        } else if (parsed.type === "error") {
          console.error("WebSocket error:", parsed.error);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    wsRef.current = socket;

    return () => {
      socket.close();
    };
  }, [username]);

  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
    setShowUsernameDialog(false);
  };

  const handleSendMessage = (content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected");
      return;
    }

    wsRef.current.send(
      JSON.stringify({
        type: "message",
        data: {
          channelId: currentChannelId,
          username: username,
          content: content,
        },
      })
    );
  };

  const currentChannel = channels.find((ch) => ch.id === currentChannelId);
  const currentMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  if (showUsernameDialog) {
    return <UsernameDialog open={showUsernameDialog} onSubmit={handleUsernameSubmit} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar
        channels={channels}
        currentChannelId={currentChannelId}
        onChannelSelect={setCurrentChannelId}
        username={username}
      />
      
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between border-b border-border h-12 px-4 bg-background">
          <ChatHeader
            channelName={currentChannel?.name || ""}
            channelDescription={currentChannel?.description || undefined}
          />
          <ThemeToggle />
        </div>
        
        <MessageList messages={currentMessages} />
        
        <MessageInput
          channelName={currentChannel?.name || ""}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
