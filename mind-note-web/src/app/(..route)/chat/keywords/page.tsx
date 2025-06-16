'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextNoteInput from '@/app/ui/components/keywords/TextNoteInput';
import { createClientHttpInstance } from '@/app/utils/http/client-instance';
import { API_PATH } from '@/app/utils/http/api-query';

type EmotionKeyword = 'UNSPECIFIED' | 'HAPPY' | 'SAD' | 'ANGRY' | 'SURPRISED' | 'INTERESTED' | 'BORED';

const emotionOptions: { key: EmotionKeyword; label: string }[] = [
  { key: 'UNSPECIFIED', label: '미지정' },
  { key: 'HAPPY', label: '기쁨' },
  { key: 'SAD', label: '슬픔' },
  { key: 'ANGRY', label: '화남' },
  { key: 'SURPRISED', label: '놀람' },
  { key: 'INTERESTED', label: '흥미' },
  { key: 'BORED', label: '지루함' },
];

export default function KeywordPage() {
  const [emotionKeyword, setEmotionKeyword] = useState<EmotionKeyword | ''>('');
  const [additionalKeyword, setAdditionalKeyword] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!emotionKeyword || !additionalKeyword.trim() || !description.trim()) {
      alert('감정, 추가 키워드, 설명을 모두 입력해주세요.');
      return;
    }

    try {
      const client = createClientHttpInstance();
      const res = await client.post(`${API_PATH}/chat`, {
        emotionKeyword,
        additionalKeyword,
        description,
      });

      router.push(`/chat/${res.data.id}`);
    } catch (e) {
      console.error('채팅 생성 실패:', e);
      alert('채팅 생성에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-sm font-medium text-gray-600">감정 키워드 선택</div>
        <div className="flex flex-wrap gap-2">
          {emotionOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setEmotionKeyword(key)}
              className={`px-3 py-1 text-sm rounded-full border ${
                emotionKeyword === key ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={additionalKeyword}
          onChange={(e) => setAdditionalKeyword(e.target.value)}
          placeholder="추가 키워드 입력"
          className="w-full border px-3 py-2 rounded text-sm"
        />

        <TextNoteInput
          value={description}
          onChange={setDescription}
          maxLength={200}
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white py-3 rounded-lg text-sm font-semibold"
        >
          Save
        </button>

        <button
          onClick={handleSubmit}
          className="text-purple-500 text-sm text-center mt-[-8px]"
        >
          Skip and Save
        </button>
      </div>
    </div>
  );
}
