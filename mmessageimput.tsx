import MessageInput from "../MessageInput";

export default function MessageInputExample() {
  return (
    <MessageInput
      channelName="general"
      onSendMessage={(content) => console.log("Sending message:", content)}
    />
  );
}
