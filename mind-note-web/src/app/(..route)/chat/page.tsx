import Link from 'next/link';
import { fetchChatList } from '@/app/business/chat/chat.service';

interface ChatItem {
  id: string;
  title: string;
  emotionKeyword: string;
  createdAt: string;
}

export default async function ChatListPage() {
  const chats: ChatItem[] = await fetchChatList();

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">대화 목록</h1>

      <div className="space-y-4">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="block p-4 rounded-lg border hover:bg-gray-50"
          >
            <div className="text-sm text-gray-500">
              감정: {chat.emotionKeyword} | 생성일: {new Date(chat.createdAt).toLocaleString()}
            </div>
            <div className="font-medium text-base">{chat.title}</div>
          </Link>
        ))}
      </div>

      <Link
        href="/chat/keywords"
        className="mt-6 block w-full bg-black text-white text-center py-3 rounded-lg font-semibold"
      >
        + 새 대화 시작하기
      </Link>
    </div>
  );
}