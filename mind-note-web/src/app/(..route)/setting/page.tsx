// app/settings/page.tsx
'use client';

import SettingsHeader from "@/app/ui/components/setting/SettingsHeader";
import SettingsItem from "@/app/ui/components/setting/SettingsItem";


export default function SettingsPage() {
  return (
    <div className="flex flex-col max-w-md mx-auto px-4 py-6 space-y-6">
      <SettingsHeader
        name="Lucas Scott"
        username="@lucasscott3"
        avatarUrl="" // 실제 유저 이미지 경로로 교체 가능
      />

      <div className="space-y-1">
        <SettingsItem label="Saved Messages" />
        <SettingsItem label="Recent Calls" />
        <SettingsItem label="Devices" />
        <SettingsItem label="Notifications" />
        <SettingsItem label="Appearance" />
        <SettingsItem label="Language" />
        <SettingsItem label="Privacy & Security" />
        <SettingsItem label="Storage" />
      </div>
    </div>
  );
}
