'use client';

import { useState } from 'react';
import CalendarListItem from './calendar-client';


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

type DailyRecord = {
  date: number;
  hasRecords: boolean;
  records: Record[];
};

export default function MonthCalendar({
  year,
  month,
  dailyRecords,
}: {
  year: number;
  month: number;
  dailyRecords: DailyRecord[];
}) {
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

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
        {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
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
                ${record?.hasRecords ? 'bg-birdGreen600 text-white' : 'bg-gray-200 text-gray-500'}
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
            <CalendarListItem records={selectedRecords} />
          ) : (
            <div className="text-center text-gray-400">해당 날짜에 기록이 없습니다</div>
          )
        )}
      </div>
    </div>
  );
}
