"use client";

import { useOptimistic, useState, useRef } from "react";

interface Message {
  text: string;
  sending?: boolean;
}

function Thread({
  messages,
  sendMessage,
}: {
  messages: Message[];
  sendMessage: (formData: FormData) => Promise<void>;
}) {
  const [optimisticMessages, addOptimisticMessage] =
    useOptimistic<Message[]>(messages);
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    const msg = formData.get("message") as string | "";
    addOptimisticMessage((prev) => [...prev, { text: msg, sending: true }]);
    formRef.current?.reset();
    await sendMessage(formData);
  }

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
      <pre className="bg-red-100">{JSON.stringify(messages, null, 2)}</pre>

      <pre className="bg-red-400">
        {JSON.stringify(optimisticMessages, null, 2)}
      </pre>
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello there!", sending: false },
  ]);

  async function sendMessage(formData: FormData) {
    const msg = formData.get("message") as string | "";
    const sentMessage = await deliverMessage(msg);
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }

  return <Thread messages={messages} sendMessage={sendMessage} />;
}

async function deliverMessage(message: string): Promise<string> {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
