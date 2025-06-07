'use client';

import { useState } from 'react';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import { FormTextArea } from '@/app/ui/molecule/form/form-textarea';
import DetailEmotionSelector from '@/app/ui/components/chat/DetailEmotionSelector';

export default function FeedbackPage() {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [additionalComment, setAdditionalComment] = useState('');

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = () => {
    const payload = {
      emotions: selectedEmotions,
      comment: additionalComment,
    };
    console.log('📝 Feedback Submitted:', payload);
    // TODO: 실제 제출 로직 추가
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
        <p className="text-sm text-gray-500 text-right">{additionalComment.length}/100</p>
      </section>

      <AchromaticButton
        className="w-full"
        onClick={handleSubmit}
        disabled={selectedEmotions.length === 0 && additionalComment.trim() === ''}
      >
        Submit
      </AchromaticButton>
    </main>
  );
}
