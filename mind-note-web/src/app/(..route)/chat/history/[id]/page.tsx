'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClientHttpInstance } from '@/app/utils/http/client-instance';
import { API_PATH } from '@/app/utils/http/api-query';
import ChatMessages from '@/app/ui/components/chat/ChatMessages';

interface ChatMessage {
  chatId: string;
  content: string;
  role: 'USER' | 'BOT';
  createdAt: string;
}

export default function ChatHistoryPage() {
  const { id: chatId } = useParams();
  const [messages, setMessages] = useState<
    { role: 'user' | 'bot'; name: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const client = createClientHttpInstance();
        const res = await client.get(`${API_PATH}/chat/${chatId}/message`);
        const result: ChatMessage[] = res.data;

         const formatted: { role: 'user' | 'bot'; name: string; text: string }[] = result.map((msg) => ({
          role: msg.role === 'USER' ? 'user' : 'bot',
          name: msg.role === 'USER' ? 'Lucas' : 'Brooke',
          text: msg.content,
        }));

        setMessages(formatted);
      } catch (e) {
        console.error('[ChatHistoryPage] 메시지 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <h1 className="text-xl font-bold mb-4">지난 채팅 내역</h1>
      {loading ? (
        <div className="text-gray-400">불러오는 중...</div>
      ) : (
        <ChatMessages messages={messages} />
      )}
    </div>
  );
}
