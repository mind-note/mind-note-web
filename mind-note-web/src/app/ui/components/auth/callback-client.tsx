'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const isRegistered = searchParams.get('isRegistered');
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      // ✅ isRegistered 포함해서 서버 리디렉트 경로 결정할 수 있도록 전달
      window.location.href = `/api/auth/kakao?accessToken=${accessToken}&isRegistered=${isRegistered}`;
    } else {
      router.replace('/auth/fail');
    }
  }, [accessToken, isRegistered, router]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-semibold">카카오 로그인 처리 중...</h1>
    </div>
  );
}
