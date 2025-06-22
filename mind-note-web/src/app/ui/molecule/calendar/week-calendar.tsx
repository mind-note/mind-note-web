'use client';

import { useEffect, useState } from 'react';
import RecordListItem from '../../components/record-list-item';

export type Record = {
  id: string;
  chatId: string;
  title: string;
  content: string;
  emotion: 'UNSPECIFIED' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  detailEmotion: 'angry' | 'sad' | 'joy' | 'bored' | 'anxiety' | 'etc';
  tags: string[];
  createdAt: string;
};

type DailyRecord = {
  date: number;
  hasRecords: boolean;
  records: Record[];
};

// ✅ 더미 데이터 (Record 타입에 맞게 작성)
const dummyDailyRecords: DailyRecord[] = [
  {
    date: new Date().getDate(),
    hasRecords: true,
    records: [
      {
        id: '1',
        chatId: 'chat-1',
        title: '참새 관찰',
        content: '나무에 앉아있는 참새를 봤어요.',
        emotion: 'POSITIVE',
        detailEmotion: 'joy',
        tags: ['참새', '자연'],
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    date: new Date().getDate() + 1,
    hasRecords: true,
    records: [
      {
        id: '2',
        chatId: 'chat-2',
        title: '까치 울음소리',
        content: '도서관 근처에서 까치 소리가 들렸어요.',
        emotion: 'NEUTRAL',
        detailEmotion: 'sad',
        tags: ['까치', '소리'],
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    date: new Date().getDate() + 3,
    hasRecords: true,
    records: [
      {
        id: '3',
        chatId: 'chat-3',
        title: '직박구리와 아침',
        content: '아침 산책 중 직박구리를 봤어요.',
        emotion: 'POSITIVE',
        detailEmotion: 'joy',
        tags: ['직박구리'],
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

export default function WeekCalendar() {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const [weekStart] = useState(startOfWeek);
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    setDailyRecords(dummyDailyRecords);
  }, []);

  const days = Array.from({ length: 7 }, (_, i) => new Date(weekStart.getTime() + i * 86400000));

  const handleSelectDate = (day: Date) => {
    const found = dailyRecords.find((d) => d.date === day.getDate());
    setSelectedDate(day.getDate());
    setSelectedRecords(found?.records || []);
  };

  return (
    <div className="relative pb-20">
      <div className="text-center text-xl font-bold mb-4">
        {weekStart.getFullYear()}년 {weekStart.getMonth() + 1}월
      </div>

      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={idx} className="text-center text-gray-400">{day}</div>
        ))}
        {days.map((date, idx) => {
          const record = dailyRecords.find((r) => r.date === date.getDate());
          return (
            <button
              key={idx}
              onClick={() => handleSelectDate(date)}
              className={`aspect-square flex items-center justify-center rounded-full
                ${record?.hasRecords ? "bg-birdGreen600 text-white" : "bg-gray-200 text-gray-500"}
                hover:scale-110 transition-transform`}
            >
              {date.getDate()}
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
