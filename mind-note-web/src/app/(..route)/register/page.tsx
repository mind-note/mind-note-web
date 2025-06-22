'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { API_PATH } from '@/app/utils/http/api-query';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [userMbti, setUserMbti] = useState('');
  const [friendMbti, setFriendMbti] = useState('');

  const accessToken = searchParams.get('accessToken');

  // ✅ URL에서 accessToken 제거 (페이지 진입 후 바로)
  useEffect(() => {
    if (accessToken) {
      window.history.replaceState(null, '', '/register'); // 🔥 쿼리 깔끔하게 제거
    }
  }, [accessToken]);

  const handleSubmit = async () => {
    if (!accessToken) {
      alert('토큰이 없습니다. 다시 로그인해주세요.');
      return;
    }

    try {
      await axios.post(
        `${API_PATH}/auth/register`,
        { name, userMbti, friendMbti },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      router.replace('/home');
    } catch (err) {
      alert('회원가입 실패');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">회원가입</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        value={userMbti}
        onChange={(e) => setUserMbti(e.target.value)}
        placeholder="당신의 MBTI"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        value={friendMbti}
        onChange={(e) => setFriendMbti(e.target.value)}
        placeholder="상담자 MBTI"
        className="w-full border px-3 py-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white py-2 rounded font-semibold"
      >
        완료
      </button>
    </div>
  );
}
