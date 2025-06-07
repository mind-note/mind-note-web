import { useState } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-t">
      <button type="button" className="text-blue-500 text-2xl mr-2">＋</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm focus:outline-none"
      />
    </form>
  );
}
