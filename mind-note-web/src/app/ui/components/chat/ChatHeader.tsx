interface ChatHeaderProps {
  name: string;
}

export default function ChatHeader({ name }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="font-semibold">{name}</div>
      <div className="rounded-full bg-slate-100 w-8 h-8" />
    </div>
  );
}
