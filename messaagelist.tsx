import MessageList from "../MessageList";

export default function MessageListExample() {
  const messages = [
    {
      id: "1",
      username: "Sarah Chen",
      content: "Good morning everyone!",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2",
      username: "Mike Rodriguez",
      content: "Hey Sarah! Ready for the quiz today?",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: "3",
      username: "Emma Wilson",
      content: "I studied all night, hope I do well!",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ];

  return <MessageList messages={messages} />;
}
