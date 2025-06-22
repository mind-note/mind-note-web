'use client';

import { useSearchParams } from 'next/navigation';

export default function FeedbackClient() {
  const searchParams = useSearchParams();
  const emotion = searchParams.get('emotion');

  return <div>감정 키워드: {emotion}</div>;
}
