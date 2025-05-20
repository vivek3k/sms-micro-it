
import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ChatMessage, { MessageType } from "./ChatMessage";
import { generateResponse } from "./ChatbotService";
import { v4 as uuidv4 } from "uuid";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm your Portal Assistant. How can I help you today? I can answer questions for both students and faculty members.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    // Add user message
    const userMessage: MessageType = {
      id: uuidv4(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Generate bot response
      const response = await generateResponse(input);
      
      // Add bot message
      const botMessage: MessageType = {
        id: uuidv4(),
        content: response,
        sender: "bot",
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setIsTyping(false);
      
      // Add error message
      const errorMessage: MessageType = {
        id: uuidv4(),
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Chatbot Error",
        description: "There was an error processing your message. Please try again.",
        variant: "destructive",
      });
      
      console.error("Chatbot error:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chatbot dialog */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">Portal Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8" aria-label="Close chat">
              <X className="h-4 w-4 text-primary-foreground" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 h-80">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-accent rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="border-t p-2">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                aria-label="Chat message input"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage} 
                disabled={isTyping || input.trim() === ""}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
