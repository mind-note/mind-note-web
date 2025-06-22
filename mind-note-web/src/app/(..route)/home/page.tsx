export const dynamic = 'force-dynamic';
import { fetchDiaryList } from '@/app/business/diary/diary.service';
import MonthCalendar from '@/app/ui/molecule/calendar/month-calendar';

export default async function HomePage() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const dailyRecords = await fetchDiaryList(year, month);

  return (
    <main className="relative pb-24">
      <div className="flex justify-between items-center w-full max-w-md mx-auto p-6 mb-4">
        <h1 className="text-2xl font-bold">마음노트</h1>
        <div className="text-sm text-gray-500">
          {year}.{month.toString().padStart(2, '0')}
        </div>
      </div>
      <MonthCalendar year={year} month={month} dailyRecords={dailyRecords} />
    </main>
  );
}
