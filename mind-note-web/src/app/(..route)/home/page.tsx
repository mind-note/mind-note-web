'use client';

import MonthCalendar from '@/app/ui/molecule/calendar/month-calendar';
import WeekCalendar from '@/app/ui/molecule/calendar/week-calendar';
import { useState } from 'react';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'월간' | '주간'>('월간');

  return (
    <main className="relative pb-24">
      <div className="flex justify-between items-center w-full max-w-md mx-auto px-4 mb-4">
        <div className="text-xl font-semibold">{viewMode}</div>
        <div className="space-x-2">
          <button
            onClick={() => setViewMode('월간')}
            className={`px-3 py-1 rounded-full text-sm ${viewMode === '월간' ? 'bg-birdGreen400 text-white' : 'bg-gray-200'}`}
          >
            월간
          </button>
          <button
            onClick={() => setViewMode('주간')}
            className={`px-3 py-1 rounded-full text-sm ${viewMode === '주간' ? 'bg-birdGreen400 text-white' : 'bg-gray-200'}`}
          >
            주간
          </button>
        </div>
      </div>

      {viewMode === '월간' ? <MonthCalendar /> : <WeekCalendar />}
    </main>
  );
}
