'use client';

interface Props {
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
}

export default function TextNoteInput({ value, onChange, maxLength = 200 }: Props) {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write anything you want to add..."
        maxLength={maxLength}
        rows={5}
        className="w-full rounded-xl border px-4 py-3 text-sm resize-none"
      />
      <div className="text-right text-xs text-gray-400">{value.length}/{maxLength}</div>
    </div>
  );
}
