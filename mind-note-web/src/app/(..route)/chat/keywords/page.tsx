// app/chat/keywords/page.tsx
'use client';

import TextNoteInput from '@/app/ui/components/keywords/TextNoteInput';
import { useState } from 'react';


interface KeywordSelectorProps {
  selected: string[];
  onToggle: (keyword: string) => void;
  onAdd: (keyword: string) => void;
  onClear: () => void;
}

const allKeywords = [
  'Work', 'Hobbies', 'Family', 'Breakup', 'Weather', 'Wife', 'Party', 'Love',
  'Self esteem', 'Sleep', 'Social', 'Food', 'Distant', 'Content', 'Exams'
];

const KeywordSelector = ({ selected, onToggle, onAdd, onClear }: KeywordSelectorProps) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onAdd(trimmed);
      setInput('');
    }
  };

  return (
    <div className="space-y-6">
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

      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600">All reasons</div>
        <div className="flex flex-wrap gap-2">
          {allKeywords.map((word) => (
            <button
              key={word}
              onClick={() => onAdd(word)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selected.includes(word) ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function KeywordPage() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [textNote, setTextNote] = useState('');
  const maxNoteLength = 200;

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleKeywordAdd = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords((prev) => [...prev, keyword]);
    }
  };

  const handleKeywordClear = () => {
    setSelectedKeywords([]);
  };

  const handleSubmit = () => {
    const payload = {
      keywords: selectedKeywords,
      note: textNote,
    };
    console.log('📝 Submit keywords + note:', payload);
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto">
      <KeywordSelector
        selected={selectedKeywords}
        onToggle={handleKeywordToggle}
        onAdd={handleKeywordAdd}
        onClear={handleKeywordClear}
      />

      <TextNoteInput
        value={textNote}
        onChange={setTextNote}
        maxLength={maxNoteLength}
      />

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white py-3 rounded-lg text-sm font-semibold"
      >
        Save
      </button>

      <button className="text-purple-500 text-sm text-center mt-[-8px]">
        Skip and Save
      </button>
    </div>
  );
}
