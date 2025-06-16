
import { fetchDiaryList } from '@/app/business/diary/diary.service';
import MonthCalendar from '@/app/ui/molecule/calendar/month-calendar';

export default async function HomePage() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const dailyRecords = await fetchDiaryList(year, month);

  return (
    <main className="relative pb-24">
      <div className="flex justify-between items-center w-full max-w-md mx-auto px-4 mb-4">
        <div className="text-xl font-semibold">월간</div>
      </div>
      <MonthCalendar year={year} month={month} dailyRecords={dailyRecords} />
    </main>
  );
}
