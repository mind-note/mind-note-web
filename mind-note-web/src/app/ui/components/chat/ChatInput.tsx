'use client';

import { useState } from 'react';
import { LuLoader } from 'react-icons/lu'; // ⬅️ 스피너 아이콘

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  sending?: boolean;
}

export default function ChatInput({ onSend, disabled = false, sending = false }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-t bg-white">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm focus:outline-none disabled:bg-gray-100"
        disabled={disabled}
      />
      <button
        type="submit"
        className="ml-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
        disabled={disabled}
      >
        {sending ? (
          <LuLoader className="animate-spin text-white text-lg" />
        ) : (
          '전송'
        )}
      </button>
    </form>
  );
}
