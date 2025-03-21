'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // 비밀번호 확인 로직 추가
    if (password !== confirmPassword) {
        // 비밀번호가 일치하지 않으면 에러 페이지로 리다이렉트하거나, 적절한 에러 처리를 합니다.
        redirect('/error');
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}
