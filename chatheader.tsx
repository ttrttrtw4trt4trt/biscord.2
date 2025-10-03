import { Hash } from "lucide-react";

interface ChatHeaderProps {
  channelName: string;
  channelDescription?: string;
}

export default function ChatHeader({ channelName, channelDescription }: ChatHeaderProps) {
  return (
    <div className="h-12 border-b border-border flex items-center px-4 bg-background">
      <div className="flex items-center gap-2">
        <Hash className="h-5 w-5 text-muted-foreground" />
        <h2 className="font-semibold text-foreground" data-testid="text-channel-name">
          {channelName}
        </h2>
      </div>
      {channelDescription && (
        <>
          <div className="h-4 w-px bg-border mx-3" />
          <p className="text-sm text-muted-foreground">{channelDescription}</p>
        </>
      )}
    </div>
  );
}
