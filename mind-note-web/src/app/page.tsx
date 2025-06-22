
import { redirect, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { emotionColors, emotionIcons, emotionNames } from '@/app/ui/atom/emotion/emotion';
import LoginForm from '@/app/ui/components/auth/login-form';

export default function RootPage() {
  const token = cookies().get('accessToken')?.value;

  if (token) {
    // ✅ 로그인 되어있으면 /home으로 보냄
    redirect('/home');
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 overflow-y-auto px-6 py-12 bg-white">
      {/* 상단 타이틀 */}
      <h1 className="text-4xl font-bold text-black mb-6">마음노트</h1>

      {/* 감정 이모지 소개 */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Object.keys(emotionIcons).map((key) => (
          <div
            key={key}
            className="flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: emotionColors[key], color: 'white' }}
          >
            <span>{emotionIcons[key]}</span>
            <span>{emotionNames[key]}</span>
          </div>
        ))}
      </div>
      {/* 카카오 로그인 버튼 */}
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
}
