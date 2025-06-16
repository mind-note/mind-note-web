// business/chat/chat.service.ts
'use server';

import { createHttpInstance } from '@/app/utils/http';
import { API_PATH } from '@/app/utils/http/api-query';
import { createClientHttpInstance } from '@/app/utils/http/client-instance';

const instance = createHttpInstance(true); // ✅ 서버 전용 인스턴스
const client = createClientHttpInstance()

// ✅ 채팅 생성
export async function createChat({
  emotionKeyword,
  additionalKeyword,
  description,
}: {
  emotionKeyword: string;
  additionalKeyword: string;
  description: string;
}) {
  try {
    const res = await instance.post(`${API_PATH}/chat`, {
      emotionKeyword,
      additionalKeyword,
      description,
    });

    return res.data; // { id, title, ... }
  } catch (error) {
    console.error('[createChat] 채팅 생성 에러:', error);
    throw error;
  }
}

// ✅ 채팅 목록 조회
export async function fetchChatList() {
  try {
    const res = await instance.get(`${API_PATH}/chat`);
    return res.data; // [{ id, title, ... }]
  } catch (error) {
    console.error('[fetchChatList] 채팅 목록 조회 에러:', error);
    return []; // fallback
  }
}

// ✅ 메시지 전송
export async function sendMessage(chatId: string, message: string) {
  try {
    const res = await instance.post(`${API_PATH}/chat/${chatId}/message`, {
      message,
    });

    return res.data; // 메시지 전송 응답
  } catch (error) {
    console.error('[sendMessage] 메시지 전송 에러:', error);
    throw error;
  }
}

// ✅ 메시지 조회
export async function fetchMessages(chatId: string) {
  try {
    const res = await client.get(`${API_PATH}/chat/${chatId}/message`);
    return res.data; // messages[]
  } catch (error) {
    console.error('[fetchMessages] 메시지 조회 에러:', error);
    return []; // fallback
  }
}
