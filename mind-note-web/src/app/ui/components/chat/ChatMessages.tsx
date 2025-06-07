interface Message {
  role: 'user' | 'bot';
  name: string;
  text: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
        >
          <div className="text-xs font-medium mb-1 text-gray-500">{msg.name}</div>
          <div
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-gray-900'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}
