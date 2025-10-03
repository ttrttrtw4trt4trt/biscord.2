import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageProps {
  id: string;
  username: string;
  userAvatar?: string;
  content: string;
  timestamp: string | Date;
  isGrouped?: boolean;
}

export default function Message({
  id,
  username,
  userAvatar,
  content,
  timestamp,
  isGrouped = false,
}: MessageProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (time: string | Date) => {
    const date = typeof time === "string" ? new Date(time) : time;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (isGrouped) {
    return (
      <div className="group hover-elevate px-4 py-0.5 -mx-4" data-testid={`message-${id}`}>
        <div className="flex gap-3">
          <div className="w-10" />
          <div className="flex-1 min-w-0">
            <p className="text-base leading-relaxed text-foreground break-words">{content}</p>
          </div>
          <time className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            {formatTime(timestamp)}
          </time>
        </div>
      </div>
    );
  }

  return (
    <div className="group hover-elevate px-4 py-2 -mx-4" data-testid={`message-${id}`}>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={userAvatar} />
          <AvatarFallback className="text-xs">{getInitials(username)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="font-semibold text-sm text-foreground">{username}</span>
            <time className="text-xs text-muted-foreground">{formatTime(timestamp)}</time>
          </div>
          <p className="text-base leading-relaxed text-foreground break-words">{content}</p>
        </div>
      </div>
    </div>
  );
}
