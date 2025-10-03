import Message from "../Message";

export default function MessageExample() {
  return (
    <div className="space-y-2 p-4">
      <Message
        id="1"
        username="Alice Johnson"
        content="Hey everyone! Did you finish the math homework?"
        timestamp={new Date().toISOString()}
      />
      <Message
        id="2"
        username="Alice Johnson"
        content="I'm stuck on problem 5"
        timestamp={new Date().toISOString()}
        isGrouped={true}
      />
      <Message
        id="3"
        username="Bob Smith"
        content="Yeah, I can help you with that. Let me know which part is confusing."
        timestamp={new Date().toISOString()}
      />
    </div>
  );
}
