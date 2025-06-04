'use client';

import { useEffect, useState } from 'react';
import RecordListItem from '../../components/record-list-item';

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

type DailyRecord = {
  date: number;
  hasRecords: boolean;
  records: Record[];
};

// ✅ 더미 데이터 (Record 타입에 맞게 수정)
const dummyDailyRecords: DailyRecord[] = [
  {
    date: 2,
    hasRecords: true,
    records: [
      {
        id: '1',
        chatId: 'chat-1',
        title: '참새 관찰',
        content: '벤치 옆 나무에 앉아 있었음',
        emotion: 'POSITIVE',
        detailEmotion: '평온함',
        tags: ['참새', '자연'],
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    date: 5,
    hasRecords: true,
    records: [
      {
        id: '2',
        chatId: 'chat-2',
        title: '까치 봄',
        content: '도서관 앞에서 까치 소리 들음',
        emotion: 'NEUTRAL',
        detailEmotion: '관심',
        tags: ['까치', '소리'],
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    date: 15,
    hasRecords: true,
    records: [
      {
        id: '3',
        chatId: 'chat-3',
        title: '직박구리 관찰',
        content: '지저귐이 활기참',
        emotion: 'POSITIVE',
        detailEmotion: '즐거움',
        tags: ['직박구리'],
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

export default function MonthCalendar() {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth() + 1);
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    setDailyRecords(dummyDailyRecords);
  }, []);

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const handleSelectDate = (day: number | null) => {
    setSelectedDate(day);
    const found = dailyRecords.find((d) => d.date === day);
    setSelectedRecords(found?.records || []);
  };

  return (
    <div className="relative pb-20">
      <div className="text-center text-xl font-bold mb-4">
        {year}.{month.toString().padStart(2, '0')}
      </div>

      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={idx} className="text-center text-gray-400">{day}</div>
        ))}
        {daysArray.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const record = dailyRecords.find((r) => r.date === day);
          return (
            <button
              key={idx}
              onClick={() => handleSelectDate(day)}
              className={`aspect-square flex items-center justify-center rounded-full
                ${record?.hasRecords ? "bg-birdGreen600 text-white" : "bg-gray-200 text-gray-500"}
                hover:scale-110 transition-transform`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {selectedDate && (
          selectedRecords.length > 0 ? (
            <RecordListItem records={selectedRecords} />
          ) : (
            <div className="text-center text-gray-400">해당 날짜에 기록이 없습니다</div>
          )
        )}
      </div>
    </div>
  );
}
