// business/chat/chat.service.ts
'use server';

import { createHttpInstance } from '@/app/utils/http';
import { API_PATH } from '@/app/utils/http/api-query';
import { createClientHttpInstance } from '@/app/utils/http/client-instance';

const instance = createHttpInstance(true); // ✅ 서버 전용 인스턴스
const client = createClientHttpInstance()


interface Diary {
  id: string;
  chatId: string;
  title: string;
  content: string;
  emotion: 'UNSPECIFIED' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  detailEmotion: string;
  additionalKeyword: string;
  contentKeyword: string;
  createdAt: string;
}

// ✅ 채팅 생성
export async function createDiary({
  chatId,
  detailEmotion,
  additionalDescription,
}: {
  chatId: string;
  detailEmotion: string;
  additionalDescription: string;
}) {
  try {
    const res = await client.post(`${API_PATH}/diary`, {
      chatId,
      detailEmotion,
      additionalDescription,
    });

    return res.data; // { id, title, ... }
  } catch (error) {
    console.error('[createDiary] 일기 생성 에러:', error);
    throw error;
  }
}

// ✅ 일기 목록 조회
export async function fetchDiaryList(year: number, month: number) {
  try {
    const res = await instance.get(`${API_PATH}/diary`, {
      params: { year, month },
    });

    return res.data.dailyData.map((day: any) => ({
      date: day.date,
      hasRecords: day.hasDiary,
      records: (day.diaries || []).map((r: any) => ({
        id: r.id,
        chatId: r.chatId,
        title: r.title,
        content: r.content,
        emotion: r.emotion,
        detailEmotion: r.detailEmotion,
        contentKeyword: r.contentKeyword,
        createdAt: r.createdAt,
      })),
    }));
  } catch (error) {
    console.error('[fetchDiaryList] 일기 목록 조회 에러:', error);
    return [];
  }

}


export async function fetchDiaryDetail(diaryId: string): Promise<Diary | null> {
  try {
    const res = await instance.get(`${API_PATH}/diary/${diaryId}`);

    const data = res.data;

    return {
      id: data.id,
      chatId: data.chatId,
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      detailEmotion: data.detailEmotion,
      additionalKeyword: data.additionalKeyword,
      contentKeyword: data.contentKeyword,
      createdAt: data.createdAt,
    };
  } catch (error) {
    console.error('[fetchDiaryDetail] 일기 상세 조회 에러:', error);
    return null;
  }
}


