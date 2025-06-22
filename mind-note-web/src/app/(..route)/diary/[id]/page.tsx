// app/diary/[id]/page.tsx
import { FaSmile } from 'react-icons/fa';
import { format } from 'date-fns';
import { fetchDiaryDetail } from '@/app/business/diary/diary.service';
import { notFound } from 'next/navigation';
import Link from 'next/link';


export default async function DiaryDetailPage({ params }: { params: { id: string } }) {
  const diary = await fetchDiaryDetail(params.id);

  if (!diary) return notFound();

  return (
    <div className="p-4 space-y-4">
      <div className="text-center text-gray-600 text-sm">
        {format(new Date(diary.createdAt), 'dd MMMM yyyy')}
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center space-x-2">
          <FaSmile className="text-2xl text-gray-500" />
          <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-md">
            {format(new Date(diary.createdAt), 'dd MMM yy')}
          </span>
        </div>

        {/* 감정 및 키워드 정보 */}
        <div className="mt-3 space-x-2 text-sm text-gray-500">
          <span>감정: {diary.emotion}</span>
          <span>세부감정: {diary.detailEmotion}</span>
          <span>키워드: #{diary.additionalKeyword} #{diary.contentKeyword}</span>
        </div>

        <h2 className="mt-2 font-bold text-lg">
          {diary.title}
        </h2>

        <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
          {diary.content}
        </p>

       <Link
            href={`/chat/history/${diary.chatId}`}
        className="mt-4 text-right text-xs text-blue-600 cursor-pointer inline-block"
        >
        지난 채팅 내역 보기 &gt;
        </Link>

      </div>
    </div>
  );
}
