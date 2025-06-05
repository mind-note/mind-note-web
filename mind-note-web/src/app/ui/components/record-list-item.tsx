'use client';

import Link from 'next/link';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { emotionColors, emotionIcons, emotionBgColors, emotionNames } from '../atom/emotion/emotion';


export type Record = {
  id: string;
  chatId: string;
  title: string;
  content: string;
  emotion: 'UNSPECIFIED' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  detailEmotion: keyof typeof emotionColors;
  tags: string[];
  createdAt: string;
};

export default function RecordListItem({ records }: { records: Record[] }) {
  if (records.length === 0) {
    return <div className="mt-8 text-gray-400">선택한 날짜에 기록이 없습니다.</div>;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {records.map((record) => {
        const query = new URLSearchParams({
          id: record.id,
          title: record.title,
          emotion: record.emotion,
        }).toString();

        const bgColor = emotionColors[record.detailEmotion] || '#000';
        const emotionName = emotionNames[record.detailEmotion];
        const emotionIcon = emotionIcons[record.detailEmotion];

        return (
          <Link
            key={record.id}
            href={`/record/detail?${query}`}
            className="w-full max-w-md rounded-xl p-4 shadow-md text-white relative"
            style={{ backgroundColor: bgColor }}
          >
            {/* 오른쪽 상단 점 3개 */}
            <div className="absolute top-3 right-4 text-white text-xl">
              <HiOutlineDotsVertical />
            </div>

            {/* 날짜 뱃지 */}
            <div className="inline-block px-2 py-1 text-sm rounded-md bg-white text-black font-medium mb-2">
              {new Date(record.createdAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </div>

            {/* 감정 아이콘 + 이름 */}
            <div className="flex items-center gap-1 mb-1 text-white/80 text-sm">
              <span>{emotionIcon}</span>
              <span>{emotionName}</span>
            </div>

            {/* 제목 */}
            <div className="text-lg font-bold mb-1">{record.title}</div>

            {/* 내용 요약 */}
            <div className="text-sm line-clamp-2 text-white/90">{record.content}</div>

            {/* 해시태그 */}
            <div className="mt-2 text-sm text-white/70">
              {record.tags.map((tag) => `#${tag}`).join(' ')}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
