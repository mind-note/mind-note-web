import FeedbackClient from '@/app/ui/components/chat/feedback-client';
import { Suspense } from 'react';


export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">감정 분석 중...</div>}>
      <FeedbackClient />
    </Suspense>
  );
}
