'use client';

import Link from 'next/link';

export type Record = {
  id: string;
  chatId: string;
  title: string;
  content: string;
  emotion: 'UNSPECIFIED' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  detailEmotion: string;
  tags: string[];
  createdAt: string;
};

export default function RecordListItem({ records }: { records: Record[] }) {
  if (records.length === 0) {
    return <div className="mt-8 text-gray-400">선택한 날짜에 기록이 없습니다.</div>;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      {records.map((record) => {
        const query = new URLSearchParams({
          id: record.id,
          title: record.title,
          emotion: record.emotion,
        }).toString();

        return (
          <Link
            key={record.id}
            href={`/record/detail?${query}`}
            className="px-4 py-2 bg-gray-100 rounded-lg w-full max-w-md shadow-sm flex flex-col items-start hover:bg-gray-200 transition"
          >
            <div className="font-semibold text-lg">{record.title}</div>
            <div className="text-sm text-gray-500 line-clamp-2">{record.content}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(record.createdAt).toLocaleDateString()}</div>
          </Link>
        );
      })}
    </div>
  );
}
