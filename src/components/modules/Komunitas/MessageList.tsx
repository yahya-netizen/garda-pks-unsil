import { Message } from "@/lib/types/Message";
import { useChannel } from "ably/react";

interface IProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function MessageList({ messages, setMessages }: IProps) {

useChannel('ppks-public-chat', (message) => {
    console.log('Received message:', message);
    // setMessages((prevMessages) => [...prevMessages, message]);
  });

  return (
    <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm">
                {message?.admin?.name || message?.mahasiswa?.nama_lengkap}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(message?.created_at).toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {message.content}
          </p>
        </div>
      ))}
    </div>
  );
}
