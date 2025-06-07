interface SettingsItemProps {
  label: string;
  onClick?: () => void;
}

export default function SettingsItem({ label, onClick }: SettingsItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center px-4 py-3 bg-white rounded-md hover:bg-slate-100 cursor-pointer text-sm"
    >
      <span>{label}</span>
      <span className="text-gray-400">{'>'}</span>
    </div>
  );
}
