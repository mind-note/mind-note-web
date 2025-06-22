'use client';

import { useRouter } from 'next/navigation';

interface ChatHeaderProps {
  name: string;
  chatId: string;
}

export default function ChatHeader({ name, chatId }: ChatHeaderProps) {
  const router = useRouter();

  const handleCreateDiary = () => {
    router.push(`/chat/feedback?chatId=${chatId}`);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="font-semibold">{name}</div>
      <button
        onClick={handleCreateDiary}
        className="text-sm text-purple-600 font-medium hover:underline"
      >
        일기 생성
      </button>
    </div>
  );
}
