'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

import ChatHeader from '@/app/ui/components/chat/ChatHeader';
import ChatInput from '@/app/ui/components/chat/ChatInput';
import ChatMessages from '@/app/ui/components/chat/ChatMessages';
import { API_PATH } from '@/app/utils/http/api-query';
import { createClientHttpInstance } from '@/app/utils/http/client-instance';

interface ChatMessage {
  chatId: string;
  content: string;
  role: 'USER' | 'BOT';
  createdAt: string;
}

export default function ChatPage() {
  const { id: chatId } = useParams();
  const [messages, setMessages] = useState<
    { role: 'user' | 'bot'; name: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!chatId) return;

    const loadMessages = async () => {
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
        console.error('[fetchMessages] 오류:', e);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chatId]);

  const handleSend = async (text: string) => {
    try {
      setSending(true);
      const token = Cookies.get('accessToken');
      if (!token) throw new Error('No access token');

      const res = await axios.post(
        `${API_PATH}/chat/${chatId}/message`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const userMsg = res.data.userMessage;
      const friendMsg = res.data.friendMessage;

      setMessages((prev) => [
        ...prev,
        { role: 'user', name: 'Lucas', text: userMsg.content },
        { role: 'bot', name: 'Brooke', text: friendMsg.content },
      ]);
    } catch (e) {
      console.error('[sendMessage] 오류:', e);
      alert('메시지 전송에 실패했습니다.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white pb-[88px]">
      <ChatHeader name="김미강" chatId={chatId as string} />

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">불러오는 중...</div>
      ) : (
        <ChatMessages messages={messages} />
      )}
      <div className="fixed bottom-[64px] left-0 right-0 max-w-md mx-auto w-full px-4">
        <ChatInput onSend={handleSend} disabled={sending} sending={sending} />
      </div>
    </div>
  );
}
