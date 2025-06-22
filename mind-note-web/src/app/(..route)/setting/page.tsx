'use client';

import { fetchUserInfo, updateUserMbti } from '@/app/business/user/user.service';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  userMbti: string;
  friendMbti: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [userMbti, setUserMbti] = useState('');
  const [friendMbti, setFriendMbti] = useState('');

  useEffect(() => {
  fetchUserInfo()
    .then((userData) => {
      if (userData) {
        setUser(userData);
        setUserMbti(userData.userMbti);
        setFriendMbti(userData.friendMbti);
      } else {
        console.warn('userData가 null입니다.');
      }
    })
    .catch((err) => {
      console.error('유저 정보 불러오기 실패:', err);
    });
}, []);


  const handleSave = async () => {
    try {
      await updateUserMbti({ userMbti, friendMbti });
      setEditing(false);
      location.reload();
    } catch (err) {
      alert('저장 실패');
      console.error(err);
    }
  };

  if (!user) return <div className="text-center p-6">로딩 중...</div>;

  return (
    <div className="flex flex-col max-w-md mx-auto px-4 py-6 space-y-6">
      {/* 최상단 설정 제목 */}
      <h1 className="text-2xl font-bold text-center mb-4">설정</h1>

      <div className="text-center">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-sm text-gray-500">@{user.id}</p>
      </div>

      {editing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">사용자 MBTI</label>
            <input
              type="text"
              value={userMbti}
              onChange={(e) => setUserMbti(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">상담자 MBTI</label>
            <input
              type="text"
              value={friendMbti}
              onChange={(e) => setFriendMbti(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold"
          >
            저장
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-sm">사용자 MBTI: {user.userMbti}</div>
          <div className="text-sm">상담자 MBTI: {user.friendMbti}</div>
          <button
            onClick={() => setEditing(true)}
            className="mt-2 w-full bg-gray-200 text-sm py-2 rounded"
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
