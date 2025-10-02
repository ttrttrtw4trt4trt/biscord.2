import ChatSidebar from "../ChatSidebar";

export default function ChatSidebarExample() {
  const channels = [
    { id: "1", name: "general" },
    { id: "2", name: "homework-help", unread: true },
    { id: "3", name: "study-group" },
    { id: "4", name: "announcements" },
  ];

  return (
    <ChatSidebar
      channels={channels}
      currentChannelId="1"
      onChannelSelect={(id) => console.log("Selected channel:", id)}
      username="Student Name"
    />
  );
}
