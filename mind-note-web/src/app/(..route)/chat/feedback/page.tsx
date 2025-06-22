'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import { FormTextArea } from '@/app/ui/molecule/form/form-textarea';
import DetailEmotionSelector from '@/app/ui/components/chat/DetailEmotionSelector';
import { API_PATH } from '@/app/utils/http/api-query';

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');

  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [additionalComment, setAdditionalComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = async () => {
    if (!chatId) {
      alert('chatId가 없습니다.');
      return;
    }

    if (selectedEmotions.length === 0 && !additionalComment.trim()) {
      alert('감정 또는 설명을 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      const token = Cookies.get('accessToken_client');

      await axios.post(
        `${API_PATH}/diary`,
        {
          chatId,
          detailEmotion: selectedEmotions[0] || 'etc',
          additionalDescription: additionalComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      router.push('/home');
    } catch (err) {
      console.error('[createDiary] 에러:', err);
      alert('일기 생성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <DetailEmotionSelector
        selectedEmotions={selectedEmotions}
        onToggleEmotion={toggleEmotion}
      />

      <section>
        <FormTextArea
          id="comment"
          label="Anything else?"
          placeholder="Tell us everything."
          value={additionalComment}
          onValueChange={setAdditionalComment}
          maxLength={100}
        />
        <p className="text-sm text-gray-500 text-right">
          {additionalComment.length}/100
        </p>
      </section>

      <AchromaticButton
        className="w-full"
        onClick={handleSubmit}
        disabled={submitting || (!selectedEmotions.length && !additionalComment.trim())}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </AchromaticButton>
    </main>
  );
}
