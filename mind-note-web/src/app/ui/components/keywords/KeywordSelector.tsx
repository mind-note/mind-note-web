'use client';

import { useState } from 'react';

interface KeywordSelectorProps {
  selected: string[];
  onToggle: (keyword: string) => void;
  onAdd: (keyword: string) => void;
  onClear: () => void;
}

const allExamples = [
  'Work', 'Hobbies', 'Family', 'Breakup', 'Weather', 'Party', 'Sleep', 'Social',
];

export default function KeywordSelector({
  selected,
  onToggle,
  onAdd,
  onClear,
}: KeywordSelectorProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onAdd(trimmed);
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Search & add reasons"
        className="w-full border rounded-full px-4 py-2 text-sm"
      />

      <div className="flex justify-between items-center text-sm font-medium">
        <span>Selected ({selected.length})</span>
        <button onClick={onClear} className="text-gray-600 hover:underline">
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selected.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white border text-sm"
          >
            {keyword}
            <button
              onClick={() => onToggle(keyword)}
              className="w-4 h-4 rounded-full bg-gray-300 text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-2">
        <div className="text-sm font-medium text-gray-600">Suggestions</div>
        <div className="flex flex-wrap gap-2">
          {allExamples.map((word) => (
            <button
              key={word}
              onClick={() => onAdd(word)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selected.includes(word)
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
