// src/app/(..route)/register/page.tsx
import RegisterClient from '@/app/ui/components/auth/register-client';
import { Suspense } from 'react';


export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">로딩 중...</div>}>
      <RegisterClient />
    </Suspense>
  );
}
