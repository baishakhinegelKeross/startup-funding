"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Loader2, X, Maximize2, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function GlobalChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your startup funding assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend_old = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_AI_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          context: {
            page: {
              url: typeof window !== 'undefined' ? window.location.pathname : '',
              title: typeof window !== 'undefined' ? document.title : '',
            },
            currentView: 'Global Assistant'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();

      function prettifyWithEmojis(response: string): string {
        // Add a smiley face for positive responses
        response = response.replace(/\b(good|great|awesome|perfect)\b/g, '$& 🙂');
    
        // Add a warning emoji for important alerts
        response = response.replace(/\b(urgent|alert|warning)\b/g, '⚠️ $&');
    
        return response;
    }

     /*  function prettifyCodeSnippets(response: string): string {
        // Match for code blocks and apply highlighting
        const codeBlockRegex = /```(.*?)```/gs;
        response = response.replace(codeBlockRegex, (match, p1) => {
            const highlightedCode = hljs.highlightAuto(p1).value;
            return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
        });
        
        return response;
    } */

      function prettifyTextStructure(response: string): string {
        // Split by sentences and capitalize first letter
        let sentences = response.split('. ');
        sentences = sentences.map(sentence => {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        });
    
        // Join the sentences back together
        return sentences.join('. ');
    }

      function prettifyResponse(response: string): string {
        response = prettifyTextStructure(response);
        response = prettifyWithEmojis(response);
        //response = prettifyCodeSnippets(response);
        //response = prettifyResponse(response); // HTML formatting
        return response;
    }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: prettifyResponse(data.response || "Sorry, I couldn't process your request. Please try again."),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  // Add the user's message
  const userMessage: Message = {
    id: messages.length + 1,
    text: input,
    sender: 'user',
    timestamp: new Date()
  };
  setMessages(prev => [...prev, userMessage]);
  setIsLoading(true);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_AI_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: input,
        context: {
          page: {
            url: typeof window !== 'undefined' ? window.location.pathname : '',
            title: typeof window !== 'undefined' ? document.title : ''
          },
          currentView: 'Global Assistant'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from server');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to read response body');
    }
    const decoder = new TextDecoder('utf-8');
    let done = false;
    let botResponse = '';

    // Create a bot message with empty text
    const botMessage: Message = {
      id: messages.length + 2,
      text: "",
      sender: 'bot',
      timestamp: new Date()
    };

    // Add the bot message placeholder to messages
    setMessages(prev => [...prev, botMessage]);

    // Read the stream continuously
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value, { stream: true });
      // SSE chunks are formatted as "data: <content>\n\n"
      // Split stream by double newlines to get individual events
      const events = chunk.split("\n\n").filter(event => event.trim() !== '');
      for (const event of events) {
        // Only process lines that start with "data:"
        console.log("streamdata event=> ",event);
        if (event.startsWith("data:")) {
          const dataLine = event.replace(/^data:\s?/, "").trim();
          console.log("streamdata => ",dataLine);
          botResponse += dataLine;
          // Optionally update the UI incrementally
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...botMessage,
              text: botResponse
            };
            return updated;
          });
        }
        else {
          const dataLine = event.trim();
          console.log("streamdata => ",dataLine);
          botResponse += dataLine;
          // Optionally update the UI incrementally
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...botMessage,
              text: botResponse
            };
            return updated;
          });
        }
      }
    }

    // Optionally, you can prettify the final response
    function prettifyWithEmojis(response: string): string {
      response = response.replace(/\b(good|great|awesome|perfect)\b/g, '$& 🙂');
      response = response.replace(/\b(urgent|alert|warning)\b/g, '⚠️ $&');
      return response;
    }

    function prettifyTextStructure(response: string): string {
      let sentences = response.split('. ');
      sentences = sentences.map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1));
      return sentences.join('. ');
    }

    function prettifyResponse(response: string): string {
      response = prettifyTextStructure(response);
      response = prettifyWithEmojis(response);
      return response;
    }
    
    const prettified = prettifyResponse(botResponse);
    // Final update with a prettified response
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...botMessage, text: prettified };
      return updated;
    });

  } catch (error) {
    const errorMessage: Message = {
      id: messages.length + 2,
      text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
    setInput('');
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white z-50"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 ${isExpanded ? 'w-[800px]' : 'w-[400px]'} shadow-2xl z-50 transition-all duration-300`}>
      <Card className={`${isExpanded ? 'h-[80vh]' : 'h-[500px]'} flex flex-col bg-background border-muted-foreground/20 transition-all duration-300`}>
        <CardHeader className="border-b border-border/50 bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Startup Assistant</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="opacity-70 hover:opacity-100"
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(false)}
                className="opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-y-auto">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <div className="mt-auto border-t border-border/50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="flex items-center gap-2 p-4"
            >
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pr-10 min-h-[40px] py-2 text-white"
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 shrink-0"
              >
                <Send className={`h-4 w-4 ${isLoading ? 'opacity-0' : ''}`} />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
