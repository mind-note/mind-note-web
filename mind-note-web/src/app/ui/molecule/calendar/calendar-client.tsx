'use client';

import Link from 'next/link';
import { emotionIcons, emotionBgColors, emotionNames } from '@/app/ui/atom/emotion/emotion';

type Record = {
  id: string;
  chatId: string;
  title: string;
  content: string;
  emotion: string;
  detailEmotion: string;
  contentKeyword: string;
  createdAt: string;
};

export default function CalendarListItem({ records }: { records: Record[] }) {
  if (records.length === 0) {
    return <div className="mt-8 text-gray-400">선택한 날짜에 기록이 없습니다.</div>;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      {records.map((record) => {
        const emotion = record.emotion.toUpperCase(); // ex: 'HAPPY'
        const bgColor = emotionBgColors[emotion] ?? 'bg-gray-100';
        const icon = emotionIcons[emotion] ?? '❓';
        const name = emotionNames[emotion] ?? '미지정';

        return (
          <Link
            key={record.id}
            href={`/diary/${record.id}`}
            className={`px-4 py-3 rounded-lg w-full max-w-md shadow-sm flex flex-col items-start hover:opacity-90 transition ${bgColor} text-white`}
          >
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-xl">{icon}</span>
              <span className="font-semibold">{name}</span>
            </div>
            <div className="font-semibold text-lg">{record.title}</div>
            <div className="text-sm truncate w-full">{record.content}</div>
            <div className="text-xs mt-1 opacity-80">{new Date(record.createdAt).toLocaleDateString()}</div>
            <div className="text-xs mt-1 opacity-90">
              세부 감정: {record.detailEmotion} | 키워드: {record.contentKeyword}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
