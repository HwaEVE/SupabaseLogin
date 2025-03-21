'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    // 로그아웃 후 기본 페이지로 리다이렉트
    redirect('/');
}
