'use client';

import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 p-4',
        isUser ? 'flex-row-reverse bg-muted/50' : 'bg-background'
      )}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow">
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={cn("flex-1 space-y-2", isUser ? "text-right" : "text-left")}>
        <ReactMarkdown
          className="prose prose-neutral dark:prose-invert break-words prose-p:leading-relaxed prose-pre:p-0"
        >
          {message.text}
        </ReactMarkdown>
        <div className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}