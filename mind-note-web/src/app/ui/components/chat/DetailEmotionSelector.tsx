'use client';

import React from 'react';

interface DetailEmotionSelectorProps {
  selectedEmotions: string[];
  onToggleEmotion: (emotion: string) => void;
}

const detailEmotions = [
  'angry', 'sad', 'joy', 'bored', 'anxiety', 'etc',
];

export default function DetailEmotionSelector({
  selectedEmotions,
  onToggleEmotion,
}: DetailEmotionSelectorProps) {
  return (
    <section>
      <h2 className="font-semibold text-lg mb-2">세부 감정 키워드를 선택해 주세요</h2>
      <div className="flex flex-wrap gap-2">
        {detailEmotions.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion);
          return (
            <button
              key={emotion}
              type="button"
              onClick={() => onToggleEmotion(emotion)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {emotion}
            </button>
          );
        })}
      </div>
    </section>
  );
}
