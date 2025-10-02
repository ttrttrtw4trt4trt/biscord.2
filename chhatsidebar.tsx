import { Hash, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Channel {
  id: string;
  name: string;
  unread?: boolean;
}

interface ChatSidebarProps {
  channels: Channel[];
  currentChannelId: string;
  onChannelSelect: (channelId: string) => void;
  username: string;
  userAvatar?: string;
}

export default function ChatSidebar({
  channels,
  currentChannelId,
  onChannelSelect,
  username,
  userAvatar,
}: ChatSidebarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="h-12 border-b border-sidebar-border flex items-center px-4">
        <h2 className="font-semibold text-sidebar-foreground">School Chat</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="px-2 py-1">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Text Channels
            </h3>
          </div>
          <div className="space-y-0.5">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => onChannelSelect(channel.id)}
                data-testid={`channel-${channel.id}`}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                  currentChannelId === channel.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-muted-foreground hover-elevate"
                }`}
              >
                <Hash className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left truncate">{channel.name}</span>
                {channel.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary" data-testid={`unread-${channel.id}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="h-14 border-t border-sidebar-border flex items-center gap-2 px-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={userAvatar} />
          <AvatarFallback className="text-xs">{getInitials(username)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-sidebar-foreground truncate">{username}</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
        <Button size="icon" variant="ghost" data-testid="button-settings">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
