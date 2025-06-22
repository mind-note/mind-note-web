// src/app/business/user/user.service.ts
'use client';

import { createClientHttpInstance } from '@/app/utils/http/client-instance';
import { API_PATH } from '@/app/utils/http/api-query';

const client = createClientHttpInstance();

export type User = {
  id: string;
  name: string;
  userMbti: string;
  friendMbti: string;
};

export type UserUpdatePayload = {
  userMbti?: string;
  friendMbti?: string;
};

export async function fetchUserInfo(): Promise<User | null> {
  try {
    const res = await client.get(`${API_PATH}/user`);
    const data = res.data;

    return {
      id: data.id,
      name: data.name,
      userMbti: data.userMbti,
      friendMbti: data.friendMbti,
    };
  } catch (error) {
    console.error('[fetchUserInfo] 유저 정보 조회 실패:', error);
    return null;
  }
}

export async function updateUserMbti(payload: UserUpdatePayload): Promise<void> {
  try {
    await client.patch(`${API_PATH}/user`, payload);
  } catch (error) {
    console.error('[updateUserMbti] 유저 정보 업데이트 실패:', error);
    throw error;
  }
}
