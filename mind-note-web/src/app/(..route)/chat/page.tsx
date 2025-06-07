// app/chat/page.tsx
'use client';

import ChatHeader from '@/app/ui/components/chat/ChatHeader';
import ChatInput from '@/app/ui/components/chat/ChatInput';
import ChatMessages from '@/app/ui/components/chat/ChatMessages';
import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{
    role: 'user' | 'bot';
    name: string;
    text: string;
  }[]>([
    { role: 'bot', name: 'Brooke', text: "Hey Lucas!" },
    { role: 'bot', name: 'Brooke', text: "How's your project going?" },
    { role: 'user', name: 'Lucas', text: "Hi Brooke!" },
    { role: 'user', name: 'Lucas', text: "It's going well. Thanks for asking!" },
    { role: 'bot', name: 'Brooke', text: "No worries. Let me know if you need any help 😉" },
    { role: 'user', name: 'Lucas', text: "You're the best!" },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', name: 'Lucas', text }]);

    // 👇 임시 봇 응답
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          name: 'Brooke',
          text: "I'll get back to you on that! 🤖",
        },
      ]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader name="Brooke Davis" />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
