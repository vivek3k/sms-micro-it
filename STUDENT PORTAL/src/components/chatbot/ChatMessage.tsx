
import { Bot, User } from "lucide-react";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === "bot";
  
  // Split message content into paragraphs for better readability
  const contentParagraphs = message.content.split('\n').filter(Boolean);
  
  return (
    <div className={`flex w-full mb-4 ${isBot ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[80%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        <div className={`flex items-start justify-center p-2 rounded-full 
          ${isBot ? "bg-primary text-primary-foreground mr-2" : "bg-secondary text-secondary-foreground ml-2"}`}
        >
          {isBot ? <Bot size={20} /> : <User size={20} />}
        </div>
        <div className={`rounded-lg p-3 ${isBot ? "bg-accent" : "bg-muted"}`}>
          <div className="text-sm whitespace-pre-wrap">
            {contentParagraphs.length > 1 ? (
              contentParagraphs.map((paragraph, idx) => (
                <p key={idx} className={idx < contentParagraphs.length - 1 ? "mb-2" : ""}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p>{message.content}</p>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
