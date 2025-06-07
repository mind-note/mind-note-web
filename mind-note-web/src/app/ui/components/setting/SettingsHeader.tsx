interface SettingsHeaderProps {
  name: string;
  username: string;
  avatarUrl?: string;
}

export default function SettingsHeader({
  name,
  username,
  avatarUrl,
}: SettingsHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 pb-4 border-b">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-slate-200" />
        <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 border-2 border-white" />
      </div>
      <div className="text-base font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{username}</div>
    </div>
  );
}
